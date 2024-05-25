import express from 'express'

import { getTouristes,getTouriste,createTouriste,updateTransport,deleteTouriste } from '../controllers/touristeController'

const touristeRouter=express.Router()


touristeRouter.get("/touristes",async (_req,res)=>{
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
    const touriste=await createTouriste(Nom,Prenom,adresse,telephone,localisation,villeVisite)
    res.status(201).send(touriste)
})

touristeRouter.put("/touriste/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom,Prenom,adresse,telephone,localisation,villeVisite } = req.body;
    const updated = await updateTransport(id, Nom,Prenom,adresse,telephone,localisation,villeVisite);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



touristeRouter.delete("/touriste/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTouriste(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {touristeRouter}