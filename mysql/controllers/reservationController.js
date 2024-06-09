import { pool } from "../databases.js";

// Récupérer toutes les réservations
export async function getReservations() {
    const [rows] = await pool.query("SELECT * FROM reservation");
    return rows; // Retourne toutes les lignes récupérées de la table 'reservation'
}

// Récupérer une réservation spécifique par ID
export async function getReservation(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM reservation 
        WHERE id_reservation = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de réservation
}

// Créer une nouvelle réservation
export async function makeReservation(id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne) {
    const [result] = await pool.query(`
        INSERT INTO reservation (id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne]);
    return result.insertId; // Retourne l'ID de la nouvelle réservation insérée
}

// Mettre à jour une réservation existante
export async function updateReservation(id_reservation, id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne) {
    const [result] = await pool.query(`
        UPDATE reservation
        SET id_touriste=?, etablissement_id=?, dateReservation=?, debut_temp=?, fin_temp=?, nombrePersonne=?
        WHERE id_reservation = ?
    `, [id_touriste, etablissement_id, dateReservation, debut_temp, fin_temp, nombrePersonne, id_reservation]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer une réservation par ID
export async function deleteReservation(id_reservation) {
    const [result] = await pool.query(`
        DELETE FROM reservation
        WHERE id_reservation = ?
    `, [id_reservation]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image d'une réservation par ID (si applicable)
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM reservation WHERE id_reservation = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Suppose que 'image' est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}
