import { pool } from "../databases.js";

export async function getPaysages() {
    const [row] = await pool.query("SELECT * FROM paysage");
    return row;
}

export async function getPaysageVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM paysage 
        WHERE ville_id = ?
    `, [id]);
    return row[0];
}

export async function getPaysage(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM paysage 
        WHERE paysage_id = ?
    `, [id]);
    return row[0];
}

export async function createPaysage(ville_id, nom, description, localisation, horarire_ouverture, image) {
    const [result] = await pool.query(`
        INSERT INTO paysage(ville_id, nom, description, localisation, horarire_ouverture, image)
        VALUES(?,?,?,?,?,?)
    `, [ville_id, nom, description, localisation, horarire_ouverture, image]);
    return result.insertId;
}

export async function updatePaysage(paysage_id, ville_id, nom, description, localisation, horarire_ouverture, image) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET ville_id=?, nom=?, description=?, localisation=?, horarire_ouverture=?, image=?
        WHERE paysage_id=?
    `, [ville_id, nom, description, localisation, horarire_ouverture, image, paysage_id]);
    return result.affectedRows;
}

export async function deletePaysage(paysage_id) {
    const [result] = await pool.query(`
        DELETE FROM paysage
        WHERE paysage_id=?
    `, [paysage_id]);
    return result.affectedRows;
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM paysage WHERE paysage_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume image is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET image=?
        WHERE paysage_id=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE paysage
        SET image=NULL
        WHERE paysage_id=?
    `, [id]);
    return result.affectedRows;
}
