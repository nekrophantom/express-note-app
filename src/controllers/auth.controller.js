import bcrypt from 'bcrypt'
import { createNewUser } from '../services/auth.service.js'
import { findUserBy } from '../services/user.service.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res, next) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({ message: 'All Fields are required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createNewUser({name, email, password: hashedPassword})

        res.status(201).json({
            message: "User registered successfully",
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to register user', 
            error: error.message
        })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are Required" })
        }

        const user = await findUserBy({ email: email })

        if (!user) {
            return res.status(400).json({ message: 'User not Found!' })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: 'Failed to login', 
            error: error.message
        })
    }
}