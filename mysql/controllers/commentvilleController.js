import { pool } from "../databases.js";

export async function getCommentsVille() {
    const [row] = await pool.query("SELECT * FROM commentville");
    return row;
}

export async function getCommentVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM commentville 
        WHERE id_ville = ?
    `, [id]);
    return row[0];
}

export async function createCommentVille( id_ville, id_touriste, Texte, Date,image) {
    const [result] = await pool.query(`
        INSERT INTO commentville(id_ville, id_touriste, Texte, Date,image)
        VALUES(?, ?, ?, ?, ?)
    `, [id_ville, id_touriste, Texte, Date,image]);
    return result.insertId;
}

export async function updateCommentVille(id_commentaire, Texte,image) {
    const [result] = await pool.query(`
        UPDATE commentville
        SET Texte = ? AND image=?
        WHERE id_commentaire = ?
    `, [id_commentaire, Texte,image]);
    return result.affectedRows;
}

export async function deleteCommentVille(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentville
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}