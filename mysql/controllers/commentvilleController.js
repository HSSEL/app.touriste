import { pool } from "../databases.js";

// Récupérer tous les commentaires pour la ville
export async function getCommentsVille() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires de ville
    const [row] = await pool.query("SELECT * FROM commentville");
    return row; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour la ville par ID
export async function getCommentVille(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire de ville par son ID
    const [row] = await pool.query(`
        SELECT * 
        FROM commentville 
        WHERE id_ville = ?
    `, [id]);
    return row[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour la ville
export async function createCommentVille(id_ville, id_touriste, Texte, Date, image) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour la ville
    const [result] = await pool.query(`
        INSERT INTO commentville(id_ville, id_touriste, Texte, Date, image)
        VALUES(?, ?, ?, ?, ?)
    `, [id_ville, id_touriste, Texte, Date, image]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour la ville
export async function updateCommentVille(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour la ville
    const [result] = await pool.query(`
        UPDATE commentville
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour la ville
export async function deleteCommentVille(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour la ville
    const [result] = await pool.query(`
        DELETE FROM commentville
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour la ville par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour la ville par son ID
    const [rows] = await pool.query("SELECT image FROM commentville WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour la ville par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour la ville
    const [result] = await pool.query(`
        UPDATE commentville
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour la ville
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour la ville
    const [result] = await pool.query(`
        UPDATE commentville
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
