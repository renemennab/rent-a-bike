import express from 'express'
import { createBike, getBikes, updateBike } from '../controllers/bikeControllers.js'

const bikeRouter = express.Router()

bikeRouter.get('/', getBikes)
bikeRouter.post('/', createBike)
bikeRouter.patch('/:id', updateBike)

export default bikeRouter
