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
import { getOffres, getOffre } from '../controllers/offreController.js';

const offreRouter = express.Router();

// Route pour obtenir toutes les offres
offreRouter.get('/offres', async (req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    try {
        const offres = await getOffres();
        res.status(200).json(offres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour obtenir une offre par ID
offreRouter.get('/offres/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const offre = await getOffre(id);
        if (offre) {
            res.status(200).json(offre);
        } else {
            res.status(404).json({ message: 'Offre not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {offreRouter}