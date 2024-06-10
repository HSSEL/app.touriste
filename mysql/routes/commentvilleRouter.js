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
    getCommentsVille,
    getCommentVille,
    createCommentVille,
    updateCommentVille,
    deleteCommentVille
} from '../controllers/commentvilleController.js';

const commentvilleRouter = express.Router();

// Route pour obtenir tous les commentaires des villes
commentvilleRouter.get('/commentsville', async (req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    try {
        const comments = await getCommentsVille();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'une ville par ID de ville
commentvilleRouter.get('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentVille(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour une ville
commentvilleRouter.post('/commentsville', async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { id_commentaire, id_ville, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentVille(id_commentaire, id_ville, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'une ville
commentvilleRouter.put('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentVille(id, Texte);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un commentaire d'une ville
commentvilleRouter.delete('/commentsville/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedId = await deleteCommentVille(id);
        res.status(200).json({ id: deletedId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

commentvilleRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

commentvilleRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

commentvilleRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});


export { commentvilleRouter }