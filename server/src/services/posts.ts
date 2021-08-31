
import Post, { IComment } from '../models/posts.js';
import Posts, { IPosts } from '../models/posts.js'
import User from '../models/users'

async function getAll() {
    return await Posts.find();
}

async function create(postParam: IPosts) {
    const user = await User.findById(postParam.user)
    if (!user) {
        throw('User not found')
    }

    const post = new Post(postParam)

    await post.save();
}

async function update(id: String, postParam: IPosts) {
    const post = await Post.findById(id);

    if (!post) throw 'Post not found';
    Object.assign(post, postParam);

    await post.save();
}

async function remove(id: string) {  
    await Post.findByIdAndRemove(id);
}

async function like(id: String, param: {user: string}) {
    const post = await Post.findById(id)
    const user = await User.findById(param.user)

    if(!post || !user) {
        throw 'Post or User not found'
    }
    if(post.likes.includes(param.user)) throw 'Already liked'

    post.likes.push(param.user)
    post.save()
}

async function comment(id: string, commentParam: IComment) {
    const post = await Post.findById(id)
    const user = await User.findById(commentParam.user)
    if(!post || !user) throw 'Post not found'

    post.comments.push(commentParam)
    post.save()
}

export {
    like,
    comment,
    update,
    create,
    getAll,
    remove
}