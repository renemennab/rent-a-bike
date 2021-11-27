import express from 'express'
import {
    createReservation,
    getReservations,
    getReservation,
    updateReservation,
    deleteReservation
} from '../controllers/reservationControllers.js'
import middlewareAuth from '../middleware/middlewareAuth.js'

const reservationRouter = express.Router()

reservationRouter.get('/:id', getReservation)
reservationRouter.get('/', getReservations)
reservationRouter.post('/', middlewareAuth, createReservation)
reservationRouter.patch('/:id', middlewareAuth, updateReservation)
reservationRouter.delete('/:id', middlewareAuth, deleteReservation)

export default reservationRouter
