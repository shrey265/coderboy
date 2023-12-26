require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors')
const User = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const Post = require('./models/post');
const sendMail = require('./mail');

const Comments = require('./models/post_comments');
const Comment  = require('./models/comment');

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;


app.use(cors({
    credentials:true,
    origin:process.env.CORS_ORIGIN,
    preflightContinue: true,
    // methods: ['GET', 'PUT', 'POST'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    // credentials: true,
    // maxAge: 600,
    // exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));


mongoose.set('strictQuery',false);
mongoose.connect(
    process.env.MONGODB_CREDENTIALS,
    (err) => {
     if(err) console.log(err) ;
     else console.log("mongodb is connected");
    }
  );


app.post('/register',async (req,res)=>{
    const {username,email, password} = req.body;
    
    try{
        const userDoc =  await User.create({username, email,
             password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
    
});

app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passok = bcrypt.compareSync(password,userDoc.password);
    if(passok){
        jwt.sign({username,id:userDoc.id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token,{ sameSite: 'none', secure: true}).json({ //setting same site option to none.
                id:userDoc._id,
                username,
                logged_in:true,
            },);
        });
    }
    else{
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', async (req,res)=>{
    const {token} = req.cookies;
    // console.log(token);
    if(token){
        jwt.verify(token, secret,{},(err, info)=>{
            if(err) throw err;
            else{
                const id = info.id;
                const username = info.username;
                // const _id = mongoose.Types.ObjectId(id);
                res.status(200).json({
                    id:id,
                    username,
                    logged_in:true,
                });
            }
        });
    }
    else
    res.status(200).json({logged_in:false});
});

app.get('/logout',(req,res)=>{
    res.cookie('token','',{ sameSite: 'none', secure: true}).status(200).json({logged_in:false});
});



app.post('/post/:userid',uploadMiddleware.single('file'),async (req,res)=>{
    const {userid} = req.params;
    if(userid.substring(1,) === '64b427e70ab0a4c2a35671f8'){
        const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath );

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const {title,summary,content} = req.body;
        
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author: info.username,
            comments: false,
            comment_id:"",
        });
        res.status(200).json('post added');
    })
    }
    
    else{
        res.status(400).json('permission not granted');
    }

});


app.put('/post/:userid',uploadMiddleware.single('file'),async(req,res)=>{
    const {userid} = req.params;
    if(userid.substring(1,) === '64ee3562c61a2b26b267a966'){
        let newPath = null;
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        newPath = path+'.'+ext
        fs.renameSync(path, newPath );
    }

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const {title,summary, content, id ,author} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = postDoc.author === author;
        if(!isAuthor){
            res.status(400).json('you are not the author');
            throw 'you are not the author'
        }

        await postDoc.updateOne({title,summary,content,
            cover: newPath? newPath : postDoc.cover,
        });
        res.status(200).json('ok');        
    })

    }

    else{
        res.status(400).json('permission not granted');
    }
    
});



app.get('/post',async (req,res)=>{
    res.json(await Post.find().sort({createdAt:-1 }));
});


app.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const postDoc = await Post.findById(id);
    res.json(postDoc);
})



app.post('/email',async(req, res) => {
    const { name, email, message } = req.body;
    sendMail(name, email, message, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status(200).json('message sent');
        }
    });
});


app.post('/comment/:id', async(req,res)=>{
    const {id} = req.params;
    const {name, comment} = req.body;
    const postDoc = await Post.findById(id);
    if(comment!==""){
        const new_comment = await Comment.create({
            name,
            comment,
        });
        const new_comment_id = new_comment.id;
    
        if(postDoc.comments === false){
            const newCommentList = await Comments.create({
                comments:[
                    {
                        comment_id: new_comment_id,
                    }
                ],
            });
            const commentListID = newCommentList.id;
            await postDoc.updateOne({
                comments: true,
                comment_id: commentListID,
            });
        
        }
    
        else{
            const commentListID = postDoc.comment_id;
            const commentList = await Comments.findById(commentListID);
            const list = commentList.comments;
            list.push({
                comment_id: new_comment_id,
            });
    
            await commentList.updateOne({
                comments: list,
            });
    
        }
        
        res.status(200).json('comment added');
    }
    
    else{
        res.status(400).json('empty comment');
    }

});



app.get('/comments/:id',async(req,res)=>{
    const {id} = req.params;
    const postDoc = await Post.findById(id);
    const commentListID = postDoc.comment_id;
    ;
    if(commentListID!==''){
        const commentList = await Comments.findById(commentListID);
    // console.log(commentList);
        const list = commentList.comments;

        const comments = await Promise.all(list.map(async(obj,index)=> ( await Comment.findById(obj.comment_id))) );
        res.status(200).json(comments);
    }
    else{
        res.status(200).json([]);
    }
}) ;


app.listen(process.env.PORT);
