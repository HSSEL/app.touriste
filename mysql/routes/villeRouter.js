

import express from 'express'

import { getVille,getVilles,createVille } from '../controllers/villeController'

const villeRouter=express.Router()


villeRouter.get("/villes",async (req,res)=>{
    const villes=await getVilles()
    res.send(villes)
})

villeRouter.get("/ville:id",async (req,res)=>{
    const id= req.params.id
    const ville=await getVille(id)
    res.send(ville)
})


villeRouter.post("/ville:",async (req,res)=>{
    const {Nom,Description,Quartiers} =req.body
    const ville=await createVille(Nom,Description,Quartiers)
    res.status(201).send(ville)
})

export {villeRouter}