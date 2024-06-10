/**
 * Au niveau des fichiers du dossier routes nous definissons des routes pour gerer des operations 
 * mentionnees au niveau des controllers
 * cela permet de diviser notre application en modules logiques et de mieux organiser notre code
 * 
 * req.body : Contient les données envoyées par le client dans le corps de la requête.
 * 
 * Utilise writeHead pour écrire les en-têtes de la réponse HTTP
        Le code de statut 200 indique que la requête a réussi
        Content-Type indique ici que le contenu de la reponse est une image png

    La réponse est envoyée avec un code de statut 404 (Not Found) et le message "Image not found
    Envoie une réponse HTTP avec le statut 201 (Created)

    res.end(image, 'binary');
     image est le contenu binaire de l'image récupérée de la base de données
    
*/

import express from 'express';

import {
    getEtablissements, getEtablissementVille, getEtablissement, getEtablissementType,
    createEtablissement, updateEtablissement, deleteEtablissement,
    getImage1, getImage2, getImage3, updateImage1, updateImage2, updateImage3,
    deleteImage1, deleteImage2, deleteImage3
} from '../controllers/etablissementController.js';

const etablissementRouter = express.Router();

//afficher tous les etablissements
etablissementRouter.get("/Etablissements", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const etablissements = await getEtablissements();
    res.send(etablissements);
});


//afficher un seul etablissement
etablissementRouter.get("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const etablissement = await getEtablissement(id);
    res.send(etablissement);
});

//afficher un etablissement selon sa ville
etablissementRouter.get("/etablissementVille/:id", async (req, res) => {
    const id = req.params.id;
    const etablissementville = await getEtablissementVille(id);
    res.send(etablissementville);
});
//afficher etablissement selon son type
etablissementRouter.get("/etablissement/:type", async (req, res) => {
    const type = req.params.type;
    const etablissementtype = await getEtablissementType(type);
    res.send(etablissementtype);
});

//ajout dun etablissement
etablissementRouter.post("/Etablissement", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating } = req.body;
    const etablissement = await createEtablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating);
    res.status(201).send(etablissement);
});

//modifier un etablissement
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

//supprimer un etablissement
etablissementRouter.delete("/Etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteEtablissement(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

//aafficher image 1
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

//afficher image2
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

//afficher image3
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

// Routes pour modifier une  image
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

//modifier image2
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

//modifier image3
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

// Routes pour supprimer image
etablissementRouter.delete("/deleteImage1/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage1(id);
    if (deleted) {
        res.send('Image 1 deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

//supprimer image2
etablissementRouter.delete("/deleteImage2/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage2(id);
    if (deleted) {
        res.send('Image 2 deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

//supprimer image3
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
