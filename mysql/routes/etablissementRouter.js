import express from 'express'

import { getEtablissements,getEtablissementVille,getEtablissement,getEtablissementType, createEtablissement, updateEtablissement, deleteEtablissement,getImage} from '../controllers/etablissementController.js'

const etablissementRouter=express.Router()


etablissementRouter.get("/Etablissements",async (_req,res)=>{
    const etablissements=await getEtablissements()
    res.send(etablissements)
})

etablissementRouter.get("/Etablissement/:id",async (req,res)=>{
    const id= req.params.id
    const etablissement=await getEtablissement(id)
    res.send(etablissement)
})

etablissementRouter.get("/etablissementVille/:id",async (req,res)=>{
    const id= req.params.id
    const etablissementville=await getEtablissementVille(id)
    res.send(etablissementville)
})

etablissementRouter.get("/etablissement/:type",async (req,res)=>{
    const type= req.params.type
    const etablissementtype=await getEtablissementType(type)
    res.send(etablissementtype)
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
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



etablissementRouter.delete("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteEtablissement(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

etablissementRouter.get("/etablissementImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});


export {etablissementRouter}