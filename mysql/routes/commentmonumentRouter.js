import express from 'express';
import {
    getCommentsMonument, getCommentMonument,
    createCommentMonument, updateCommentMonument, deleteCommentMonument,
    getImage, deleteImage, updateImage
} from '../controllers/commentmonumentController.js';

const commentMonumentRouter = express.Router();

commentMonumentRouter.get("/comments", async (_req, res) => {
    const comments = await getCommentsMonument();
    res.send(comments);
});

commentMonumentRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getCommentMonument(id);
    res.send(comment);
});

commentMonumentRouter.post("/comment", async (req, res) => {
    const { id_touriste, Texte, Date, image, monument_id } = req.body;
    const comment = await createCommentMonument(id_touriste, Texte, Date, image, monument_id);
    res.status(201).send({ id: comment });
});

commentMonumentRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentMonument(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

commentMonumentRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentMonument(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

commentMonumentRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentMonumentRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentMonumentRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentMonumentRouter };
