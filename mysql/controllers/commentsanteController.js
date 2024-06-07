import { pool } from "../databases.js";

// Get all comments for sante
export async function getCommentsSante() {
    const [rows] = await pool.query("SELECT * FROM commentsante");
    return rows;
}

// Get a single comment for sante by ID
export async function getCommentSante(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentsante 
        WHERE sante_id = ?
    `, [id]);
    return rows[0];
}

// Create a new comment for sante
export async function createCommentSante(sante_id, id_touriste, Texte, Date, image) {
    const [result] = await pool.query(`
        INSERT INTO commentsante (sante_id, id_touriste, Texte, Date, image)
        VALUES (?, ?, ?, ?, ?)
    `, [sante_id, id_touriste, Texte, Date, image]);
    return result.insertId;
}

// Update an existing comment for sante
export async function updateCommentSante(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentsante
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment for sante
export async function deleteCommentSante(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentsante
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment for sante by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentsante WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for sante by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentsante
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for sante
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentsante
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
