import express from 'express'
import {authenticate, getAll,  getById, register} from "../controllers/users.js"

const router = express.Router()

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getById);
router.get('/:id', getById);

export default router