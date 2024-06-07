import { pool } from "../databases.js";

export async function getPublications() {
    const [row] = await pool.query("SELECT * FROM publication");
    return row;
}

export async function getPublication(id) {
    const [row] = await pool.query(`
        SELECT * 
        FROM publication 
        WHERE id_publication = ?
    `, [id]);
    return row[0];
}


export async function createPublication(objet, text, image, type, date, etablissement_id) {
    const [result] = await pool.query(`
        INSERT INTO publication(objet, text, image, type, date, etablissement_id)
        VALUES(?,?,?,?,?,?)
    `, [objet, text, image, type, date, etablissement_id]);
    return result.insertId;
}



export async function createPublication(objet,text,image,type,date,etablissement_id){
    const [result]= await pool.query(`
            INSERT INTO publication(objet,text,image,type,date,etablissement_id)
            VALUES(?,?,?,?,?,?)
    `,[objet,text,image,type,date,etablissement_id])
    return result.insertId

}

export async function updatePublication(id_publication, objet, text, image, type, date, etablissement_id) {
    const [result] = await pool.query(`
        UPDATE publication
        SET objet=?, text=?, image=?, type=?, date=?, etablissement_id=?
        WHERE id_publication=?
    `, [objet, text, image, type, date, etablissement_id, id_publication]);
    return result.affectedRows;
}

export async function deletePublication(id_publication) {
    const [result] = await pool.query(`
        DELETE FROM publication
        WHERE id_publication=?
    `, [id_publication]);
    return result.affectedRows;
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM publication WHERE id_publication = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume image is the name of the column LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}




export async function getCoeur(id){
    const [row]=await pool.query(`
    SELECT coeur 
    FROM publication 
    WHERE id_publication = ?
    `,[id])
    return row[0]
}


// Function to update an image
export async function updateImage(id, image) {
    const [result] = await pool.query(`
        UPDATE publication
        SET image=?
        WHERE id_publication=?
    `, [image, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage(id) {
    const [result] = await pool.query(`
        UPDATE publication
        SET image=NULL
        WHERE id_publication=?
    `, [id]);
    return result.affectedRows;
}

export async function updateCoeur(id_publication ,coeur){
    const [result]= await pool.query(`
        UPDATE publication
        SET coeur=?
        WHERE id_publication = ?
    `,[id_publication ,coeur])
    return result.insertId

}
