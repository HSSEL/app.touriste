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

// Get the image of a comment for ville by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentville WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for ville by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentville
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for ville
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentville
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}