import { pool } from "../databases.js";

// Get all comments for monuments
export async function getCommentsMonument() {
    const [rows] = await pool.query("SELECT * FROM commentmonument");
    return rows;
}

// Get a single comment for a monument by ID
export async function getCommentMonument(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentmonument 
        WHERE monument_id = ?
    `, [id]);
    return rows[0];
}

// Create a new comment for a monument
export async function createCommentMonument(id_touriste, Texte, Date, image, monument_id) {
    const [result] = await pool.query(`
        INSERT INTO commentmonument (id_touriste, Texte, Date, image, monument_id)
        VALUES (?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, monument_id]);
    return result.insertId;
}

// Update an existing comment for a monument
export async function updateCommentMonument(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment for a monument
export async function deleteCommentMonument(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentmonument
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment for a monument by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentmonument WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for a monument by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for a monument
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
