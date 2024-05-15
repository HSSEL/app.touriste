import express from 'express'

import {getTranports,getTranportVille,getTranport,createTransport} from '../controllers/transportController'

const transportRouter=express.Router()


transportRouter.get("/transports",async (req,res)=>{
    const transports=await getTransports()
    res.send(transports)
})

transportRouter.get("/transportVille:id",async (req,res)=>{
    const id= req.params.id
    const transportville=await getTranportVille(id)
    res.send(transportville)
})

transportRouter.get("/transport:id",async (req,res)=>{
    const id= req.params.id
    const transport=await getTranport(id)
    res.send(transport)
})


transportRouter.post("/transport:",async (req,res)=>{
    const {ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif} =req.body
    const transport=await createTransport(ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif)
    res.status(201).send(transport)
})

export {transportRouter}