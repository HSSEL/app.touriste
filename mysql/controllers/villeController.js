import { pool } from "../databases.js";

// Get all villes
export async function getVilles() {
    const [rows] = await pool.query("SELECT * FROM ville");
    return rows;
}

// Get a single ville by ID
export async function getVille(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM ville 
        WHERE id_ville = ?
    `, [id]);
    return rows[0];
}

// Create a new ville
export async function createVille(Nom, Description, Quartiers, image) {
    const [result] = await pool.query(`
            INSERT INTO ville(Nom, Description, Quartiers, image)
            VALUES(?, ?, ?, ?)
    `, [Nom, Description, Quartiers, image]);
    return result.insertId;
}

// Update an existing ville
export async function updateVille(id_ville, Nom, Description, Quartiers, image) {
    const [result] = await pool.query(`
        UPDATE ville
        SET Nom = ?, Description = ?, Quartiers = ?, image = ?
        WHERE id_ville = ?
    `, [Nom, Description, Quartiers, image, id_ville]);
    return result.affectedRows;
}

// Delete a ville
export async function deleteVille(id_ville) {
    const [result] = await pool.query(`
        DELETE FROM ville
        WHERE id_ville = ?
    `, [id_ville]);
    return result.affectedRows;
}

// Get the image of a ville by ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM ville WHERE id_ville = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Assuming 'image' is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE ville
        SET image=?
        WHERE id_ville=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE ville
        SET image=NULL
        WHERE id_ville=?
    `, [id]);
    return result.affectedRows;
}
