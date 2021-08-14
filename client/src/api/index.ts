import axios from 'axios'

export interface IUser {
    username?: string,
    email?: string,
    password?: string,
    profileImage?: FormData,
}

const userURL = "http://localhost:5000/users"

export const fetchUsers = () => axios.get(userURL)
export const createUser = (userParam: IUser) => axios.post(userURL + "/register", userParam)
export const authenticateUser = ({username, password}: IUser) => axios.post(userURL + "/authenticate", {username, password})
export const getCurrentUser = (token: String) => axios.get(userURL + "/current", { headers: {authorization: 'Bearer' + token }})