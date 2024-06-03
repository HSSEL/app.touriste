import express from 'express'
import cors from 'cors'
import { villeRouter } from './routes/villeRouter.js'
import { transportRouter } from './routes/transportRouter.js'
import { touristeRouter } from './routes/touristeRouter.js'
import { santeRouter } from './routes/santeRouter.js'
import {reservationRouter} from './routes/reservationRouter.js'
import { publicationRouter } from './routes/publicationRouter.js'
import { paysageRouter } from './routes/paysageRouter.js'
import {offreRouter} from './routes/offreRouter.js'
import {contactusRouter} from './routes/contactusRouter.js'
import {commentvilleRouter} from './routes/commentvilleRouter.js'
import {commenttransportRouter} from './routes/commenttransportRouter.js'
import {commentpaysageRouter} from './routes/commentpaysageRouter.js'
import {commentpublicationRouter} from './routes/commentpublicationRouter.js'
import { monumentRouter } from './routes/monumentRouter.js'
import { etablissementRouter } from './routes/etablissementRouter.js'
import { utilisateurRouter} from './routes/connexionRouter.js'
import {commentsanteRouter} from './routes/commentsanteRouter.js'
import { commentetablissementRouter } from './routes/commentetablissementRouter.js'
const app=express()

app.use(express.json())
app.use(cors());

app.use('/vi',villeRouter)
app.use('/tro',transportRouter)
app.use('/tou',touristeRouter)
app.use('/san',santeRouter)
app.use('/pub',publicationRouter)
app.use('/pay',paysageRouter)
app.use('/mon',monumentRouter)
app.use('/eta',etablissementRouter)
app.use('/aut',utilisateurRouter)
app.use('/cosante',commentsanteRouter)
app.use('/coeta',commentetablissementRouter)
app.use('/res',reservationRouter)
app.use('/off',offreRouter)
app.use('/con',contactusRouter)
app.use('/comvi',commentvilleRouter)
app.use('/comtr',commenttransportRouter)
app.use('/compa',commentpaysageRouter)
app.use('/compu',commentpublicationRouter)



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})