import { pool } from "../databases.js";

// Fonction pour récupérer toutes les villes
export async function getVilles() {
    const [rows] = await pool.query("SELECT * FROM ville");
    return rows;
}

// Fonction pour récupérer une seule ville par son ID
export async function getVille(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM ville 
        WHERE id_ville = ?
    `, [id]);
    return rows[0];
}

// Fonction pour créer une nouvelle ville
export async function createVille(Nom, Description, Quartiers, image) {
    const [result] = await pool.query(`
            INSERT INTO ville(Nom, Description, Quartiers, image)
            VALUES(?, ?, ?, ?)
    `, [Nom, Description, Quartiers, image]);
    return result.insertId;
}

// Fonction pour mettre à jour une ville existante
export async function updateVille(id_ville, Nom, Description, Quartiers, image) {
    const [result] = await pool.query(`
        UPDATE ville
        SET Nom = ?, Description = ?, Quartiers = ?, image = ?
        WHERE id_ville = ?
    `, [Nom, Description, Quartiers, image, id_ville]);
    return result.affectedRows;
}

// Fonction pour supprimer une ville
export async function deleteVille(id_ville) {
    const [result] = await pool.query(`
        DELETE FROM ville
        WHERE id_ville = ?
    `, [id_ville]);
    return result.affectedRows;
}

// Fonction pour récupérer l'image d'une ville par son ID
export async function getImage(id) {
    const [rows] = await pool.query("SELECT image FROM ville WHERE id_ville = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // En supposant que 'image' est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image non trouvée");
    }
}

// Fonction pour mettre à jour une image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE ville
        SET image=?
        WHERE id_ville=?
    `, [image, id]);
    return result.affectedRows;
}

// Fonction pour supprimer une image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE ville
        SET image=NULL
        WHERE id_ville=?
    `, [id]);
    return result.affectedRows;
}
