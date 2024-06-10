/**
 * Au niveau des fichiers du dossier routes nous definissons des routes pour gerer des operations 
 * mentionnees au niveau des controllers
 * cela permet de diviser notre application en modules logiques et de mieux organiser notre code
*/

import express from 'express';

import {
    getVilles, getVille, createVille, updateVille, deleteVille,
    getImage, updateImage, deleteImage
} from '../controllers/villeController.js';

const villeRouter = express.Router();//villeRouter:instance d'un routeur Express

villeRouter.get("/villes", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const villes = await getVilles();
    res.send(villes);
});

villeRouter.get("/ville/:id", async (req, res) => {
    const id = req.params.id;
    const ville = await getVille(id);
    res.send(ville);
});

villeRouter.post("/ville", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { Nom, Description, Quartiers, image } = req.body;
    //req.body : Contient les données envoyées par le client dans le corps de la requête.
    const ville = await createVille(Nom, Description, Quartiers, image);
    res.status(201).send(ville);//Envoie une réponse HTTP avec le statut 201 (Created)
    // et les détails de la nouvelle ville créée.
});

villeRouter.put("/ville/:id", async (req, res) => {
    //Utilise la méthode put pour gérer les requêtes HTTP PUT
    const id = req.params.id;//Extrait le paramètre id de l'URL
    const { Nom, Description, Quartiers, image } = req.body;
    //req.body : Contient les données envoyées par le client dans le corps de la requête.
    const updated = await updateVille(id, Nom, Description, Quartiers, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

villeRouter.delete("/ville/:id", async (req, res) => {
    //Utilise la méthode delete pour gérer les requêtes HTTP DELETE
    //le chemin de l'URL inclut un paramètre dynamique :id
    const id = req.params.id;//Extrait le paramètre id de l'URL
    const deleted = await deleteVille(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

villeRouter.get("/villeImage/:id", async (req, res) => {
    const id = req.params.id;//Extrait le paramètre id de l'URL
    //try...catch pour gérer les exceptions éventuelles lors de la récupération de l'image
    try {
        const image = await getImage(id);

        //Utilise res.writeHead et res.end 
        //pour envoyer correctement des données binaires (comme des images) au client
        res.writeHead(200, { 'Content-Type': 'image/png' });
        //Utilise writeHead pour écrire les en-têtes de la réponse HTTP
        //Le code de statut 200 indique que la requête a réussi
        //Content-Type indique ici que le contenu de la reponse est une image png

        res.end(image, 'binary');
        //image est le contenu binaire de l'image récupérée de la base de données
    } catch (error) {
        res.status(404).send("Image not found");
        //La réponse est envoyée avec un code de statut 404 (Not Found) et le message "Image not found
    }
});

// Route to update an image
villeRouter.put("/updateImage/:id", async (req, res) => {
    //put: Reçoit des données du client, met à jour une 
    //ressource existante dans la base de données, et renvoie le statut de la mise à jour
    const id = req.params.id;//Extrait le paramètre id de l'URL
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
    const id = req.params.id;//Extrait le paramètre id de l'URL
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

export { villeRouter };




//est un outil de développement qui surveille les modifications dans les fichiers de notre application Node.js
// et redémarre automatiquement le serveur lorsque des changements sont détectés
//start egalement pour redemarrer le serveur de developpement
