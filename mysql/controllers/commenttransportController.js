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

export async function createCommentTransport(id_commentaire, transport_id, id_touriste, Texte, Date) {
    const [result] = await pool.query(`
        INSERT INTO commenttransport(id_commentaire, transport_id, id_touriste, Texte, Date)
        VALUES(?, ?, ?, ?, ?)
    `, [id_commentaire, transport_id, id_touriste, Texte, Date]);
    return result.insertId;
}

export async function updateCommentTransport(id_commentaire, Texte) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET Texte = ?
        WHERE id_commentaire = ?
    `, [Texte, id_commentaire]);
    return result.affectedRows;
}

export async function deleteCommentTransport(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commenttransport
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}