import { pool } from "../databases.js"

export async function getEtablissements(){
    const [row]=await pool.query("SELECT * FROM etablissement")
    return row
}

export async function getEtablissementVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM etablissement 
    WHERE id_ville = ?
    `,[id])
    return row[0]
}


export async function getEtablissement(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM etablissement 
    WHERE etablissement_id = ?
    `,[id])
    return row[0]
}

export async function getEtablissementType(type){
    const [row]=await pool.query(`
    SELECT * 
    FROM etablissement 
    WHERE type = ?
    `,[type])
    return row[0]
}

export async function createEtablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ,latitude,longitude,rating){
    const [result]= await pool.query(`
            INSERT INTO etablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ,latitude,longitude,rating )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,? ,?,?,? )
    `,[id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ,latitude,longitude,rating])
    return result.insertId
}

export async function updateEtablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ,latitude,longitude,rating){
    const [result]= await pool.query(`
        UPDATE 
        SET id_ville=?,type=?,nom=?,description=?, adresse=?, telephone=?, Email=?, horaires_ouverture=?, site_web=?, services_offerts=?, reseau_sociaux=? ,latitude=?,longitude=?,rating=?
        WHERE etablissement_id = ?
    `,[id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ,latitude,longitude,rating])
    return result.insertId
}

export async function deleteEtablissement(etablissement_id){
    const [result]= await pool.query(`
        DELETE etablissement
        WHERE etablissement_id = ?
    `,[etablissement_id])
    return result.insertId
}


export async function getImage1(id) {
    const [row] = await pool.query("SELECT image FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}


export async function getImage2(id) {
    const [row] = await pool.query("SELECT image2 FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image2; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}


export async function getImage3(id) {
    const [row] = await pool.query("SELECT image3 FROM etablissement WHERE etablissement_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image3; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}

// Function to update an image
export async function updateImage1(id, image) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image = ?
        WHERE etablissement_id = ?
    `, [image, id]);
    return result.affectedRows;
}

export async function updateImage2(id, image2) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image2 = ?
        WHERE etablissement_id = ?
    `, [image2, id]);
    return result.affectedRows;
}

export async function updateImage3(id, image3) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image3 = ?
        WHERE etablissement_id = ?
    `, [image3, id]);
    return result.affectedRows;
}

// Function to delete an image
export async function deleteImage1(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows;
}

export async function deleteImage2(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image2 = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows;
}

export async function deleteImage3(id) {
    const [result] = await pool.query(`
        UPDATE etablissement
        SET image3 = NULL
        WHERE etablissement_id = ?
    `, [id]);
    return result.affectedRows;
}