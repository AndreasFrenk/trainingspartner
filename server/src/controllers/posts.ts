
import * as postsService from '../services/posts.js'
import {Request, Response, NextFunction} from 'express'
import path from 'path'
import fs from 'fs'

const create = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.user !== req.user.sub) throw 'Not allowed'
    postsService.create(req.body)
        .then(() => res.status(200).json({}))
        .catch(err => next(err));
}

const getAll = (req: Request, res: Response, next: NextFunction) => {
    postsService.getAll()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

const like = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.user !== req.user.sub) throw 'Not allowed'
    postsService.like(req.params.id, req.body)
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

const comment = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.user !== req.user.sub) throw 'Not allowed'
    postsService.comment(req.params.id, req.body)
        .then(posts => res.json(posts))
        .catch(err=> next(err))
}

const update = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.user !== req.user.sub) throw 'Not allowed'
    postsService.update(req.params.id, req.body)
        .then(() => res.status(200).json({}))
        .catch(err => next(err));
}

const remove = (req: Request, res: Response, next: NextFunction) => {
    //TODO check if tokenID === userID of comment
    postsService.remove(req.params.id)
        .then(() => res.status(200).json({}))
        .catch(err => next(err));
}
export {
    remove,
    update,
    comment,
    like,
    getAll,
    create
}