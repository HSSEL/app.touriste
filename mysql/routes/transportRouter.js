import express from 'express';

import {
    getTranports, getTranport, getTranportVille, createTranport, updateTransport, deleteTransport,
    getImage, updateImage, deleteImage
} from '../controllers/transportController.js';

const tranportRouter = express.Router();

tranportRouter.get("/Tranports", async (_req, res) => {
    const tranports = await getTranports();
    res.send(tranports);
});

tranportRouter.get("/Tranport/:id", async (req, res) => {
    const id = req.params.id;
    const tranport = await getTranport(id);
    res.send(tranport);
});

tranportRouter.get("/TranportVille/:id", async (req, res) => {
    const id = req.params.id;
    const tranportVille = await getTranportVille(id);
    res.send(tranportVille);
});

tranportRouter.post("/Tranport", async (req, res) => {
    const { ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif } = req.body;
    const tranport = await createTranport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif);
    res.status(201).send(tranport);
});

tranportRouter.put("/Tranport/:id", async (req, res) => {
    const id = req.params.id;
    const { ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif } = req.body;
    const updated = await updateTransport(id, ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

tranportRouter.delete("/Tranport/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTransport(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

tranportRouter.get("/TranportImage/:id", async (req, res) => {
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
tranportRouter.put("/updateImage/:id", async (req, res) => {
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
tranportRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { tranportRouter };
