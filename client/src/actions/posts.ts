import { useSelector } from 'react-redux'
import { postService, IPosts } from '../services/postService'
import { IUser } from '../services/userService'


//action creators
export const getAll = () => async (dispatch: any) => {
    dispatch({type: 'GETALL_POSTS_REQUEST'})
    console.log('getting posts')
    postService.getAll().then(
        posts => {
            console.log(posts)
            dispatch({type: 'GETALL_POSTS_SUCCESS', posts})
        },
        error => {
            console.log(error)
            dispatch({type: 'GETALL_POSTS_FAILURE', error})
        }
    )
}

export const create = (postParam: IPosts, userProfile: IUser) => async (dispatch: any) => {
    dispatch({type:'CREATE_POST'})
    const newPost = {
        ...postParam,
        createdAt: new Date().toUTCString(),
        userProfile: [userProfile],
        likes: []
    }
    postService.create(postParam).then(
        post => {
            dispatch(getAll());
        },
        error => {
            dispatch({type: 'CREATE_POST_FAILURE', error: error.response.data.message})
            //dispatch Alert Function
        }
    )
}


export const comment = (id: string, postParam: IPosts, index: Number)  => (dispatch: any) => {
        dispatch({type:'COMMENT_POST_REQUEST'})
        postService.comment(id, postParam)
            .then(
                post => {
                    dispatch({type: 'COMMENT_POST_SUCCESS', id, postParam, index})
                },
                error => {
                    dispatch({type: 'COMMENT_POST_FAILURE',  error: error.response.data.message})
                    //dispatch Alert Function
                }
            )
}

export const like = (id: string, postParam: IPosts, index:Number) => (dispatch: any) => {
    postService.like(id, postParam)
        .then(
            post => {
                dispatch({type: 'LIKE_POST_SUCCESS', id, user: postParam.user, index})
            },
            error => {
                dispatch({type: 'LIKE_POST_FAILURE', error})
            }
        )
}

export const remove = (id: string) => async (dispatch: any) => {
    postService.remove(id)
    .then(
        post => {
            dispatch({type: 'REMOVE_POST_SUCCESS', post})
            //Push history
        },
        error => {
            dispatch({type: 'REMOVE_POST_FAILURE'}, error)
            //dispatch Alert Function
        }
    )
}

export const update = (id: string, postParam: IPosts) => async (dispatch: any) => {
    postService.update(id, postParam)
    .then(
        posts => {
            dispatch({type: 'UPDATE_COMMENT_SUCCESS', posts})
        },
        error => {
            dispatch({type: 'UPDATE_COMMMENT_FAILURE', error})
            //dispatch Alert Function
        }
    )
}
export const postActions = {
    getAll,
    remove,
    update,
    comment,
    like,
    create
}