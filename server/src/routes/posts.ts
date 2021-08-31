
import express from 'express'
import {comment, create, getAll, like, remove, update} from "../controllers/posts"

const router = express.Router()

// routes
router.post('/create', create);
router.get('/', getAll);
router.post('/:id/comment', comment)
router.post('/:id/like', like)
router.patch('/:id', update),
router.delete('/:id', remove)

export default router
