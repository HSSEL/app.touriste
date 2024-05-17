import express from 'express'

import { getSantes,getSanteVille,getSante,createSante } from '../controllers/santeController'

const santeRouter=express.Router()


santeRouter.get("/Santes",async (req,res)=>{
    const santes=await getSantes()
    res.send(santes)
})

santeRouter.get("/Sante:id",async (req,res)=>{
    const id= req.params.id
    const sante=await getSante(id)
    res.send(sante)
})

transportRouter.get("/santeVille:id",async (req,res)=>{
    const id= req.params.id
    const santeville=await getSanteVille(id)
    res.send(santeville)
})

santeRouter.post("/Sante:",async (req,res)=>{
    const {id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email} =req.body
    const sante=await createVille(id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email)
    res.status(201).send(sante)
})

santeRouter.put("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email } = req.body;
    const updated = await updateSante(id, id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



santeRouter.delete("/Sante/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteSante(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {santeRouter}