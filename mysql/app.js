import express from 'express'
import cors from 'cors'
import { villeRouter } from './routes/villeRouter.js'
import { tranportRouter } from './routes/transportRouter.js'
import { touristeRouter } from './routes/touristeRouter.js'
import { santeRouter } from './routes/santeRouter.js'
import {reservationRouter} from './routes/reservationRouter.js'
import { publicationRouter } from './routes/publicationRouter.js'
import { paysageRouter } from './routes/paysageRouter.js'
import {offreRouter} from './routes/offreRouter.js'
import {contactusRouter} from './routes/contactusRouter.js'
import {commentvilleRouter} from './routes/commentvilleRouter.js'
import {commenttransportRouter} from './routes/commenttransportRouter.js'
import {commentPaysageRouter} from './routes/commentpaysageRouter.js'
import {commentPublicationRouter} from './routes/commentpublicationRouter.js'
import { monumentRouter } from './routes/monumentRouter.js'
import { etablissementRouter } from './routes/etablissementRouter.js'
import { utilisateurRouter} from './routes/userRouter.js'
import {commentSanteRouter} from './routes/commentsanteRouter.js'
import  {commentEtablissementRouter} from './routes/commentetablissementRouter.js'
import {authRouter} from './routes/authRouter.js'
const app=express()

app.use(express.json())
app.use(cors());

app.use('/vi',villeRouter)
app.use('/tro',tranportRouter)
app.use('/tou',touristeRouter)
app.use('/san',santeRouter)
app.use('/pub',publicationRouter)
app.use('/pay',paysageRouter)
app.use('/mon',monumentRouter)
app.use('/eta',etablissementRouter)
app.use('/aut',utilisateurRouter)
app.use('/cosante',commentSanteRouter)
app.use('/coeta',commentEtablissementRouter)
app.use('/res',reservationRouter)
app.use('/off',offreRouter)
app.use('/con',contactusRouter)
app.use('/comvi',commentvilleRouter)
app.use('/comtr',commenttransportRouter)
app.use('/compa',commentPaysageRouter)
app.use('/compu',commentPublicationRouter)

app.use('/auth',authRouter)





app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})