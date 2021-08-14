import express from 'express'
import {authenticate, getAll,  getById, getCurrent, register, updateImage} from "../controllers/users.js"
import upload from '../_helpers/middleware'

const router = express.Router()



// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.post('/profileImage/:id', upload.single('file'),updateImage);



export default router