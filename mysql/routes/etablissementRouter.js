import express from 'express';

import {
    getEtablissements, getEtablissementVille, getEtablissement, getEtablissementType,
    createEtablissement, updateEtablissement, deleteEtablissement,
    getImage1, getImage2, getImage3, updateImage1, updateImage2, updateImage3,
    deleteImage1, deleteImage2, deleteImage3
} from '../controllers/etablissementController.js';

const etablissementRouter = express.Router();

etablissementRouter.get("/Etablissements", async (_req, res) => {
    const etablissements = await getEtablissements();
    res.send(etablissements);
});

etablissementRouter.get("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const etablissement = await getEtablissement(id);
    res.send(etablissement);
});

etablissementRouter.get("/etablissementVille/:id", async (req, res) => {
    const id = req.params.id;
    const etablissementville = await getEtablissementVille(id);
    res.send(etablissementville);
});

etablissementRouter.get("/etablissement/:type", async (req, res) => {
    const type = req.params.type;
    const etablissementtype = await getEtablissementType(type);
    res.send(etablissementtype);
});

etablissementRouter.post("/Etablissement", async (req, res) => {
    const { id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating } = req.body;
    const etablissement = await createEtablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating);
    res.status(201).send(etablissement);
});

etablissementRouter.put("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const { id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating } = req.body;
    const updated = await updateEtablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating, id);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

etablissementRouter.delete("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteEtablissement(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

etablissementRouter.get("/etablissementImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage1(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

etablissementRouter.get("/etablissementImage2/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage2(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

etablissementRouter.get("/etablissementImage3/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage3(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Routes to update images
etablissementRouter.put("/updateImage1/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage1(id, image);
    if (updated) {
        res.send('Image 1 updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

etablissementRouter.put("/updateImage2/:id", async (req, res) => {
    const id = req.params.id;
    const { image2 } = req.body;
    const updated = await updateImage2(id, image2);
    if (updated) {
        res.send('Image 2 updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

etablissementRouter.put("/updateImage3/:id", async (req, res) => {
    const id = req.params.id;
    const { image3 } = req.body;
    const updated = await updateImage3(id, image3);
    if (updated) {
        res.send('Image 3 updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

// Routes to delete images
etablissementRouter.delete("/deleteImage1/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage1(id);
    if (deleted) {
        res.send('Image 1 deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

etablissementRouter.delete("/deleteImage2/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage2(id);
    if (deleted) {
        res.send('Image 2 deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

etablissementRouter.delete("/deleteImage3/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage3(id);
    if (deleted) {
        res.send('Image 3 deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { etablissementRouter };
