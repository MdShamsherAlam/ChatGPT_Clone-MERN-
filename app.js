// const express =require('express')
import express from 'express'
// const morgan=require('morgan')
import morgan from 'morgan'
// const cors=require('cors')
import cors from 'cors'
import bodyParser from 'body-parser'
import color from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import openAiRoutes from './routes/openaiRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(errorHandler)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v2/openai', openAiRoutes)
app.use(express.static("client/build"))
const PORT = process.env.PORT || 8081


app.listen(PORT, () => {
    console.log(`server is in ${process.env.DEV_MODE} mode on Port ${PORT}`.bgCyan.white)
})
