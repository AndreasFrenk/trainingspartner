import * as userService from '../services/users.js'
import {Request, Response, NextFunction} from 'express'

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
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
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

const getById = (req: Request, res: Response, next: NextFunction) => {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

const update = (req: Request, res: Response, next: NextFunction) => {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

const remove = (req: Request, res: Response, next: NextFunction) => {
    userService.remove(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

export {
    authenticate,
    getAll,
    getById,
    register,
    update,
    remove,
    getCurrent
}