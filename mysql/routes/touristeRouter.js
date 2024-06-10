import express from 'express';

import {
    getTouristes, getTouriste, createTouriste, updateTouriste, deleteTouriste,
    getImage, updateImage, deleteImage
} from '../controllers/touristeController.js';

const touristeRouter = express.Router();

// Route pour récupérer tous les touristes
touristeRouter.get("/Touristes", async (_req, res) => {
    const touristes = await getTouristes();
    res.send(touristes);
});

// Route pour récupérer un touriste par ID
touristeRouter.get("/Touriste/:id", async (req, res) => {
    const id = req.params.id;
    const touriste = await getTouriste(id);
    res.send(touriste);
});

// Route pour créer un nouveau touriste
touristeRouter.post("/Touriste", async (req, res) => {
    const { Nom, Prenom, adresse, telephone, localisation, villeVisite, image, password, email } = req.body;
    const touriste = await createTouriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image, password, email);
    res.status(201).send(touriste);
});

// Route pour mettre à jour un touriste par ID
touristeRouter.put("/Touriste/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom, Prenom, adresse, telephone, localisation, villeVisite, image } = req.body;
    const updated = await updateTouriste(id, Nom, Prenom, adresse, telephone, localisation, villeVisite, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

// Route pour supprimer un touriste par ID
touristeRouter.delete("/Touriste/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTouriste(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

// Route pour récupérer l'image d'un touriste par ID
touristeRouter.get("/TouristeImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Route pour mettre à jour l'image d'un touriste par ID
touristeRouter.put("/updateImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

// Route pour supprimer l'image d'un touriste par ID
touristeRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { touristeRouter };
