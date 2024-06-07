import express from 'express';
import {
    getCommentsPublication, getCommentPublication,
    createCommentPublication, updateCommentPublication, deleteCommentPublication,
    getImage, deleteImage, updateImage
} from '../controllers/commentpublicationController.js';

const commentPublicationRouter = express.Router();

commentPublicationRouter.get("/comments", async (_req, res) => {
    const comments = await getCommentsPublication();
    res.send(comments);
});

commentPublicationRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getCommentPublication(id);
    res.send(comment);
});

commentPublicationRouter.post("/comment", async (req, res) => {
    const { id_touriste, Texte, Date, image, id_publication } = req.body;
    const comment = await createCommentPublication(id_touriste, Texte, Date, image, id_publication);
    res.status(201).send({ id: comment });
});

commentPublicationRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentPublication(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

commentPublicationRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentPublication(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

commentPublicationRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentPublicationRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentPublicationRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentPublicationRouter };
