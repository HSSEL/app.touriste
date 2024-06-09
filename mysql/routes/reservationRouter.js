import express from 'express';
import { getReservations, getReservation, makeReservation, updateReservation, deleteReservation, getImage } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

reservationRouter.get("/Reservations", async (_req, res) => {
    try {
        const reservations = await getReservations();
        res.send(reservations);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

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

reservationRouter.post("/Reservation", async (req, res) => {
    try {
        const { id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne } = req.body;
        const reservationId = await makeReservation(id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne);
        res.status(201).send({ id: reservationId });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

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
