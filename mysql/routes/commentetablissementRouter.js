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
    getCommentsEtablissement, getComment, getCommentEtablissement,
    createCommentEtablissement, updateCommentEtablissement, deleteCommentEtablissement,
    getImage, deleteImage, updateImage
} from '../controllers/commentetablissementController.js';

const commentEtablissementRouter = express.Router();

commentEtablissementRouter.get("/comments", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const comments = await getCommentsEtablissement();
    res.send(comments);
});
//router pour afficher tous les commentaires
commentEtablissementRouter.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await getComment(id);
    res.send(comment);
});
//router pour afficher un commentaire selon son id
commentEtablissementRouter.get("/comments/etablissement/:id", async (req, res) => {
    const id = req.params.id;
    const comments = await getCommentEtablissement(id);
    res.send(comments);
});

//router pour creer un commentaire
commentEtablissementRouter.post("/comment", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { etablissement_id, id_touriste, Texte, Date, image } = req.body;
    const comment = await createCommentEtablissement(etablissement_id, id_touriste, Texte, Date, image);
    res.status(201).send({ id: comment });
});

//router pour modifier un commentaire en incluant au niveau du chemin de l'URL le paramètre dynamique :id
commentEtablissementRouter.put("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const { Texte, image } = req.body;
    const updated = await updateCommentEtablissement(id, Texte, image);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});

//router pour supprimer un commentaire
commentEtablissementRouter.delete("/comment/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteCommentEtablissement(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

//router pour afficher une image d'un commentaire 
commentEtablissementRouter.get("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'}); 
        res.end(image, 'binary'); //res.end(image, 'binary');
                                //image est le contenu binaire de l'image récupérée de la base de données
       
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

//router pour supprimer l'image dun commentaire
commentEtablissementRouter.delete("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteImage(id);
    if (deleted) {
        res.send('Image deleted successfully');
    } else {
        res.send('Unsuccessful image delete');
    }
});

//router pour modifier limage dun commentaire
commentEtablissementRouter.put("/commentImage/:id", async (req, res) => {
    const id = req.params.id;
    const { image } = req.body;
    const updated = await updateImage(id, image);
    if (updated) {
        res.send('Image updated successfully');
    } else {
        res.send('Unsuccessful image update');
    }
});

export { commentEtablissementRouter };
