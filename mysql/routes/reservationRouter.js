import express from 'express'

import { getReservations, getReservation, makeReservation, updateReservation, deleteReservation} from '../controllers/publicationController'

const reservationRouter=express.Router()


publicationRouter.get("/Publications",async (_req,res)=>{
    const publications=await getPublications()
    res.send(publications)
})

publicationRouter.get("/Publication:id",async (req,res)=>{
    const id= req.params.id
    const publication=await getPublication(id)
    res.send(publication)
})

publicationRouter.post("/Publication:",async (req,res)=>{
    const {objet,text,image,type,date} =req.body
    const sante=await createPublication(id_publication,objet,text,image,type,date)
    res.status(201).send(publication)
})


publicationRouter.put("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const { objet,text,image,type,date} = req.body;
    const updated = await updatePublication(id, objet,text,image,type,date);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});






publicationRouter.delete("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deletePublication(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {reservationRouter}



