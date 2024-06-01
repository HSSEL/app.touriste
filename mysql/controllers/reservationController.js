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




export async function makeReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le){
    const [result]= await pool.query(`
            INSERT INTO reservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le)
            VALUES(?,?,?,?,?)
    `,[id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le])
    return result.insertId
}

export async function updateReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le){
    const [result]= await pool.query(`
        UPDATE reservation
        SET etablissement_id=?,dateReservation=? ,debut_temp=? ,fin_temp=? ,nombrePersonne=?, status=? ,creee_le=? ,modifie_le=?
        WHERE id_reservation = ?
    `,[id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, status, creee_le, modifie_le])
    return result.insertId
}

export async function deleteReservation(id_reservation){
    const [result]= await pool.query(`
        DELETE reservation
        WHERE id_reservation = ?
    `,[id_reservation])
    return result.insertId
}

export async function getImage1(id) {
    const [row] = await pool.query("SELECT image1 FROM reservation WHERE id_reservation = ?", [id]);
    if (row.length > 0) {
        return row[0].image1; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

export async function getImage2(id) {
    const [row] = await pool.query("SELECT image2 FROM reservation WHERE id_reservation = ?", [id]);
    if (row.length > 0) {
        return row[0].image2; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}


export async function getImage3(id) {
    const [row] = await pool.query("SELECT image3 FROM reservation WHERE id_reservation = ?", [id]);
    if (row.length > 0) {
        return row[0].image3; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}