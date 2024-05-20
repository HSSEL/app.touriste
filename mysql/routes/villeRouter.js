

import express from 'express'

import { getVille,getVilles,createVille,updateVille, deleteVille} from '../controllers/villeController'

const villeRouter=express.Router()


villeRouter.get("/villes",async (_req,res)=>{
    const villes=await getVilles()
    res.send(villes)
})

villeRouter.get("/ville:id",async (req,res)=>{
    const id= req.params.id
    const ville=await getVille(id)
    res.send(ville)
})


villeRouter.post("/ville:",async (req,res)=>{
    const {Nom,Description,Quartiers} =req.body
    const ville=await createVille(Nom,Description,Quartiers)
    res.status(201).send(ville)
})


villeRouter.put("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom, Description, Quartiers } = req.body;
    const updated = await updateVille(id, Nom, Description, Quartiers);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});



villeRouter.delete("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteVille(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});


export {villeRouter}