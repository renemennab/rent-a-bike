import express from 'express'
import { getUser, getUsers, login, signup, updateUser, deleteUser } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.post('/login', login)
userRouter.post('/signup', signup)
userRouter.get('/:id', getUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
export default userRouter
