import express from 'express'

import { getSantes,getSanteVille,getSante,createSante } from '../controllers/santeController'

const touristeRouter=express.Router()


touristeRouter.get("/Santes",async (req,res)=>{
    const touristes=await getTouristes()
    res.send(touristes)
})

touristeRouter.get("/Sante:id",async (req,res)=>{
    const id= req.params.id
    const touriste=await getTouriste(id)
    res.send(touriste)
})


touristeRouter.post("/Sante:",async (req,res)=>{
    const {Nom,Prenom,adresse,telephone,localisation,villeVisite} =req.body
    const touriste=await createVille(Nom,Prenom,adresse,telephone,localisation,villeVisite)
    res.status(201).send(touriste)
})

export {touristeRouter}