import { pool } from "../databases.js";

export async function getSantes() {
    const [row] = await pool.query("SELECT * FROM sante");
    return row;
}

export async function getSanteVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM sante 
        WHERE id_ville = ?
    `, [id]);
    return row;
}

export async function getSante(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM sante 
        WHERE sante_id = ?
    `, [id]);
    return row[0];
}

export async function createSante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email) {
    const [result] = await pool.query(`
        INSERT INTO sante(id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email)
        VALUES(?,?,?,?,?,?,?,?,?)
    `, [id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email]);
    return result.insertId;
}

export async function updateSante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email) {
    const [result] = await pool.query(`
        UPDATE sante
        SET id_ville=?, Type=?, Nom=?, Adresse=?, Téléphone=?, Horaires_ouverture=?, Activites=?, site_Web=?, Email=?
        WHERE sante_id=?
    `, [id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, site_Web, Email, sante_id]);
    return result.affectedRows;
}

export async function deleteSante(sante_id) {
    const [result] = await pool.query(`
        DELETE FROM sante
        WHERE sante_id=?
    `, [sante_id]);
    return result.affectedRows;
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM sante WHERE sante_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume image is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE sante
        SET image=?
        WHERE sante_id=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE sante
        SET image=NULL
        WHERE sante_id=?
    `, [id]);
    return result.affectedRows;
}
