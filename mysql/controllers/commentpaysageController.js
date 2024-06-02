import { pool } from "../databases.js";

export async function getCommentsPaysage() {
    const [rows] = await pool.query("SELECT * FROM commentpaysage");
    return rows;
}

export async function getCommentPaysage(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpaysage 
        WHERE paysage_id = ?
    `, [id]);
    return rows[0];
}

export async function createCommentPaysage(id_commentaire, paysage_id, id_touriste, Texte, Date) {
    const [result] = await pool.query(`
        INSERT INTO commentpaysage(id_commentaire, paysage_id, id_touriste, Texte, Date)
        VALUES(?, ?, ?, ?, ?)
    `, [id_commentaire, paysage_id, id_touriste, Texte, Date]);
    return result.insertId;
}

export async function updateCommentPaysage(id_commentaire, Texte) {
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET Texte = ?
        WHERE id_commentaire = ?
    `, [Texte, id_commentaire]);
    return result.affectedRows;
}

export async function deleteCommentPaysage(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentpaysage
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}