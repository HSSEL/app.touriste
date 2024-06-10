import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer tous les monuments
export async function getMonuments() {
    const [row] = await pool.query("SELECT * FROM monument");
    return row; // Retourne toutes les lignes récupérées de la table 'monument'
}

// Récupérer les monuments par ID de la ville
export async function getMonumentVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM monument 
        WHERE id_ville = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de ville
}

// Récupérer un seul monument par ID
export async function getMonument(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM monument 
        WHERE monument_id = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de monument
}

// Créer un nouveau monument
export async function createMonument(id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image) {
    const [result] = await pool.query(`
        INSERT INTO monument(id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image]);
    return result.insertId; // Retourne l'ID du nouveau monument inséré
}

// Mettre à jour un monument existant
export async function updateMonument(monument_id, id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image) {
    const [result] = await pool.query(`
        UPDATE monument
        SET id_ville = ?,
            Nom = ?,
            description = ?,
            date_construction = ?,
            style = ?,
            hauteur = ?,
            commanditaire = ?,
            etat_conservation = ?,
            fonction_actuelle = ?,
            horaires_ouverture = ?,
            frais_entree = ?,
            accessibilite = ?,
            evenements_speciaux = ?,
            site_web = ?,
            Localisation = ?,
            image = ?
        WHERE monument_id = ?
    `, [id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image, monument_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées
}

// Supprimer un monument
export async function deleteMonument(monument_id) {
    const [result] = await pool.query(`
        DELETE FROM monument
        WHERE monument_id = ?
    `, [monument_id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées
}

// Récupérer l'image d'un monument par ID
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM monument WHERE monument_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Retourne l'image si trouvée
    } else {
        throw new Error("Image not found"); // Lancer une erreur si aucune image trouvée
    }
}

// Mettre à jour l'image d'un monument
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE monument
        SET image = ?
        WHERE monument_id = ?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées
}

// Supprimer l'image d'un monument
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE monument
        SET image = NULL
        WHERE monument_id = ?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées
}
