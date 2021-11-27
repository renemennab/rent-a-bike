import express from 'express'
import pathConstants from '../../src/pathConstants.js'
import {
    createBike,
    getBikes,
    getBike,
    updateBike,
    deleteBike,
    getBikesByDates
} from '../controllers/bikeControllers.js'
import middlewareAuth from '../middleware/middlewareAuth.js'

const bikeRouter = express.Router()

bikeRouter.get('/:id', getBike)
bikeRouter.get('/', getBikes)
bikeRouter.get(`/${pathConstants.BIKES_BY_DATES}/:datesString`, getBikesByDates)
bikeRouter.post('/', middlewareAuth, createBike)
bikeRouter.patch('/:id', middlewareAuth, updateBike)
bikeRouter.delete('/:id', middlewareAuth, deleteBike)

export default bikeRouter
