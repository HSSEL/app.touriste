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