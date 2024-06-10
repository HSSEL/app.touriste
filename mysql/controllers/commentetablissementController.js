import { pool } from "../databases.js"; //Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les commentaires
export async function getCommentsEtablissement() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires
    const [rows] = await pool.query("SELECT * FROM commentetablissement");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire par ID
export async function getComment(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentetablissement 
        WHERE id_commentaire = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Récupérer les commentaires par ID de l'établissement
export async function getCommentEtablissement(id) {
    // Exécuter une requête SQL pour sélectionner les commentaires d'un établissement spécifique
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentetablissement 
        WHERE etablissement_id = ?
    `, [id]);
    return rows; // Retourner les lignes récupérées
}

// Créer un nouveau commentaire
export async function createCommentEtablissement(etablissement_id, id_touriste, Texte, Date, image) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire
    const [result] = await pool.query(`
        INSERT INTO commentetablissement (etablissement_id, id_touriste, Texte, Date, image)
        VALUES (?, ?, ?, ?, ?)
    `, [etablissement_id, id_touriste, Texte, Date, image]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant
export async function updateCommentEtablissement(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire
export async function deleteCommentEtablissement(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire
    const [result] = await pool.query(`
        DELETE FROM commentetablissement
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire par son ID
    const [rows] = await pool.query("SELECT image FROM commentetablissement WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire
    const [result] = await pool.query(`
        UPDATE commentetablissement
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
