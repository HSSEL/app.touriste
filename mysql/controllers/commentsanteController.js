import { pool } from "../databases"

export async function getCommentsSante(){
    const [row]=await pool.query("SELECT * FROM commentsante")
    return row
}


export async function getCommentSante(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentetsante 
    WHERE sante_id = ?
    `,[id])
    return row[0]
}


export async function createCommentSante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email){
    const [result]= await pool.query(`
            INSERT INTO commentsante(sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[sante_id, id_ville, Type, Nom, Adresse, Téléphone, Horaires_ouverture, Activites, Site_web, Email])
    return result.insertId
}