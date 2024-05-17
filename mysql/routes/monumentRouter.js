import express from 'express'

import { getMonuments,getMonumentVille,getMonument,createPaysage, updateMonument } from '../controllers/monumentController'

const monumentRouter=express.Router()


monumentRouter.get("/Monuments",async (req,res)=>{
    const monuments=await getMonuments()
    res.send(monuments)
})

monumentRouter.get("/Monument:id",async (req,res)=>{
    const id= req.params.id
    const monument=await getMonument(id)
    res.send(monument)
})

monumentRouter.get("/monumentVille:id",async (req,res)=>{
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
        res.send('Updated succefully');
    } else {
        res.send('Unsucceful update');
    }
});



monumentRouter.delete("/Monument/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteMonument(id);
    if (deleted) {
        res.send('Deleted succefully');
    } else {
        res.send('Unsuccessful delete');
    }
});


export {monumentRouter}