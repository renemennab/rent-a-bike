import express from 'express'
import { createBike, getBikes, updateBike, deleteBike } from '../controllers/bikeControllers.js'
import middlewareAuth from '../middleware/middlewareAuth.js'

const bikeRouter = express.Router()

bikeRouter.get('/', getBikes)
bikeRouter.post('/', middlewareAuth, createBike)
bikeRouter.patch('/:id', middlewareAuth, updateBike)
bikeRouter.delete('/:id', middlewareAuth, deleteBike)

export default bikeRouter
