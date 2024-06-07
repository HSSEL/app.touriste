import express from 'express';

import {
    getTouristes, getTouriste, createTouriste, updateTouriste, deleteTouriste,
    getImage, updateImage, deleteImage
} from '../controllers/touristeController.js';

const touristeRouter = express.Router();

touristeRouter.get("/Touristes", async (_req, res) => {
    const touristes = await getTouristes();
    res.send(touristes);
});

touristeRouter.get("/Touriste/:id", async (req, res) => {
    const id = req.params.id;
    const touriste = await getTouriste(id);
    res.send(touriste);
});

touristeRouter.post("/Touriste", async (req, res) => {
    const { Nom, Prenom, adresse, telephone, localisation, villeVisite, image } = req.body;
    const touriste = await createTouriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image);
    res.status(201).send(touriste);
});

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

touristeRouter.delete("/Touriste/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteTouriste(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

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

// Route to update an image
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

// Route to delete an image
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
