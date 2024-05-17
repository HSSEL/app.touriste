import express from 'express'

import { getTouristes,getTouriste,createController } from '../controllers/touristeController'

const touristeRouter=express.Router()


touristeRouter.get("/touristes",async (req,res)=>{
    const touristes=await getTouristes()
    res.send(touristes)
})

touristeRouter.get("/touriste:id",async (req,res)=>{
    const id= req.params.id
    const touriste=await getTouriste(id)
    res.send(touriste)
})


touristeRouter.post("/touriste:",async (req,res)=>{
    const {Nom,Prenom,adresse,telephone,localisation,villeVisite} =req.body
    const touriste=await createVille(Nom,Prenom,adresse,telephone,localisation,villeVisite)
    res.status(201).send(touriste)
})

villeRouter.put("/touriste/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom,Prenom,adresse,telephone,localisation,villeVisite } = req.body;
    const updated = await updateTransport(id, Nom,Prenom,adresse,telephone,localisation,villeVisite);
    if (updated) {
        res.send('Updated succefully');
    } else {
        res.send('Unsucceful update');
    }
});



villeRouter.delete("/touriste/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTouriste(id);
    if (deleted) {
        res.send('Deleted succefully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {touristeRouter}