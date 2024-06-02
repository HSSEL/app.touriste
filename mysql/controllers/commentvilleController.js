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

export async function createCommentVille(id_commentaire, id_ville, id_touriste, Texte, Date) {
    const [result] = await pool.query(`
        INSERT INTO commentville(id_commentaire, id_ville, id_touriste, Texte, Date)
        VALUES(?, ?, ?, ?, ?)
    `, [id_commentaire, id_ville, id_touriste, Texte, Date]);
    return result.insertId;
}

export async function updateCommentVille(id_commentaire, Texte) {
    const [result] = await pool.query(`
        UPDATE commentville
        SET Texte = ?
        WHERE id_commentaire = ?
    `, [Texte, id_commentaire]);
    return result.affectedRows;
}

export async function deleteCommentVille(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentville
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}