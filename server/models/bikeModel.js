import mongoose from 'mongoose'

const { Schema } = mongoose

const bikeSchema = new Schema({
    model: String,
    color: String,
    location: String,
    rating: Number,
    isAvailable: Boolean,
    creator: String,
    createdAt: { type: Number, default: new Date().getTime() }
})

const BikeModel = mongoose.model('Bike', bikeSchema)

export default BikeModel
