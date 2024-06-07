import { pool } from "../databases.js";

export async function getTranports() {
    const [row] = await pool.query("SELECT * FROM transport");
    return row;
}

export async function getTranportVille(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM transport 
        WHERE ID_Ville = ?
    `, [id]);
    return row[0];
}

export async function getTranport(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM transport 
        WHERE ID_Transport = ?
    `, [id]);
    return row[0];
}

export async function createTranport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif) {
    const [result] = await pool.query(`
        INSERT INTO transport(ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif)
        VALUES(?,?,?,?,?,?,?)
    `, [ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif]);
    return result.insertId;
}

export async function updateTransport(ID_Transport, ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif) {
    const [result] = await pool.query(`
        UPDATE transport
        SET ID_Ville=?, Type=?, Nom=?, Description=?, zoneCouverte=?, Horaires=?, Tarif=?
        WHERE ID_Transport = ?
    `, [ID_Ville, Type, Nom, Description, zoneCouverte, Horaires, Tarif, ID_Transport]);
    return result.affectedRows;
}

export async function deleteTransport(ID_Transport) {
    const [result] = await pool.query(`
        DELETE FROM transport
        WHERE ID_Transport = ?
    `, [ID_Transport]);
    return result.affectedRows;
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM transport WHERE ID_Transport = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume image is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE transport
        SET image=?
        WHERE ID_Transport=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE transport
        SET image=NULL
        WHERE ID_Transport=?
    `, [id]);
    return result.affectedRows;
}
