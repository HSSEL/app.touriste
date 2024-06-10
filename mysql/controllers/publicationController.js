import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer toutes les publications
export async function getPublications() {
    const [row] = await pool.query("SELECT * FROM publication");
    return row; // Retourne toutes les lignes récupérées de la table 'publication'
}

// Récupérer une publication spécifique par ID
export async function getPublication(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM publication 
        WHERE id_publication = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de publication
}

// Créer une nouvelle publication
export async function createPublication(objet, text, image, type, date, etablissement_id) {
    const [result] = await pool.query(`
        INSERT INTO publication(objet, text, image, type, date, etablissement_id)
        VALUES(?,?,?,?,?,?)
    `, [objet, text, image, type, date, etablissement_id]);
    return result.insertId; // Retourne l'ID de la nouvelle publication insérée
}

// Mettre à jour une publication existante
export async function updatePublication(id_publication, objet, text, image, type, date, etablissement_id) {
    const [result] = await pool.query(`
        UPDATE publication
        SET objet=?, text=?, image=?, type=?, date=?, etablissement_id=?
        WHERE id_publication=?
    `, [objet, text, image, type, date, etablissement_id, id_publication]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer une publication par ID
export async function deletePublication(id_publication) {
    const [result] = await pool.query(`
        DELETE FROM publication
        WHERE id_publication=?
    `, [id_publication]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image d'une publication par ID
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM publication WHERE id_publication = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Suppose que 'image' est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}

// Récupérer le nombre de cœurs d'une publication par ID
export async function getCoeur(id) {
    const [row] = await pool.query(`
        SELECT coeur 
        FROM publication 
        WHERE id_publication = ?
    `, [id]);
    return row[0]; // Retourne le nombre de cœurs pour cette publication
}

// Mettre à jour l'image d'une publication
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE publication
        SET image=?
        WHERE id_publication=?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer l'image d'une publication
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE publication
        SET image=NULL
        WHERE id_publication=?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Mettre à jour le nombre de cœurs d'une publication
export async function updateCoeur(id_publication, coeur) {
    const [result] = await pool.query(`
        UPDATE publication
        SET coeur = ?
        WHERE id_publication = ?
    `, [coeur, id_publication]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}
