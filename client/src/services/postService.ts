import axios, { AxiosResponse } from 'axios'
import { authHeader } from '../_helpers/authHeader'

export interface IPosts {
    username?: string,
    user: string,
    text?: string,
}
let postURL: string;
if(process.env.REACT_APP_BASE_URL){
    // postURL = process.env.REACT_APP_BASE_URL + ':5000/posts' 
    postURL = process.env.REACT_APP_BASE_URL + '/posts' 
}
else {
 postURL = "http://localhost:5000/posts"
}
    
postURL = 'https://safe-temple-37630.herokuapp.com/posts' 
// const postURL = "http://localhost:5000/posts"

const remove = async (id: string) => {
    try {
       const {data} = await axios.delete(postURL + '/' + id, {headers: authHeader()}) 
       return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const update = async (id: string, postParam: IPosts) => {
    try {
       const {data} = await axios.patch(postURL + '/' + id , postParam, {headers: authHeader()}) 
       return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const like = async (id: string, postParam: IPosts) => {
    try {
       const {data} = await axios.post(postURL + '/' + id + '/like', postParam, {headers: authHeader()}) 
       return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const comment = async (id: string, postParam: IPosts) => {
    try {
       const {data} = await axios.post(postURL + '/' + id + '/comment', postParam, {headers: authHeader()}) 
       return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const create = async (postParam: IPosts) => {
    try {
        const {data} = await axios.post(postURL, postParam, {headers: authHeader()})
        return data
    } catch (error) {
    return Promise.reject(error)
    }
}


const getAll = async () => {
    try {
        const {data} = await axios.get(postURL,{headers: authHeader()})
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const postService = {
    getAll,
    like,
    comment,
    create,
    update,
    remove
}
