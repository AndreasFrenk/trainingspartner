
import mongoose, { Schema } from "mongoose";

export interface IPosts extends mongoose.Document {
  user: string;
  text: string;
  likes: Array<string>;
  comments: Array<IComment> 
}

export interface IComment {
    username: string,
    user: string,
    text: string
}

const postSchema: Schema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default:() => new Date()}, 
    text: {type: String, required: true}, 
    likes: {type: [mongoose.Schema.Types.ObjectId]},
    comments: {type: [{
      username: {type: String},
      user: {type: mongoose.Schema.Types.ObjectId},
      text: {type: String}
    }]}
});


const Post = mongoose.model<IPosts>("Post", postSchema);

export default Post;
