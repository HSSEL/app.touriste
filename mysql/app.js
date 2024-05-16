import express from 'express'

import { villeRouter } from './routes/villeRouter'
import { transportRouter } from './routes/transportRouter'
import { touristeRouter } from './routes/touristeRouter'
import { santeRouter } from './routes/santeRouter'
import { paysageRouter } from './routes/paysageRouter'
import { monumentRouter } from './routes/monumentRouter'
import { etablissementRouter } from './routes/etablissementRouter'

const app=express()

app.use(express.json())

app.use('/vi',villeRouter)
app.use('/tro',transportRouter)
app.use('/tou',touristeRouter)
app.use('/san',santeRouter)
app.use('/pay',paysageRouter)
app.use('/mon',monumentRouter)
app.use('/eta',etablissementRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})