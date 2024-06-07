import { pool } from "../databases.js";

// Get all comments for transport
export async function getCommentsTransport() {
    const [rows] = await pool.query("SELECT * FROM commenttransport");
    return rows;
}

// Get a single comment for transport by ID
export async function getCommentTransport(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commenttransport
        WHERE transport_id = ?
    `, [id]);
    return rows[0];
}

// Create a new comment for transport
export async function createCommentTransport(transport_id, id_touriste, Texte, Date, image) {
    const [result] = await pool.query(`
        INSERT INTO commenttransport(transport_id, id_touriste, Texte, Date, image)
        VALUES(?, ?, ?, ?, ?)
    `, [transport_id, id_touriste, Texte, Date, image]);
    return result.insertId;
}

// Update an existing comment for transport
export async function updateCommentTransport(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment for transport
export async function deleteCommentTransport(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commenttransport
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment for transport by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commenttransport WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment for transport by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment for transport
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
