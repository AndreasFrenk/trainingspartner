import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { jwt } from './_helpers/jwt.js'
import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import userRoutes from './routes/users.js'
import { errorHandler } from './_helpers/errorHandler.js'

//Configuration
const app = express()
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json({ limit: '25mb' }))
app.use(cors())
const folderName = 'public'
app.use(express.static(__dirname + '/../' + folderName));

const folder = path.join(__dirname + '/../' + folderName)
console.log('folder: ' + folder)
app.use(jwt())

//Routes
app.use('/users', userRoutes)

//Error Handler
app.use(errorHandler)

const CONNECTION_URL = process.env.CONNECTION_URL!
const PORT = process.env.PORT!

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((e) => console.log(e.message))

mongoose.set('useFindAndModify', false)