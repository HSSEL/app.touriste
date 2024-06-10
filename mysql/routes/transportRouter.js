import express from 'express';

import {
    getTransports, getTransport, getTransportVille, createTransport, updateTransport, deleteTransport,
    getImage, updateImage, deleteImage
} from '../controllers/transportController.js';

const transportRouter = express.Router();

// Route pour récupérer tous les transports
transportRouter.get("/Transports", async (_req, res) => {
    const transports = await getTransports();
    res.send(transports);
});

// Route pour récupérer un transport par ID
transportRouter.get("/Transport/:id", async (req, res) => {
    const id = req.params.id;
    const transport = await getTransport(id);
    res.send(transport);
});

// Route pour récupérer les transports par ID de ville
transportRouter.get("/TransportVille/:id", async (req, res) => {
    const id = req.params.id;
    const transportVille = await getTransportVille(id);
    res.send(transportVille);
});

// Route pour créer un nouveau transport
transportRouter.post("/Transport", async (req, res) => {
    const { ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif } = req.body;
    const transport = await createTransport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif);
    res.status(201).send(transport);
});

// Route pour mettre à jour un transport par ID
transportRouter.put("/Transport/:id", async (req, res) => {
    const id = req.params.id;
    const { ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif } = req.body;
    const updated = await updateTransport(id, ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

// Route pour supprimer un transport par ID
transportRouter.delete("/Transport/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTransport(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

// Route pour récupérer l'image d'un transport par ID
transportRouter.get("/TransportImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Route pour mettre à jour une image de transport par ID
transportRouter.put("/updateImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

// Route pour supprimer une image de transport par ID
transportRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { transportRouter };
