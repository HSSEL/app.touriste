import express from 'express'

import { getTouristes,getTouriste,createTouriste,updateTouriste,deleteTouriste,getImage } from '../controllers/touristeController.js'

const touristeRouter=express.Router()


touristeRouter.get("/touristes",async (_req,res)=>{
    const touristes=await getTouristes()
    res.send(touristes)
})

touristeRouter.get("/touriste/:id",async (req,res)=>{
    const id= req.params.id
    const touriste=await getTouriste(id)
    res.send(touriste)
})


touristeRouter.post("/touriste:",async (req,res)=>{
    const {Nom,Prenom,adresse,telephone,localisation,villeVisite,image} =req.body
    const touriste=await createTouriste(Nom,Prenom,adresse,telephone,localisation,villeVisite,image)
    res.status(201).send(touriste)
})

touristeRouter.put("/touriste/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom,Prenom,adresse,telephone,localisation,villeVisite,image} = req.body;
    const updated = await updateTouriste(id, Nom,Prenom,adresse,telephone,localisation,villeVisite,image);
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


touristeRouter.get("/touristeImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

export {touristeRouter}