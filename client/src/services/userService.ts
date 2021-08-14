import axios, { AxiosResponse } from 'axios'
import { errorMonitor } from 'events'
import { authHeader } from '../_helpers/authHeader'

export interface IUser {
    username?: string,
    email?: string,
    password?: string,
    profileImage?: FormData 
}

const userURL = "http://localhost:5000/users"

const login = async ({username, password}: IUser) => {
    try {
        const response = await axios.post(userURL + "/authenticate", { username, password })
        const data = await handleResponse(response)
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const logout = () => {
    localStorage.removeItem('user');
}



const getUserProfileImg = () => {
        let user = JSON.parse(localStorage.getItem('user')!)
        console.log('USER INFO' + user);
        if (user?.profileImage) {
            console.log('profileImage: ' + user?.profileImage)
            return user?.profileImage
        }
        return ''
}

const getStoredUserId = () => {
        let user = JSON.parse(localStorage.getItem('user')!)
        console.log('USER INFO' + user);
        if (user?._id) {
            console.log('USERID: ' + user?._id)
            return user?._id
        }
        return ''
}

const getAll = async () => {
    try {
        const response = await axios.get(userURL,{headers: authHeader})
        const data = await handleResponse(response)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const getById = async (id: String) => {
    try {
        const response = await axios.get(userURL + '/' + id,{headers: authHeader})
        const data = await handleResponse(response)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const register = async (userParam: IUser) => {
    try {
        const response = await axios.post(userURL + "/register", userParam)
        const data = await handleResponse(response)
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateImage = async (image: FormData) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!)
        const userId = user?._id
        const response = await axios.post(userURL + "/profileImage/" + userId, image, {headers: authHeader()})
        const data = await handleResponse(response)
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } catch (error) {
        return Promise.reject(error)
    }
}

const getCurrent = async () => {
    console.log(authHeader())
    try {
        const {data} = await axios.get(userURL + "/current", {headers: authHeader()} )
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        logout();
        return Promise.reject(error)
    }
}

export const userService = {
    login,
    logout,
    getAll,
    getById,
    register,
    getCurrent,
    getStoredUserId,
    getUserProfileImg,
    updateImage

}

const handleResponse = (response: AxiosResponse) => {
        const data = response.data
        if (response.status === 401) {
            // auto logout if 401 response returned from api + TODO:push back to login route
            logout();
        }
        return data;
}