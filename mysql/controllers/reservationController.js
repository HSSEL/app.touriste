import { pool } from "../databases.js"

export async function getReservations(){
    const [row]=await pool.query("SELECT * FROM reservation")
    return row
}

export async function getReservation(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM reservation 
    WHERE id_reservation = ?
    `,[id])
    return row[0]
}




export async function makeReservation( id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne){
    const [result]= await pool.query(`
            INSERT INTO reservation( id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne)
            VALUES(?,?,?,?,?,?)
    `,[id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne])
    return result.insertId
}

export async function updateReservation(id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne){
    const [result]= await pool.query(`
        UPDATE reservation
        SET etablissement_id=?,dateReservation=? ,debut_temp=? ,fin_temp=? ,nombrePersonne=?
        WHERE id_reservation = ?
    `,[id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne])
    return result.insertId
}

export async function deleteReservation(id_reservation){
    const [result]= await pool.query(`
        DELETE reservation
        WHERE id_reservation = ?
    `,[id_reservation])
    return result.insertId
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM reservation WHERE id_reservation = ?", [id]);
    if (row.length > 0) {
        return row[0].image1; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}
