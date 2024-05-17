import express from 'express'

import { getPaysages,getPaysageVille,getPaysage,createPaysage, updatePaysage, deletePaysage } from '../controllers/paysageController'

const paysageRouter=express.Router()


paysageRouter.get("/Paysages",async (_req,res)=>{
    const paysages=await getPaysages()
    res.send(paysages)
})

paysageRouter.get("/Paysage:id",async (req,res)=>{
    const id= req.params.id
    const paysage=await getPaysage(id)
    res.send(paysage)
})

transportRouter.get("/paysageVille:id",async (req,res)=>{
    const id= req.params.id
    const paysageville=await getPaysageVille(id)
    res.send(paysageville)
})

paysageRouter.post("/Paysage:",async (req,res)=>{
    const {ville_id,nom,description,localisation,horarire_ouverture} =req.body
    const paysage=await createPaysage(ville_id,nom,description,localisation,horarire_ouverture)
    res.status(201).send(paysage)
})

paysageRouter.put("/Paysage/:id", async (req, res) => {
    const id = req.params.id;
    const { ville_id,nom,description,localisation,horarire_ouverture} = req.body;
    const updated = await updatePaysage(id, ville_id,nom,description,localisation,horarire_ouverture);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



paysageRouter.delete("/Paysage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deletePaysage(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {paysageRouter}