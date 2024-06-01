import { pool } from "../databases.js"

export async function getPaysages(){
    const [row]=await pool.query("SELECT * FROM paysage")
    return row
}

export async function getPaysageVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM paysage 
    WHERE ville_id = ?
    `,[id])
    return row[0]
}

export async function getPaysage(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM paysage 
    WHERE paysage_id = ?
    `,[id])
    return row[0]
}


export async function createPaysage(ville_id,nom,description,localisation,horarire_ouverture){
    const [result]= await pool.query(`
            INSERT INTO paysage(ville_id,nom,description,localisation,horarire_ouverture)
            VALUES(?,?,?,?,?,?)
    `,[ville_id,nom,description,localisation,horarire_ouverture])
    return result.insertId
}

export async function updatePaysage(paysage_id ,ville_id,nom,description,localisation,horarire_ouverture){
    const [result]= await pool.query(`
        UPDATE paysage
        SET ville_id=?,nom=?,description=?,localisation=?,horarire_ouverture=?
        WHERE paysage_id = ?
    `,[paysage_id ,ville_id,nom,description,localisation,horarire_ouverture])
    return result.insertId
}

export async function deletePaysage(paysage_id){
    const [result]= await pool.query(`
        DELETE paysage
        WHERE paysage_id = ?
    `,[paysage_id])
    return result.insertId
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM paysage WHERE paysage_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}