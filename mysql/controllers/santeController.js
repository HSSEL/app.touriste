import { pool } from "../databases.js";

// Récupérer toutes les entrées de la table 'sante'
export async function getSantes() {
    const [rows] = await pool.query("SELECT * FROM sante");
    return rows; // Retourne toutes les lignes récupérées de la table 'sante'
}

// Récupérer les entrées de la table 'sante' par ID de ville
export async function getSanteVille(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM sante 
        WHERE id_ville = ?
    `, [id]);
    return rows; // Retourne toutes les lignes correspondant à cet ID de ville
}

// Récupérer une entrée spécifique de la table 'sante' par son ID
export async function getSante(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM sante 
        WHERE sante_id = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de santé
}

// Créer une nouvelle entrée dans la table 'sante'
export async function createSante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email) {
    const [result] = await pool.query(`
        INSERT INTO sante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email)
        VALUES(?,?,?,?,?,?,?,?,?)
    `, [id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email]);
    return result.insertId; // Retourne l'ID de la nouvelle entrée insérée
}

// Mettre à jour une entrée existante dans la table 'sante'
export async function updateSante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email) {
    const [result] = await pool.query(`
        UPDATE sante
        SET id_ville=?, Type=?, Nom=?, Adresse=?, Téléphone=?, Horaires_ouverture=?, Activites=?, site_Web=?, Email=?
        WHERE sante_id=?
    `, [id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email, sante_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer une entrée de la table 'sante' par son ID
export async function deleteSante(sante_id) {
    const [result] = await pool.query(`
        DELETE FROM sante
        WHERE sante_id=?
    `, [sante_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image associée à une entrée de la table 'sante' par son ID
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM sante WHERE sante_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Retourne l'image si elle est trouvée
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}

// Mettre à jour l'image associée à une entrée de la table 'sante'
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE sante
        SET image=?
        WHERE sante_id=?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour de l'image
}

// Supprimer l'image associée à une entrée de la table 'sante'
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE sante
        SET image=NULL
        WHERE sante_id=?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression de l'image
}
