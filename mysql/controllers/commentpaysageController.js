import { pool } from "../databases.js";

// Get all comments for paysages
export async function getCommentsPaysage() {
    const [rows] = await pool.query("SELECT * FROM commentpaysage");
    return rows;
}

// Get a single comment for a paysage by ID
export async function getCommentPaysage(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpaysage 
        WHERE paysage_id = ?
    `, [id]);
    return rows[0];
}

// Create a new comment for a paysage
export async function createCommentPaysage(id_touriste, Texte, Date, image, paysage_id) {
    const [result] = await pool.query(`
        INSERT INTO commentpaysage (id_touriste, Texte, Date, image, paysage_id)
        VALUES (?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, paysage_id]);
    return result.insertId;
}

// Update an existing comment for a paysage
export async function updateCommentPaysage(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment for a paysage
export async function deleteCommentPaysage(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentpaysage
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment for a paysage by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentpaysage WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for a paysage by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for a paysage
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
