import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import indexRoute from './routes/index.route.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1', indexRoute)

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
})