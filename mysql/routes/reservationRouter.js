import express from 'express'

import { getReservations, getReservation, makeReservation, updateReservation, deleteReservation} from '../controllers/publicationController'

const reservationRouter=express.Router()


reservationRouter.get("/Reservations",async (_req,res)=>{
    const reservations=await getReservations()
    res.send(reservations)
})

publicationRouter.get("/Publication:id",async (req,res)=>{
    const id= req.params.id
    const publication=await getPublication(id)
    res.send(publication)
})

reservationRouter.post("/Reservation:",async (req,res)=>{
    const {id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le} =req.body
    const reservation=await createPublication(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le)
    res.status(201).send(reservation)
})


reservationRouter.put("/Reservation/:id", async (req, res) => {
    const id_reservation = req.params.id;
    const {id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le} = req.body;
    const updated = await updateReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
    }
});






reservationRouter.delete("/Reservation/:id", async (req, res) => {
    const id_reservation = req.params.id;
    const deleted = await deleteReservation(id_reservation);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {reservationRouter}



