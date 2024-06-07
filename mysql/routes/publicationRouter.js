import express from 'express'

import { getPublications, getPublication, createPublication, updatePublication, deletePublication,getImage} from '../controllers/publicationController.js'

const publicationRouter=express.Router()


publicationRouter.get("/Publications",async (_req,res)=>{
    const publications=await getPublications()
    res.send(publications)
})

publicationRouter.get("/Publication/:id",async (req,res)=>{
    const id= req.params.id
    const publication=await getPublication(id)
    res.send(publication)
})

publicationRouter.post("/publicationCreate:",async (req,res)=>{
    const {objet,text,image,type,date,etablissement_id} =req.body
    const sante=await createPublication(id_publication,objet,text,image,type,date,etablissement_id)
    res.status(201).send(publication)
})


publicationRouter.put("/publicationUpdate/:id", async (req, res) => {
    const id = req.params.id;
    const { objet,text,image,type,date,etablissement_id} = req.body;
    const updated = await updatePublication(id, objet,text,image,type,date,etablissement_id);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});






publicationRouter.delete("/publicationDelete/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deletePublication(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

publicationRouter.get("/publicationImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});
export {publicationRouter}



