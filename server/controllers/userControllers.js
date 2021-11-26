import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import secretString from '../middleware/constants.js'
import UserModel from '../models/userModel.js'

export async function login(req, res) {
    const { email, password } = req.body

    try {
        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) return res.status(404).json('User doesnt exist')

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json('Invalid Credentials')

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, isManager: existingUser.isManager },
            secretString,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ result: existingUser, token })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}

export async function signup(req, res) {
    const { email, password, firstName, lastName, isManager } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) return res.status(400).json('User already exist')
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            isManager
        })

        const token = jwt.sign({ email: newUser.email, id: newUser._id, isManager: newUser.isManager }, secretString, {
            expiresIn: '1h'
        })

        return res.status(200).json({ result: newUser, token })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' })
    }
}
