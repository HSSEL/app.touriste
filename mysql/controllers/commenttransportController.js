import { pool } from "../databases.js";

// Récupérer tous les commentaires pour le transport
export async function getCommentsTransport() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires de transport
    const [rows] = await pool.query("SELECT * FROM commenttransport");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour le transport par ID
export async function getCommentTransport(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire de transport par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commenttransport
        WHERE transport_id = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour le transport
export async function createCommentTransport(transport_id, id_touriste, Texte, Date, image) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour le transport
    const [result] = await pool.query(`
        INSERT INTO commenttransport(transport_id, id_touriste, Texte, Date, image)
        VALUES(?, ?, ?, ?, ?)
    `, [transport_id, id_touriste, Texte, Date, image]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour le transport
export async function updateCommentTransport(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour le transport
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour le transport
export async function deleteCommentTransport(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour le transport
    const [result] = await pool.query(`
        DELETE FROM commenttransport
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour le transport par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour le transport par son ID
    const [rows] = await pool.query("SELECT image FROM commenttransport WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour le transport par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour le transport
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour le transport
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour le transport
    const [result] = await pool.query(`
        UPDATE commenttransport
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
