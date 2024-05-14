
import { pool } from "../databases"

export async function getTouristes(){
    const [row]=await pool.query("SELECT * FROM touriste")
    return row
}


export async function getTouriste(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM touriste 
    WHERE id_touriste = ?
    `,[id])
    return row[0]
}


export async function createTouriste(id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite){
    const [result]= await pool.query(`
            INSERT INTO touriste(id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite)
            VALUES(?,?,?,?,?,?,?)
    `,[id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite])
    return result.insertId
}

