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

export async function createCommentPaysage(id_touriste,Texte , Date, image, paysage_id) {
    const [result] = await pool.query(`
        INSERT INTO commentpaysage(id_touriste,Texte , Date, image, paysage_id)
        VALUES(?, ?, ?, ?, ?)
    `, [id_touriste,Texte , Date, image, paysage_id]);
    return result.insertId;
}

export async function updateCommentPaysage(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET Texte = ? AND image=?
        WHERE id_commentaire = ?
    `, [ id_commentaire, Texte, image]);
    return result.affectedRows;
}

export async function deleteCommentPaysage(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentpaysage
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}