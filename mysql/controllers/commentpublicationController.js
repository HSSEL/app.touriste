import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les commentaires pour les publications
export async function getCommentsPublication() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires des publications
    const [rows] = await pool.query("SELECT * FROM commentpublication");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour une publication par ID
export async function getCommentPublication(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire d'une publication par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentpublication 
        WHERE id_publication = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour une publication
export async function createCommentPublication(id_touriste, Texte, Date, image, id_publication) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour une publication
    const [result] = await pool.query(`
        INSERT INTO commentpublication(id_touriste, Texte, Date, image, id_publication)
        VALUES(?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, id_publication]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour une publication
export async function updateCommentPublication(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour une publication
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour une publication
export async function deleteCommentPublication(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour une publication
    const [result] = await pool.query(`
        DELETE FROM commentpublication
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour une publication par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour une publication par son ID
    const [rows] = await pool.query("SELECT image FROM commentpublication WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour une publication par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour une publication
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour une publication
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour une publication
    const [result] = await pool.query(`
        UPDATE commentpublication
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
