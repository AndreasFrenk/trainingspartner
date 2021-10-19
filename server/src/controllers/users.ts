import * as userService from '../services/users.js'
import {Request, Response, NextFunction} from 'express'
import path from 'path'
import fs from 'fs'
// sorry for bad typing 

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    userService.authenticate(req.body)
        // .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .then(user =>  {
            if(user) {
            const filteredUser =  Object.assign({}, user)
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        .catch(err => next(err));
}

const register = (req: Request, res: Response, next: NextFunction) => {
    userService.create(req.body)
        .then(() => res.status(200).json({}))
        .catch(err => next(err));
}

const getAll = (req: Request, res: Response, next: NextFunction) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

const getCurrent = (req: Request, res: Response, next: NextFunction) => {
    userService.getById(req.user?.sub)
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        .then(user =>  {
            if(user) {
            const filteredUser =  {...user}
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        .catch(err => next(err));
}

const getById = (req: Request, res: Response, next: NextFunction) => {
    userService.getById(req.params.id)
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        // .then(user => {user ? res.json(user) : res.sendStatus(404)})
        .then(user =>  {
            if(user) {
            const filteredUser =  Object.assign({}, user)
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        .catch(err => next(err));
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.params.id !== req.user.sub) throw 'Not allowed'
    userService.update(req.params.id, req.body)
        .then(user =>  {
            if(user) {
            const filteredUser =  Object.assign({}, user)?._doc
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        .catch(err => next(err));
}

const updateProfile = (req: Request, res: Response, next: NextFunction) => {
    if(req.params.id !== req.user.sub) throw 'Not allowed'
    userService.updateProfile(req.params.id, req.body)
        .then(user =>  {
            if(user) {
            const filteredUser =  Object.assign({}, user)?._doc
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

const updateImage = (req: Request, res: Response, next: NextFunction) => {
    if(req.params.id !== req.user.sub) throw 'Not allowed'
        const dir = path.join(__dirname);
    const imgURL = 'http://localhost:5000/' +  req?.file?.filename;
    userService.updateImage( req.params.id, imgURL)
        .then(user =>  {
            if(user) {
            const filteredUser =  Object.assign({}, user)?._doc
            delete filteredUser?.password
             res.json(filteredUser)
            }
             else {
                 res.sendStatus(404)
                }
            })
        // .then(user => user ? res.json(user) : res.sendStatus(404))
        // .then(() => res.json({}))
        .catch(err => next(err));
// })
}

const remove = (req: Request, res: Response, next: NextFunction) => {
    if(req.params.id !== req.user.sub) throw 'Not allowed'
    userService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

const findNearBy = (req: Request, res: Response, next: NextFunction) => {
    userService.findNearBy(req.params.id)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}

export {
    authenticate,
    getAll,
    getById,
    register,
    updateUser,
    remove,
    getCurrent,
    updateImage,
    updateProfile,
    findNearBy
}