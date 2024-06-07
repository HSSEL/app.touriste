import express from 'express';
import {
    getCommentsEtablissement, getComment, getCommentEtablissement,
    createCommentEtablissement, updateCommentEtablissement, deleteCommentEtablissement,
    getImage, deleteImage, updateImage
} from '../controllers/commentetablissementController.js';

const commentEtablissementRouter = express.Router();

commentEtablissementRouter.get("/comments", async (_req, res) => {
    const comments = await getCommentsEtablissement();
    res.send(comments);
});

commentEtablissementRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getComment(id);
    res.send(comment);
});

commentEtablissementRouter.get("/comments/etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const comments = await getCommentEtablissement(id);
    res.send(comments);
});

commentEtablissementRouter.post("/comment", async (req, res) => {
    const { etablissement_id, id_touriste, Texte, Date, image } = req.body;
    const comment = await createCommentEtablissement(etablissement_id, id_touriste, Texte, Date, image);
    res.status(201).send({ id: comment });
});

commentEtablissementRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentEtablissement(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

commentEtablissementRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentEtablissement(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

commentEtablissementRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentEtablissementRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentEtablissementRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentEtablissementRouter };
