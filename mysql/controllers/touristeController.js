
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


export async function createTouriste(Nom,Prenom,adresse,telephone,localisation,villeVisite,image){
    const [result]= await pool.query(`
            INSERT INTO touriste(Nom,Prenom,adresse,telephone,localisation,villeVisite,image)
            VALUES(?,?,?,?,?,?,?)
    `,[Nom,Prenom,adresse,telephone,localisation,villeVisite,image])
    return result.insertId
}

export async function updateTouriste(Nom,Prenom,adresse,telephone,localisation,villeVisite,image){
    const [result]= await pool.query(`
        UPDATE touriste
        SET Nom=?,Prenom=?,adresse=?,telephone=?,localisation=?,villeVisite=?,image=?
        WHERE id_touriste = ?
    `,[Nom,Prenom,adresse,telephone,localisation,villeVisite,image])
    return result.insertId
}

export async function deleteTouriste(id_touriste){
    const [result]= await pool.query(`
        DELETE touriste
        WHERE id_touriste = ?
    `,[id_touriste])
    return result.insertId
}


export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM touriste WHERE id_touriste = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}
