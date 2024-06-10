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

import { getPublications, getPublication, createPublication, updatePublication, deletePublication,getImage,updateCoeur} from '../controllers/publicationController.js'

const publicationRouter = express.Router();


//route pour afficher tous les publications
publicationRouter.get("/Publications", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    const publications = await getPublications();
    res.send(publications);
});

//router pour afficher une seule publication
publicationRouter.get("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const publication = await getPublication(id);
    res.send(publication);
});

//router pour ajouter une publication
publicationRouter.post("/Publication", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    const { objet, text, image, type, date, etablissement_id } = req.body;
    const publication = await createPublication(objet, text, image, type, date, etablissement_id);
    res.status(201).send(publication);
});


//router pour modifier une publication
publicationRouter.put("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const { objet, text, image, type, date, etablissement_id } = req.body;
    const updated = await updatePublication(id, objet, text, image, type, date, etablissement_id);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});


//router pour supprimer une publication
publicationRouter.delete("/Publication/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await deletePublication(id);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

//router pour afficher limage dune publication
publicationRouter.get("/PublicationImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

/* 
publicationRouter.put('/publication/:id/coeur', async (req, res) => {
    const { id } = req.params;
    const { coeur } = req.body;

    try {
        const result = await updateCoeur(id, coeur);
        res.status(200).json({ message: 'Number of hearts updated successfully', updatedId: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */

//router pour modifier la valeur de coeur dans la bdd qui est boolean
publicationRouter.put('/publication/:id/coeur', async (req, res) => {
    const { id } = req.params;
    const { coeur } = req.body;

    try {
        const result = await updateCoeur(id, coeur);
        res.status(200).json({ message: 'Number of hearts updated successfully', updatedId: id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export { publicationRouter };
