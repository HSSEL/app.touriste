import { pool } from "../databases.js";

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
