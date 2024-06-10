import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les commentaires pour les monuments
export async function getCommentsMonument() {
    // Exécuter une requête SQL pour sélectionner tous les commentaires des monuments
    const [rows] = await pool.query("SELECT * FROM commentmonument");
    return rows; // Retourner les lignes récupérées
}

// Récupérer un seul commentaire pour un monument par ID
export async function getCommentMonument(id) {
    // Exécuter une requête SQL pour sélectionner un commentaire d'un monument par son ID
    const [rows] = await pool.query(`
        SELECT * 
        FROM commentmonument 
        WHERE monument_id = ?
    `, [id]);
    return rows[0]; // Retourner la première ligne (commentaire correspondant)
}

// Créer un nouveau commentaire pour un monument
export async function createCommentMonument(id_touriste, Texte, Date, image, monument_id) {
    // Exécuter une requête SQL pour insérer un nouveau commentaire pour un monument
    const [result] = await pool.query(`
        INSERT INTO commentmonument (id_touriste, Texte, Date, image, monument_id)
        VALUES (?, ?, ?, ?, ?)
    `, [id_touriste, Texte, Date, image, monument_id]);
    return result.insertId; // Retourner l'ID du nouveau commentaire inséré
}

// Mettre à jour un commentaire existant pour un monument
export async function updateCommentMonument(id_commentaire, Texte, image) {
    // Exécuter une requête SQL pour mettre à jour un commentaire pour un monument
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET Texte = ?, image = ?
        WHERE id_commentaire = ?
    `, [Texte, image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un commentaire pour un monument
export async function deleteCommentMonument(id_commentaire) {
    // Exécuter une requête SQL pour supprimer un commentaire pour un monument
    const [result] = await pool.query(`
        DELETE FROM commentmonument
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer l'image d'un commentaire pour un monument par ID
export async function getImage(id) {
    // Exécuter une requête SQL pour sélectionner l'image d'un commentaire pour un monument par son ID
    const [rows] = await pool.query("SELECT image FROM commentmonument WHERE id_commentaire = ?", [id]);
    if (rows.length > 0) {
        return rows[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image n'est trouvée
    }
}

// Supprimer l'image d'un commentaire pour un monument par ID
export async function deleteImage(id_commentaire) {
    // Exécuter une requête SQL pour supprimer l'image d'un commentaire pour un monument
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET image = NULL
        WHERE id_commentaire = ?
    `, [id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour l'image d'un commentaire pour un monument
export async function updateImage(id_commentaire, image) {
    // Exécuter une requête SQL pour mettre à jour l'image d'un commentaire pour un monument
    const [result] = await pool.query(`
        UPDATE commentmonument
        SET image = ?
        WHERE id_commentaire = ?
    `, [image, id_commentaire]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
