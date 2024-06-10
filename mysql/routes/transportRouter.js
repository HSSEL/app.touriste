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
    getTransports, getTransport, getTransportVille, createTransport, updateTransport, deleteTransport,
    getImage, updateImage, deleteImage
} from '../controllers/transportController.js';

const transportRouter = express.Router();

// Route pour récupérer tous les transports
transportRouter.get("/Transports", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
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
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
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
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
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
