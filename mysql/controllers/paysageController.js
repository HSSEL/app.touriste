import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les paysages
export async function getPaysages() {
    const [row] = await pool.query("SELECT * FROM paysage");
    return row; // Retourne toutes les lignes récupérées de la table 'paysage'
}

// Récupérer les paysages spécifiques à une ville par ID de ville
export async function getPaysageVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM paysage 
        WHERE ville_id = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de ville
}

// Récupérer un paysage spécifique par ID
export async function getPaysage(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM paysage 
        WHERE paysage_id = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de paysage
}

// Créer un nouveau paysage
export async function createPaysage(ville_id, nom, description, localisation, horarire_ouverture, image) {
    const [result] = await pool.query(`
        INSERT INTO paysage(ville_id, nom, description, localisation, horarire_ouverture, image)
        VALUES(?,?,?,?,?,?)
    `, [ville_id, nom, description, localisation, horarire_ouverture, image]);
    return result.insertId; // Retourne l'ID du nouveau paysage inséré
}

// Mettre à jour un paysage existant
export async function updatePaysage(paysage_id, ville_id, nom, description, localisation, horarire_ouverture, image) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET ville_id=?, nom=?, description=?, localisation=?, horarire_ouverture=?, image=?
        WHERE paysage_id=?
    `, [ville_id, nom, description, localisation, horarire_ouverture, image, paysage_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer un paysage par ID
export async function deletePaysage(paysage_id) {
    const [result] = await pool.query(`
        DELETE FROM paysage
        WHERE paysage_id=?
    `, [paysage_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image d'un paysage par ID
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM paysage WHERE paysage_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Suppose que 'image' est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}

// Mettre à jour l'image d'un paysage
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET image=?
        WHERE paysage_id=?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer l'image d'un paysage
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET image=NULL
        WHERE paysage_id=?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}
