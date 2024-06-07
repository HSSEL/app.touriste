import { pool } from "../databases.js";

export async function getCommentsTransport() {
    const [row] = await pool.query("SELECT * FROM commenttransport");
    return row;
}

export async function getCommentTransport(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM commenttransport
        WHERE transport_id = ?
    `, [id]);
    return row[0];
}

export async function createCommentTransport( transport_id, id_touriste, Texte, Date,image) {
    const [result] = await pool.query(`
        INSERT INTO commenttransport(transport_id, id_touriste, Texte, Date,image)
        VALUES(?, ?, ?, ?, ?)
    `, [transport_id, id_touriste, Texte, Date,image]);
    return result.insertId;
}

export async function updateCommentTransport(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET Texte = ? AND image=?
        WHERE id_commentaire = ?
    `, [id_commentaire, Texte, image]);
    return result.affectedRows;
}

export async function deleteCommentTransport(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commenttransport
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}