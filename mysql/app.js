import express from 'express'

import { villeRouter } from './routes/villeRouter'
import { transportRouter } from './routes/transportRouter'
import { touristeRouter } from './routes/touristeRouter'
import { santeRouter } from './routes/santeRouter'
import { publicationRouter } from './routes/publicationRouter'
import { paysageRouter } from './routes/paysageRouter'
import { monumentRouter } from './routes/monumentRouter'
import { etablissementRouter } from './routes/etablissementRouter'
import {connexionRouter} from './routes/connexionRouter'
import {commentsanteRouter} from './routes/commentsanteRouter'
import { commentetablissementRouter } from './routes/commentetablissementRouter'
const app=express()
const sequelize = require('./database');
const user = require('./models/user');

sequelize.sync().then(() => {
    console.log("Database synchronized");
  }).catch(err => {
    console.error("Error synchronizing database:", err);
  });

app.use(express.json())

app.use('/vi',villeRouter)
app.use('/tro',transportRouter)
app.use('/tou',touristeRouter)
app.use('/san',santeRouter)
app.use('/aut',publicationRouter)
app.use('/pay',paysageRouter)
app.use('/mon',monumentRouter)
app.use('/eta',etablissementRouter)
app.use('/aut',connexionRouter)
app.use('/cosante',commentsanteRouter)
app.use('/coeta',commentetablissementRouter)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080")
})


export {app}