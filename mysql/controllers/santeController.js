import { pool } from "../databases"

export async function getSantes(){
    const [row]=await pool.query("SELECT * FROM sante")
    return row
}

export async function getTranportVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM tranport 
    WHERE ID_Ville = ?
    `,[id])
    return row[0]
}

export async function getSante(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM sante 
    WHERE sante_id = ?
    `,[id])
    return row[0]
}


export async function createSante(id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite){
    const [result]= await pool.query(`
            INSERT INTO sante(id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite)
            VALUES(?,?,?,?,?,?,?)
    `,[id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite])
    return result.insertId
}

