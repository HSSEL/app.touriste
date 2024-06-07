import { pool } from "../databases.js";

// Get all comments
export async function getCommentsEtablissement() {
    const [rows] = await pool.query("SELECT * FROM commentetablissement");
    return rows;
}

// Get a single comment by ID
export async function getComment(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentetablissement 
        WHERE id_commentaire = ?
    `, [id]);
    return rows[0];
}

// Get comments by etablissement ID
export async function getCommentEtablissement(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentetablissement 
        WHERE etablissement_id = ?
    `, [id]);
    return rows;
}

// Create a new comment
export async function createCommentEtablissement(etablissement_id, id_touriste, Texte, Date, image) {
    const [result] = await pool.query(`
        INSERT INTO commentetablissement (etablissement_id, id_touriste, Texte, Date, image)
        VALUES (?, ?, ?, ?, ?)
    `, [etablissement_id, id_touriste, Texte, Date, image]);
    return result.insertId;
}

// Update an existing comment
export async function updateCommentEtablissement(id_commentaire, Texte, image) {
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows;
}

// Delete a comment
export async function deleteCommentEtablissement(id_commentaire) {
    const [result] = await pool.query(`
        DELETE FROM commentetablissement
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Get the image of a comment by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM commentetablissement WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Delete the image of a comment by ID
export async function deleteImage(id_commentaire) {
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows;
}

// Update the image of a comment
export async function updateImage(id_commentaire, image) {
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows;
}
