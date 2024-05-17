import express from 'express'

import { getPublications, getPublication, createPublication} from '../controllers/publicationController'

const publicationRouter=express.Router()


publicationRouter.get("/Publications",async (req,res)=>{
    const publications=await getPublications()
    res.send(publications)
})

publicationRouter.get("/Publication:id",async (req,res)=>{
    const id= req.params.id
    const publication=await getPublication(id)
    res.send(publication)
})

publicationRouter.post("/Publication:",async (req,res)=>{
    const {id_publication,objet,text,image,type,date} =req.body
    const sante=await createPublication(id_publication,objet,text,image,type,date)
    res.status(201).send(publication)
})

export {publicationRouter}
