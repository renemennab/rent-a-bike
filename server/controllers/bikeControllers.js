import mongoose from 'mongoose'
import BikeModel from '../models/bikeModel.js'

export async function getBikes(req, res) {
    try {
        const bikes = await BikeModel.find()
        console.log(bikes)

        return res.status(200).json(bikes)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function createBike(req, res) {
    const bike = req.body

    const newBike = new BikeModel(bike)
    try {
        await newBike.save()
        // successful creation
        res.status(201).json(newBike)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export async function updateBike(req, res) {
    const { id: _id } = req.params
    const updatedBike = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updateResponse = await BikeModel.findByIdAndUpdate(_id, { ...updatedBike, _id }, { new: true })

    return res.json(updateResponse)
}
