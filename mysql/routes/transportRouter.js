import express from 'express'

import {getTranports,getTranportVille,getTranport,createTransport, updateTransport} from '../controllers/transportController'

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

villeRouter.put("/transport/:id", async (req, res) => {
    const id = req.params.id;
    const { ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif } = req.body;
    const updated = await updateTransport(id, ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



villeRouter.delete("/transport/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTranport(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {transportRouter}