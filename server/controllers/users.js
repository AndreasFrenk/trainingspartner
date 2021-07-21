import * as userService from '../services/users.js'

const authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

const register = (req, res, next) => {
    userService.create(req.body)
        .then(() => res.status(200).json({}))
        .catch(err => next(err));
}

const getAll = (req, res, next) => {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

const getCurrent = (req, res, next) => {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

const getById = (req, res, next) => {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

const update = (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

const remove = (req, res, next) => {
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