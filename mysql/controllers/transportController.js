import { pool } from "../databases.js";

// Récupérer toutes les entrées de la table 'transport'
export async function getTransports() {
    const [row] = await pool.query("SELECT * FROM transport");
    return row; // Retourne toutes les lignes récupérées de la table 'transport'
}

// Récupérer une entrée spécifique de la table 'transport' par son ID de ville
export async function getTransportVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM transport 
        WHERE ID_Ville = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de ville
}

// Récupérer une entrée spécifique de la table 'transport' par son ID de transport
export async function getTransport(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM transport 
        WHERE ID_Transport = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID de transport
}

// Créer une nouvelle entrée dans la table 'transport'
export async function createTransport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif) {
    const [result] = await pool.query(`
        INSERT INTO transport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif)
        VALUES(?,?,?,?,?,?,?)
    `, [ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif]);
    return result.insertId; // Retourne l'ID de la nouvelle entrée insérée
}

// Mettre à jour une entrée existante dans la table 'transport'
export async function updateTransport(ID_Transport, ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif) {
    const [result] = await pool.query(`
        UPDATE transport
        SET ID_Ville=?, Type=?, Nom=?, Description=?, zoneCouverte=?, Horaires=?, Tarif=?
        WHERE ID_Transport = ?
    `, [ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif, ID_Transport]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour
}

// Supprimer une entrée de la table 'transport' par son ID de transport
export async function deleteTransport(ID_Transport) {
    const [result] = await pool.query(`
        DELETE FROM transport
        WHERE ID_Transport = ?
    `, [ID_Transport]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression
}

// Récupérer l'image associée à une entrée de la table 'transport' par son ID de transport
export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM transport WHERE ID_Transport = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Retourne l'image si elle est trouvée
    } else {
        throw new Error("Image not found"); // Lève une erreur si l'image n'est pas trouvée
    }
}

// Mettre à jour l'image associée à une entrée de la table 'transport' par son ID de transport
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE transport
        SET image=?
        WHERE ID_Transport=?
    `, [image, id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la mise à jour de l'image
}

// Supprimer l'image associée à une entrée de la table 'transport' par son ID de transport
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE transport
        SET image=NULL
        WHERE ID_Transport=?
    `, [id]);
    return result.affectedRows; // Retourne le nombre de lignes affectées par la suppression de l'image
}
