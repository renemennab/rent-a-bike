import express from 'express'
import { createBike, getBikes, updateBike, deleteBike } from '../controllers/bikeControllers.js'

const bikeRouter = express.Router()

bikeRouter.get('/', getBikes)
bikeRouter.post('/', createBike)
bikeRouter.patch('/:id', updateBike)
bikeRouter.delete('/:id', deleteBike)

export default bikeRouter
