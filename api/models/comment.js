const mongoose = require('mongoose');
const {Schema,model} = mongoose;


const CommentSchema = new Schema({
    name: String,
    comment: String,
},{
    timestamps: true,
})

const CommentModel = model('Comment',CommentSchema);

module.exports = CommentModel