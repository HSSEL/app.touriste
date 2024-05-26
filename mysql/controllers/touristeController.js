
import { pool } from "../databases.js"

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


export async function createTouriste(Nom,Prenom,adresse,telephone,localisation,villeVisite){
    const [result]= await pool.query(`
            INSERT INTO touriste(Nom,Prenom,adresse,telephone,localisation,villeVisite)
            VALUES(?,?,?,?,?,?)
    `,[Nom,Prenom,adresse,telephone,localisation,villeVisite])
    return result.insertId
}

export async function updateTouriste(id_touriste,Nom,Prenom,adresse,telephone,localisation,villeVisite){
    const [result]= await pool.query(`
        UPDATE touriste
        SET Nom=?,Prenom=?,adresse=?,telephone=?,localisation=?,villeVisite=?
        WHERE id_touriste = ?
    `,[Nom,Prenom,adresse,telephone,localisation,villeVisite])
    return result.insertId
}

export async function deleteTouriste(id_touriste){
    const [result]= await pool.query(`
        DELETE touriste
        WHERE id_touriste = ?
    `,[id_touriste])
    return result.insertId
}

