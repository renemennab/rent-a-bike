import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bikeRoutes from './routes/bikeRouter.js'
import userRouter from './routes/userRoutes.js'

const app = express()
dotenv.config()

// @ts-ignore
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/bikes', bikeRoutes)
app.use('/user', userRouter)
app.get('/', (req, res) => res.send('Hello to RENT A BIKE API'))
const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err.message))
