import express from 'express';
import {
    getCommentsPaysage, getCommentPaysage,
    createCommentPaysage, updateCommentPaysage, deleteCommentPaysage,
    getImage, deleteImage, updateImage
} from '../controllers/commentpaysageController.js';

const commentPaysageRouter = express.Router();

commentPaysageRouter.get("/comments", async (_req, res) => {
    const comments = await getCommentsPaysage();
    res.send(comments);
});

commentPaysageRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getCommentPaysage(id);
    res.send(comment);
});

commentPaysageRouter.post("/comment", async (req, res) => {
    const { id_touriste, Texte, Date, image, paysage_id } = req.body;
    const comment = await createCommentPaysage(id_touriste, Texte, Date, image, paysage_id);
    res.status(201).send({ id: comment });
});

commentPaysageRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentPaysage(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

commentPaysageRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentPaysage(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

commentPaysageRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentPaysageRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentPaysageRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentPaysageRouter };
