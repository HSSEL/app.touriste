import { pool } from "../databases"

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

