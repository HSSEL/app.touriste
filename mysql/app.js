import express from 'express'

import { villeRouter } from './routes/villeRouter.js'
import { transportRouter } from './routes/transportRouter.js'
import { touristeRouter } from './routes/touristeRouter.js'
import { santeRouter } from './routes/santeRouter.js'
import { publicationRouter } from './routes/publicationRouter.js'
import { paysageRouter } from './routes/paysageRouter.js'
import { monumentRouter } from './routes/monumentRouter.js'
import { etablissementRouter } from './routes/etablissementRouter.js'
import { utilisateurRouter} from './routes/connexionRouter.js'
import {commentsanteRouter} from './routes/commentsanteRouter.js'
import { commentetablissementRouter } from './routes/commentetablissementRouter.js'
const app=express()

app.use(express.json())

app.use('/vi',villeRouter)
app.use('/tro',transportRouter)
app.use('/tou',touristeRouter)
app.use('/san',santeRouter)
app.use('/aut',publicationRouter)
app.use('/pay',paysageRouter)
app.use('/mon',monumentRouter)
app.use('/eta',etablissementRouter)
app.use('/aut',utilisateurRouter)
app.use('/cosante',commentsanteRouter)
app.use('/coeta',commentetablissementRouter)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})