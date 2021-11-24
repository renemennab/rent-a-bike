import express from 'express'
import { createBike, getBikes } from '../controllers/bikeControllers.js'

const bikeRouter = express.Router()

bikeRouter.get('/', getBikes)
bikeRouter.post('/', createBike)

export default bikeRouter
