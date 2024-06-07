import { pool } from "../databases.js";

export async function getCommentsSante() {
    const [row] = await pool.query("SELECT * FROM commentsante");
    return row;
}

export async function getCommentSante(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM commentsante 
        WHERE sante_id = ?
    `, [id]);
    return row[0];
}

export async function createCommentSante( sante_id, id_touriste, Texte, Date,image) {
    const [result] = await pool.query(`
        INSERT INTO commentsante(sante_id, id_touriste, Texte, Date,image)
        VALUES(?, ?, ?, ?, ?)
    `, [sante_id, id_touriste, Texte, Date,image]);
    return result.insertId;
}

export async function updateCommentSante(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentsante
        SET Texte = ? AND image=?
        WHERE id_commentaire = ?
    `, [id_commentaire, Texte, image]);
    return result.affectedRows;
}

export async function deleteCommentSante(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentsante
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}