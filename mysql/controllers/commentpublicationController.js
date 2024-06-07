import { pool } from "../databases.js";

// Get all comments for publication
export async function getCommentsPublication() {
    const [rows] = await pool.query("SELECT * FROM commentpublication");
    return rows;
}

// Get a single comment for publication by ID
export async function getCommentPublication(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpublication 
        WHERE id_publication = ?
    `, [id]);
    return rows[0];
}

// Create a new comment for publication
export async function createCommentPublication(id_touriste, Texte, Date, image, id_publication) {
    const [result] = await pool.query(`
        INSERT INTO commentpublication(id_touriste, Texte, Date, image, id_publication)
        VALUES(?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, id_publication]);
    return result.insertId;
}

// Update an existing comment for publication
export async function updateCommentPublication(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment for publication
export async function deleteCommentPublication(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentpublication
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment for publication by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentpublication WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for publication by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for publication
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
