import express from 'express';

import {
    getPublications, getPublication, createPublication, updatePublication, deletePublication,
    getImage, updateImage, deleteImage
} from '../controllers/publicationController.js';

const publicationRouter = express.Router();

publicationRouter.get("/Publications", async (_req, res) => {
    const publications = await getPublications();
    res.send(publications);
});

publicationRouter.get("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const publication = await getPublication(id);
    res.send(publication);
});

publicationRouter.post("/Publication", async (req, res) => {
    const { objet, text, image, type, date, etablissement_id } = req.body;
    const publication = await createPublication(objet, text, image, type, date, etablissement_id);
    res.status(201).send(publication);
});

publicationRouter.put("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const { objet, text, image, type, date, etablissement_id } = req.body;
    const updated = await updatePublication(id, objet, text, image, type, date, etablissement_id);
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

publicationRouter.get("/PublicationImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Route to update an image
publicationRouter.put("/updateImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

// Route to delete an image
publicationRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { publicationRouter };
