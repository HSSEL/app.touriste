import express from 'express'

import { getReservations, getReservation, makeReservation, updateReservation, deleteReservation,getImage} from '../controllers/reservationController.js'

const reservationRouter=express.Router()


reservationRouter.get("/Reservations",async (_req,res)=>{
    const reservations=await getReservations()
    res.send(reservations)
})

reservationRouter.get("/Reservation/:id",async (req,res)=>{
    const id= req.params.id
    const publication=await getReservation(id)
    res.send(publication)
})

reservationRouter.post("/Reservation:",async (req,res)=>{
    const {id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne} =req.body
    const reservation=await makeReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne)
    res.status(201).send(reservation)
})


reservationRouter.put("/Reservation/:id", async (req, res) => {
    const id_reservation = req.params.id;
    const {id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne} = req.body;
    const updated = await updateReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne);
    if (updated) {
        res.send('Updated successfully');
    } else {
        res.send('Unsuccessful update');
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
    const deleted = await deleteReservation(id_reservation);
    if (deleted) {
        res.send('Deleted successfully');
    } else {
        res.send('Unsuccessful delete');
    }
});

export {reservationRouter}



