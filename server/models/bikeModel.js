import mongoose from 'mongoose'
const { Schema } = mongoose

const bikeSchema = new Schema({
    model: String,
    color: String,
    location: String,
    rating: String,
    isAvailable: Boolean
});

const BikeModel = mongoose.model('Bike', bikeSchema)

export default BikeModel