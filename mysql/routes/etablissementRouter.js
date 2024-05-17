import express from 'express'

import { getEtablissements,getEtablissementVille,getEtablissement, createEtablissement} from '../controllers/etablissementController'

const etablissementRouter=express.Router()


etablissementRouter.get("/Etablissements",async (req,res)=>{
    const etablissements=await getEtablissements()
    res.send(etablissements)
})

etablissementRouter.get("/Etablissement:id",async (req,res)=>{
    const id= req.params.id
    const etablissement=await getEtablissement(id)
    res.send(etablissement)
})

etablissementRouter.get("/etablissementVille:id",async (req,res)=>{
    const id= req.params.id
    const etablissementville=await getEtablissementVille(id)
    res.send(etablissementville)
})

etablissementRouter.post("/Etablissement:",async (req,res)=>{
    const {id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux} =req.body
    const etablissement=await createEtablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux)
    res.status(201).send(etablissement)
})

etablissementRouter.put("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux} = req.body;
    const updated = await updateEtablissement(id, id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux);
    if (updated) {
        res.send('Updated succefully');
    } else {
        res.send('Unsucceful update');
    }
});



etablissementRouter.delete("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteEtablissement(id);
    if (deleted) {
        res.send('Deleted succefully');
    } else {
        res.send('Unsuccessful delete');
    }
});



export {etablissementRouter}