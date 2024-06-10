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
    getCommentsTransport,
    getCommentTransport,
    createCommentTransport,
    updateCommentTransport,
    deleteCommentTransport
} from '../controllers/commenttransportController.js';

const commenttransportRouter = express.Router();

// Route pour obtenir tous les commentaires des transports
commenttransportRouter.get('/commentstransport', async (req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    try {
        const comments = await getCommentsTransport();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir un commentaire d'un transport par ID de transport
commenttransportRouter.get('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await getCommentTransport(id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer un nouveau commentaire pour un transport
commenttransportRouter.post('/commentstransport', async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { id_commentaire, transport_id, id_touriste, Texte, Date } = req.body;
    try {
        const insertId = await createCommentTransport(id_commentaire, transport_id, id_touriste, Texte, Date);
        res.status(201).json({ id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour mettre à jour un commentaire d'un transport
commenttransportRouter.put('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    const { Texte } = req.body;
    try {
        const updatedRows = await updateCommentTransport(id, Texte);
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get the image of a comment for transport by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commenttransport WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for transport by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for transport
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}

// Route pour supprimer un commentaire d'un transport
commenttransportRouter.delete('/commentstransport/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await deleteCommentTransport(id);
        if (deletedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

    export { commenttransportRouter }