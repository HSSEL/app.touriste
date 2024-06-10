import { pool } from "../databases.js";//Cette ligne importe l'objet pool depuis le fichier databases.js. 
// L'objet pool est une instance de connexion à une base de données MySQL, 
// qui est configurée pour exécuter des requêtes SQL.

// Récupérer toutes les offres
export async function getOffres() {
    const [row] = await pool.query("SELECT * FROM offre");
    return row; // Retourne toutes les lignes récupérées de la table 'offre'
}

// Récupérer une offre spécifique par ID
export async function getOffre(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM offre 
        WHERE Id_offre = ?
    `, [id]);
    return row[0]; // Retourne la première ligne correspondant à cet ID d'offre
}
