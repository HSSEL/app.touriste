/**
 * Au niveau des fichiers du dossier routes nous definissant des routes pour gerer des operations 
 * mentionnees au niveau des controllers
 * cela permet de diviser notre application en modules logiques et de mieux organiser notre code
*/

import express from 'express';

import {
    getVilles, getVille, createVille, updateVille, deleteVille,
    getImage, updateImage, deleteImage
} from '../controllers/villeController.js';

const villeRouter = express.Router();

villeRouter.get("/villes", async (_req, res) => {
    //async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
    const villes = await getVilles();
    res.send(villes);
});

villeRouter.get("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const ville = await getVille(id);
    res.send(ville);
});

villeRouter.post("/ville", async (req, res) => {
    const { Nom, Description, Quartiers, image } = req.body;
    const ville = await createVille(Nom, Description, Quartiers, image);
    res.status(201).send(ville);
});

villeRouter.put("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const { Nom, Description, Quartiers, image } = req.body;
    const updated = await updateVille(id, Nom, Description, Quartiers, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

villeRouter.delete("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteVille(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

villeRouter.get("/villeImage/:id", async (req, res) => {
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
villeRouter.put("/updateImage/:id", async (req, res) => {
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
villeRouter.delete("/deleteImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { villeRouter };
