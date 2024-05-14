import express from 'express'

import { villeRouter } from './routes/villeRouter'

const app=express()

app.use(express.json())

app.use('/villes',villeRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})