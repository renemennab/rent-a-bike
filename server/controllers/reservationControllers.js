import mongoose from 'mongoose'
import ReservationModel from '../models/reservationModel.js'

export async function getReservations(req, res) {
    try {
        const reservations = await ReservationModel.find()

        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function getReservation(req, res) {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No reservation with that id')

    try {
        const reservation = await ReservationModel.findById(_id)

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function createReservation(req, res) {
    const reservation = req.body

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    const newReservation = new ReservationModel({
        ...reservation,
        userId: req.userId,
        cratedAt: new Date().getTime()
    })
    try {
        await newReservation.save()

        // successful creation
        return res.status(201).json(newReservation)
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export async function updateReservation(req, res) {
    const { id: _id } = req.params
    const updatedReservation = req.body

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No reservation with that id')

    const updateResponse = await ReservationModel.findByIdAndUpdate(_id, { ...updatedReservation, _id }, { new: true })

    return res.json(updateResponse)
}

export async function deleteReservation(req, res) {
    const { id: _id } = req.params

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No reservation with that id')

    await ReservationModel.findByIdAndRemove(_id)

    return res.json('Reservation deleted successfuly')
}

export async function getUserReservations(req, res) {
    const { id: _id } = req.params

    try {
        const reservations = await ReservationModel.find().where('userId').equals(_id)

        return res.status(200).json(reservations)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}