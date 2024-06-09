import { pool } from "../databases.js";

// Récupérer tous les commentaires pour les paysages
export async function getCommentsPaysage() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires des paysages
    const [rows] = await pool.query("SELECT * FROM commentpaysage");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour un paysage par ID
export async function getCommentPaysage(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire d'un paysage par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpaysage 
        WHERE paysage_id = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour un paysage
export async function createCommentPaysage(id_touriste, Texte, Date, image, paysage_id) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour un paysage
    const [result] = await pool.query(`
        INSERT INTO commentpaysage (id_touriste, Texte, Date, image, paysage_id)
        VALUES (?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, paysage_id]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour un paysage
export async function updateCommentPaysage(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour un paysage
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour un paysage
export async function deleteCommentPaysage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour un paysage
    const [result] = await pool.query(`
        DELETE FROM commentpaysage
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour un paysage par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour un paysage par son ID
    const [rows] = await pool.query("SELECT image FROM commentpaysage WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour un paysage par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour un paysage
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour un paysage
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour un paysage
    const [result] = await pool.query(`
        UPDATE commentpaysage
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
