
import mongoose, { Schema } from "mongoose";

export interface IPosts extends mongoose.Document {
  user: string;
  createdAt: Date;
  text: string;
  likes: Array<string>;
  comments: Array<IComment> 
}

export interface IComment {
    user: string,
    comment: string
}

const postSchema: Schema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default:new Date()}, 
    message: {type: String, required: true}, 
    likes: {type: [mongoose.Schema.Types.ObjectId]},
    comments: {type: [{
      user: {type: mongoose.Schema.Types.ObjectId},
      comment: {type: String}
    }]}
});


const Post = mongoose.model<IPosts>("Post", postSchema);

export default Post;
