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
    getCommentsPublication, getCommentPublication,
    createCommentPublication, updateCommentPublication, deleteCommentPublication,
    getImage, deleteImage, updateImage
} from '../controllers/commentpublicationController.js';

const commentPublicationRouter = express.Router();
//afficher tous les commentaires
commentPublicationRouter.get("/comments", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const comments = await getCommentsPublication();
    res.send(comments);
});
//afficher commentaire selon son id
commentPublicationRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getCommentPublication(id);
    res.send(comment);
});
//ajout
commentPublicationRouter.post("/comment", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { id_touriste, Texte, Date, image, id_publication } = req.body;
    const comment = await createCommentPublication(id_touriste, Texte, Date, image, id_publication);
    res.status(201).send({ id: comment });
});
//modifier
commentPublicationRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentPublication(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});
//supprimer
commentPublicationRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentPublication(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});
//afficher image
commentPublicationRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});
//supprimer image
commentPublicationRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});
//modifier image
commentPublicationRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentPublicationRouter };
