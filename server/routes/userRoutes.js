import express from 'express'
import { getUsers, login, signup } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.post('/login', login)
userRouter.post('/signup', signup)

export default userRouter
