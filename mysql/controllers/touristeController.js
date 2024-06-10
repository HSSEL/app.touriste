import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer toutes les entrées de la table 'touriste'
export async function getTouristes() {
    const [row] = await pool.query("SELECT * FROM touriste");
    return row; // Retourne toutes les lignes récupérées de la table 'touriste'
}

// Récupérer une entrée spécifique de la table 'touriste' par son ID
export async function getTouriste(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM touriste 
        WHERE id_touriste = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de touriste
}

// Créer une nouvelle entrée dans la table 'touriste'
export async function createTouriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image, password, email) {
    const [result] = await pool.query(`
        INSERT INTO touriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image, password, email)
        VALUES(?,?,?,?,?,?,?,?,?)
    `, [Nom, Prenom, adresse, telephone, localisation, villeVisite, image, password, email]);
    return result.insertId; // Retourne l'ID de la nouvelle entrée insérée
}

// Mettre à jour une entrée existante dans la table 'touriste'
export async function updateTouriste(id_touriste, Nom, Prenom, adresse, telephone, localisation, villeVisite, image) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET Nom=?, Prenom=?, adresse=?, telephone=?, localisation=?, villeVisite=?, image=?
        WHERE id_touriste = ?
    `, [Nom, Prenom, adresse, telephone, localisation, villeVisite, image, id_touriste]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer une entrée de la table 'touriste' par son ID
export async function deleteTouriste(id_touriste) {
    const [result] = await pool.query(`
        DELETE FROM touriste
        WHERE id_touriste = ?
    `, [id_touriste]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image associée à une entrée de la table 'touriste' par son ID
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM touriste WHERE id_touriste = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Retourne l'image si elle est trouvée
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}

// Mettre à jour l'image associée à une entrée de la table 'touriste'
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET image=?
        WHERE id_touriste=?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour de l'image
}

// Supprimer l'image associée à une entrée de la table 'touriste'
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET image=NULL
        WHERE id_touriste=?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression de l'image
}
