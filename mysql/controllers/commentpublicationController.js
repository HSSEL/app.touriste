import { pool } from "../databases.js";

export async function getCommentsPublication() {
    const [rows] = await pool.query("SELECT * FROM commentpublication");
    return rows;
}

export async function getCommentPublication(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpublication 
        WHERE id_publication = ?
    `, [id]);
    return rows[0];
}

export async function createCommentPublication(id_commentaire, id_publication, id_touriste, Texte, Date) {
    const [result] = await pool.query(`
        INSERT INTO commentpublication(id_commentaire, id_publication, id_touriste, Texte, Date)
        VALUES(?, ?, ?, ?, ?)
    `, [id_commentaire, id_publication, id_touriste, Texte, Date]);
    return result.insertId;
}

export async function updateCommentPublication(id_commentaire, Texte) {
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET Texte = ?
        WHERE id_commentaire = ?
    `, [Texte, id_commentaire]);
    return result.affectedRows;
}

export async function deleteCommentPublication(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentpublication
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}