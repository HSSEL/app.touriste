import express from 'express';

import { getPublications, getPublication, createPublication, updatePublication, deletePublication,getImage,updateCoeur} from '../controllers/publicationController.js'

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


publicationRouter.put('/publication/:id/coeur', async (req, res) => {
    const { id } = req.params;
    const { coeur } = req.body;

    try {
        const result = await updateCoeur(id, coeur);
        res.status(200).json({ message: 'Number of hearts updated successfully', updatedId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { publicationRouter };
