import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les établissements
export async function getEtablissements() {
    const [row] = await pool.query("SELECT * FROM etablissement");
    return row; // Retourner toutes les lignes récupérées
}

// Récupérer les établissements par ID de la ville
export async function getEtablissementVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM etablissement 
        WHERE id_ville = ?
    `, [id]);
    return row[0]; // Retourner la première ligne correspondant à cet ID de ville
}

// Récupérer un seul établissement par ID
export async function getEtablissement(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM etablissement 
        WHERE etablissement_id = ?
    `, [id]);
    return row[0]; // Retourner la première ligne correspondant à cet ID d'établissement
}

// Récupérer les établissements par type
export async function getEtablissementType(type) {
    const [row] = await pool.query(`
        SELECT * 
        FROM etablissement 
        WHERE type = ?
    `, [type]);
    return row[0]; // Retourner la première ligne correspondant à ce type d'établissement
}

// Créer un nouvel établissement
export async function createEtablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating) {
    const [result] = await pool.query(`
        INSERT INTO etablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating]);
    return result.insertId; // Retourner l'ID du nouvel établissement inséré
}

// Mettre à jour un établissement existant
export async function updateEtablissement(id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET id_ville = ?, type = ?, nom = ?, description = ?, adresse = ?, telephone = ?, Email = ?, horaires_ouverture = ?, site_web = ?, services_offerts = ?, reseau_sociaux = ?, latitude = ?, longitude = ?, rating = ?
        WHERE etablissement_id = ?
    `, [id_ville, type, nom, description, adresse, telephone, Email, horaires_ouverture, site_web, services_offerts, reseau_sociaux, latitude, longitude, rating]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer un établissement
export async function deleteEtablissement(etablissement_id) {
    const [result] = await pool.query(`
        DELETE FROM etablissement
        WHERE etablissement_id = ?
    `, [etablissement_id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Récupérer la première image d'un établissement par ID
export async function getImage1(id) {
    const [row] = await pool.query("SELECT image FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Retourner l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image trouvée
    }
}

// Récupérer la deuxième image d'un établissement par ID
export async function getImage2(id) {
    const [row] = await pool.query("SELECT image2 FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image2; // Retourner l'image2 si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image2 trouvée
    }
}

// Récupérer la troisième image d'un établissement par ID
export async function getImage3(id) {
    const [row] = await pool.query("SELECT image3 FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image3; // Retourner l'image3 si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image3 trouvée
    }
}

// Mettre à jour la première image d'un établissement
export async function updateImage1(id, image) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image = ?
        WHERE etablissement_id = ?
    `, [image, id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour la deuxième image d'un établissement
export async function updateImage2(id, image2) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image2 = ?
        WHERE etablissement_id = ?
    `, [image2, id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Mettre à jour la troisième image d'un établissement
export async function updateImage3(id, image3) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image3 = ?
        WHERE etablissement_id = ?
    `, [image3, id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer la première image d'un établissement
export async function deleteImage1(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer la deuxième image d'un établissement
export async function deleteImage2(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image2 = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}

// Supprimer la troisième image d'un établissement
export async function deleteImage3(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image3 = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows; // Retourner le nombre de lignes affectées
}
