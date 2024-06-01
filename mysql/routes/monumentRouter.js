import express from 'express'

import { getMonuments,getMonumentVille,getMonument,createMonument, updateMonument, deleteMonument,getImage } from '../controllers/monumentController.js'

const monumentRouter=express.Router()


monumentRouter.get("/Monuments",async (_req,res)=>{
    const monuments=await getMonuments()
    res.send(monuments)
})

monumentRouter.get("/Monument/:id",async (req,res)=>{
    const id= req.params.id
    const monument=await getMonument(id)
    res.send(monument)
})

monumentRouter.get("/monumentVille/:id",async (req,res)=>{
    const id= req.params.id
    const monumentville=await getMonumentVille(id)
    res.send(monumentville)
})

monumentRouter.post("/Monument:",async (req,res)=>{
    const {id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation} =req.body
    const monument=await createMonument(id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation)
    res.status(201).send(monument)
})

monumentRouter.put("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation} = req.body;
    const updated = await updateMonument(id, id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



monumentRouter.delete("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteMonument(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});


monumentRouter.get("/monumentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});


export {monumentRouter}