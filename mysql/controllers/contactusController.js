import { pool } from "../databases.js";

// Récupérer tous les contacts
export async function getContactusAll() {
    // Exécuter une requête SQL pour sélectionner tous les contacts dans la table contact_from_submissions
    const [row] = await pool.query("SELECT * FROM contact_from_submissions");
    return row; // Retourner les lignes récupérées
}

// Récupérer un seul contact par ID
export async function getContactus(id) {
    // Exécuter une requête SQL pour sélectionner un contact par son ID
    const [row] = await pool.query(`
        SELECT * 
        FROM contact_from_submissions 
        WHERE id_contact = ?
    `, [id]);
    return row[0]; // Retourner la première ligne (contact correspondant)
}

// Créer un nouveau contact
export async function createContact(name, email, message) {
    try {
        // Exécuter une requête SQL pour insérer un nouveau contact dans la table contact_from_submissions
        const [result] = await pool.query(`
            INSERT INTO contact_from_submissions (name, email, message)
            VALUES (?, ?, ?)
        `, [name, email, message]);

        // Retourner un message de succès avec l'ID du nouveau contact inséré
        return { message: 'Contact created successfully', id: result.insertId };
    } catch (error) {
        // En cas d'erreur, log l'erreur et lancer une nouvelle erreur pour indiquer un problème interne
        console.error('Error creating contact:', error);
        throw new Error('Internal server error');
    }
}
