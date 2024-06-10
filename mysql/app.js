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
import {commentPaysageRouter} from './routes/commentpaysageRouter.js'
import {commentPublicationRouter} from './routes/commentpublicationRouter.js'
import { monumentRouter } from './routes/monumentRouter.js'
import { etablissementRouter } from './routes/etablissementRouter.js'
import { utilisateurRouter} from './routes/userRouter.js'
import {commentSanteRouter} from './routes/commentsanteRouter.js'
import  {commentEtablissementRouter} from './routes/commentetablissementRouter.js'

const app=express()// ici on initialise une instance Express 
//ce qui est equivalent a la creation d'un serveur web pour notre plateforme


/*
Configuration de lapplication Express: on definit des middlewares
qui sont des fonctions qui ont accès à l'objet request (requête)
 et response (réponse) d'une requête HTTP.
*/

app.use(express.json())//permet a mon application de comprendre des requetes json
app.use(cors());//permettre au code du frontend d'utiliser du code backend


/*si dessous on associe des URL ou endpoint 
comme '/vi' a des fonctions de gestionnaire (handler functions) comme villerouter
qui sont exécutées lorsque l'endpoint est atteint
*/
app.use('/vi',villeRouter)
app.use('/tro',transportRouter)
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


/* Ci dessous on definit des middlewares de gestion des erreurs  
pour gérer les erreurs qui se produisent pendant le traitement des requêtes
*/
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
    //on demarre le serveur avec le port 8080
})