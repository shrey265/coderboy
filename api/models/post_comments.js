const mongoose = require('mongoose');
const {Schema,model} = mongoose;



const PostCommentSchema = new Schema({
    comments: [
        {
            comment_id: String,
        }
    ],
},{
    timestamps: true,
})

const PostCommentModel = model('PostComments',PostCommentSchema);


module.exports =  PostCommentModel;