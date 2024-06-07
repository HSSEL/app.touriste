import express from 'express';
import {
    getCommentsSante, getCommentSante,
    createCommentSante, updateCommentSante, deleteCommentSante,
    getImage, deleteImage, updateImage
} from '../controllers/commentsanteController.js';

const commentSanteRouter = express.Router();

commentSanteRouter.get("/comments", async (_req, res) => {
    const comments = await getCommentsSante();
    res.send(comments);
});

commentSanteRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getCommentSante(id);
    res.send(comment);
});

commentSanteRouter.post("/comment", async (req, res) => {
    const { sante_id, id_touriste, Texte, Date, image } = req.body;
    const comment = await createCommentSante(sante_id, id_touriste, Texte, Date, image);
    res.status(201).send({ id: comment });
});

commentSanteRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentSante(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

commentSanteRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentSante(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

commentSanteRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentSanteRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentSanteRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentSanteRouter };
