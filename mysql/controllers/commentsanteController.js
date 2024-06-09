import { pool } from "../databases.js";

// Récupérer tous les commentaires pour la santé
export async function getCommentsSante() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires de santé
    const [rows] = await pool.query("SELECT * FROM commentsante");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour la santé par ID
export async function getCommentSante(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire de santé par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentsante 
        WHERE sante_id = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour la santé
export async function createCommentSante(sante_id, id_touriste, Texte, Date, image) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour la santé
    const [result] = await pool.query(`
        INSERT INTO commentsante (sante_id, id_touriste, Texte, Date, image)
        VALUES (?, ?, ?, ?, ?)
    `, [sante_id, id_touriste, Texte, Date, image]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour la santé
export async function updateCommentSante(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour la santé
    const [result] = await pool.query(`
        UPDATE commentsante
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour la santé
export async function deleteCommentSante(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour la santé
    const [result] = await pool.query(`
        DELETE FROM commentsante
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour la santé par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour la santé par son ID
    const [rows] = await pool.query("SELECT image FROM commentsante WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour la santé par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour la santé
    const [result] = await pool.query(`
        UPDATE commentsante
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour la santé
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour la santé
    const [result] = await pool.query(`
        UPDATE commentsante
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
