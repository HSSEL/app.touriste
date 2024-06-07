import { pool } from "../databases.js";

export async function getTouristes() {
    const [row] = await pool.query("SELECT * FROM touriste");
    return row;
}

export async function getTouriste(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM touriste 
        WHERE id_touriste = ?
    `, [id]);
    return row[0];
}

export async function createTouriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image) {
    const [result] = await pool.query(`
        INSERT INTO touriste(Nom, Prenom, adresse, telephone, localisation, villeVisite, image)
        VALUES(?,?,?,?,?,?,?)
    `, [Nom, Prenom, adresse, telephone, localisation, villeVisite, image]);
    return result.insertId;
}

export async function updateTouriste(id_touriste, Nom, Prenom, adresse, telephone, localisation, villeVisite, image) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET Nom=?, Prenom=?, adresse=?, telephone=?, localisation=?, villeVisite=?, image=?
        WHERE id_touriste = ?
    `, [Nom, Prenom, adresse, telephone, localisation, villeVisite, image, id_touriste]);
    return result.affectedRows;
}

export async function deleteTouriste(id_touriste) {
    const [result] = await pool.query(`
        DELETE FROM touriste
        WHERE id_touriste = ?
    `, [id_touriste]);
    return result.affectedRows;
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM touriste WHERE id_touriste = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume image is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET image=?
        WHERE id_touriste=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE touriste
        SET image=NULL
        WHERE id_touriste=?
    `, [id]);
    return result.affectedRows;
}
