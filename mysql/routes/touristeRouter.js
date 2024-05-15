import express from 'express'

import { getTouristes,getTouriste,createController } from '../controllers/touristeController'

const touristeRouter=express.Router()


touristeRouter.get("/touristes",async (req,res)=>{
    const touristes=await getTouristes()
    res.send(touristes)
})

touristeRouter.get("/ville:id",async (req,res)=>{
    const id= req.params.id
    const touriste=await getTouriste(id)
    res.send(touriste)
})


touristeRouter.post("/touriste:",async (req,res)=>{
    const {Nom,Prenom,adresse,telephone,localisation,villeVisite} =req.body
    const touriste=await createVille(Nom,Prenom,adresse,telephone,localisation,villeVisite)
    res.status(201).send(touriste)
})

export {touristeRouter}