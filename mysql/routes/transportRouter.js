import express from 'express'

import {getTranports,getTranportVille,getTranport,createTranport, updateTransport,deleteTransport,getImage} from '../controllers/transportController.js'

const transportRouter=express.Router()


transportRouter.get("/transports",async (_req,res)=>{
    const transports=await getTranports()
    res.send(transports)
})

transportRouter.get("/transportVille/:id",async (req,res)=>{
    const id= req.params.id
    const transportville=await getTranportVille(id)
    res.send(transportville)
})

transportRouter.get("/transport/:id",async (req,res)=>{
    const id= req.params.id
    const transport=await getTranport(id)
    res.send(transport)
})


transportRouter.post("/transport:",async (req,res)=>{
    const {ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif} =req.body
    const transport=await createTranport(ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif)
    res.status(201).send(transport)
})

transportRouter.put("/transport/:id", async (req, res) => {
    const id = req.params.id;
    const { ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif } = req.body;
    const updated = await updateTransport(id, ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



transportRouter.delete("/transport/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTransport(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

transportRouter.get("/transportImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

export {transportRouter}