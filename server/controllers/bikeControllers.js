import mongoose from 'mongoose'
import BikeModel from '../models/bikeModel.js'
import ReservationModel from '../models/reservationModel.js'
import checkIfDatesOverlap from './utils.js'

export async function getBikesByDates(req, res) {
    const { datesString } = req.params
    const datesObj = JSON.parse(datesString)

    try {
        const reservations = await ReservationModel.find()
        const idsFromBikesWithConflicts = reservations.reduce((acc, reservation) => {
            const overlap = checkIfDatesOverlap(datesObj, reservation.startTimestamp, reservation.endTimestamp)
            if (overlap) acc.add(reservation.bikeId)

            return acc
        }, new Set())
        const bikes = await BikeModel.find()
        // const availableBikes = await BikeModel.find({ _id: { $nin: idsFromBikesWithConflicts } })
        const availableBikes = bikes.map(bike => {
            const isAvailable = ![...idsFromBikesWithConflicts].includes(bike._id.toString())

            return Object.assign(bike, { isAvailable })
        })

        return res.status(200).json(availableBikes)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function getBikes(req, res) {
    try {
        const bikes = await BikeModel.aggregate([{ $addFields: { rateAverage: { $avg: '$ratings.rating' } } }])
        console.log(bikes)

        return res.status(200).json(bikes)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function getBike(req, res) {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No bike with that id')

    try {
        const bike = await BikeModel.findById(_id)

        return res.status(200).json(bike)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export async function createBike(req, res) {
    const bike = req.body

    if (!req.userId) return res.json({ message: 'Unauthenticated' })
    const newBike = new BikeModel({ ...bike, creator: req.bikeId, cratedAt: new Date().getTime() })
    try {
        await newBike.save()

        // successful creation
        return res.status(201).json(newBike)
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export async function updateBike(req, res) {
    const { id: _id } = req.params
    const updatedBike = req.body

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No bike with that id')

    const updateResponse = await BikeModel.findByIdAndUpdate(_id, { ...updatedBike, _id }, { new: true })

    return res.json(updateResponse)
}

export async function rateBike(req, res) {
    const { id: _id } = req.params
    const { rating } = req.body
    const { userId } = req

    if (!userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No bike with that id')

    const updateResponse = await BikeModel.updateOne({ _id }, [
        {
            $set: {
                ratings: {
                    $cond: [
                        { $in: [userId, '$ratings.userId'] },
                        {
                            $map: {
                                input: '$ratings',
                                in: {
                                    $cond: [
                                        { $eq: ['$$this.userId', userId] },
                                        {
                                            userId: '$$this.userId',
                                            rating: { $add: rating }
                                        },
                                        '$$this'
                                    ]
                                }
                            }
                        },
                        { $concatArrays: ['$ratings', [{ userId, rating }]] }
                    ]
                }
            }
        }
    ])

    return res.json(updateResponse)
}

export async function deleteBike(req, res) {
    const { id: _id } = req.params

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No bike with that id')

    await BikeModel.findByIdAndRemove(_id)

    return res.json('Bike deleted successfuly')
}
