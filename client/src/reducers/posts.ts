import { strictEqual } from "assert"

const postsReducer = (state:any = {}, action: any) => {
    switch (action.type) {
        case 'GETALL_POSTS_SUCCESS':
            return {posts: action.posts}
        case 'GETALL_ERROR':
            return {error: action.error}
        case 'CREATE_POST_SUCCESS':
            console.log({posts: action.post})
            return {posts: action.post}
            /*
            console.log({
                ...state,
                posts:[{...action.post, ...state.posts}]
            })
            return {
                ...state,
                posts: [action.post, ...state.posts]
            } */
        case 'COMMENT_POST_SUCCESS':
            const newComment = state.posts[action.index]
            newComment.comments = [...newComment.comments, action.postParam]
            return {
                ...state,
                posts:[
                    ...state.posts.slice(0,action.index),
                    newComment,
                    ...state.posts.slice(action.index +1)
                ] 
            }
        case 'LIKE_POST_SUCCESS':
            const newLike = state.posts[action.index]
            newLike.likes = [...newLike.likes, action.user]
            return {
                ...state,
                posts:[
                    ...state.posts.slice(0,action.index),
                    newLike,
                    ...state.posts.slice(action.index +1)
                ]
            }
        default:
           return state; 
    }
}

export default postsReducer