import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import bikeRoutes from './routes/bikeRouter.js'
const app = express()

app.use('/bikes', bikeRoutes)

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

const CONNECTION_URL = "mongodb+srv://reneboaventuraneto:reneboaventuraneto123@cluster0.7jzx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch(err => console.log(err.message))
