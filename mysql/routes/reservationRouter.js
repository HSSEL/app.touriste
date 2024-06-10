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
import { getReservations, getReservation, makeReservation, updateReservation, deleteReservation, getImage } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

// Route pour récupérer toutes les réservations
reservationRouter.get("/Reservations", async (_req, res) => {
    /*async gere les operations asynchrones cad celle qui appelle une bdd et envoit une promesse
        req et res :gérer les informations de la requête entrante et envoyer des réponses au client
        get:gérer les requêtes HTTP GET.
        Cela signifie que cette route répondra aux requêtes GET envoyées à l'URL spécifiée
        _req : L'objet de la requête contient des informations sur la requête HTTP entrante, 
        mais ici il n'est pas utilisé, d'où le préfixe _ pour indiquer qu'il est ignoré.
    */
    try {
        const reservations = await getReservations();
        res.send(reservations);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route pour récupérer une réservation par ID
reservationRouter.get("/Reservation/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const reservation = await getReservation(id);
        if (reservation) {
            res.send(reservation);
        } else {
            res.status(404).send("Reservation not found");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route pour créer une nouvelle réservation
reservationRouter.post("/Reservation", async (req, res) => {
    //méthode post pour gérer les requêtes HTTP POST
    //post: Reçoit des données du client, les insère dans la base de données,
    // et renvoie l'ID de la nouvelle ressource créée.
    try {
        const { id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne } = req.body;
        const reservationId = await makeReservation(id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne);
        res.status(201).send({ id: reservationId });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route pour mettre à jour une réservation par ID
reservationRouter.put("/Reservation/:id", async (req, res) => {
    const id_reservation = req.params.id;
    try {
        const { id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne } = req.body;
        const updated = await updateReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne);
        if (updated) {
            res.send('Updated successfully');
        } else {
            res.status(404).send('Reservation not found');
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// Route pour récupérer l'image d'une réservation par ID
reservationRouter.get("/reservationImage/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const image = await getImage(id);
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(image, 'binary');
    } catch (error) {
        res.status(404).send("Image not found");
    }
});

// Route pour supprimer une réservation par ID
reservationRouter.delete("/Reservation/:id", async (req, res) => {
    const id_reservation = req.params.id;
    try {
        const deleted = await deleteReservation(id_reservation);
        if (deleted) {
            res.send('Deleted successfully');
        } else {
            res.status(404).send('Reservation not found');
        }
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

export { reservationRouter };
