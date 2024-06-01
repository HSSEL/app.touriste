import { pool } from "../databases.js"

export async function getCommentsPaysage(){
    const [row]=await pool.query("SELECT * FROM commentpaysage")
    return row
}


export async function getCommentPaysage(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentpaysage 
    WHERE paysage_id = ?
    `,[id])
    return row[0]
}


export async function createCommentPaysage(id_commentaire, paysage_id,id_touriste, Texte, Date ){
    const [result]= await pool.query(`
            INSERT INTO commentpaysage(id_commentaire, paysage_id, id_touriste, Texte, Date)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_commentaire, paysage_id, id_touriste, Texte, Date])
    return result.insertId
}

export async function updateCommentPaysage(id_commentaire, paysage_id, id_touriste, Texte, Date){
    const [result]= await pool.query(`
        UPDATE commentpaysage
        SET Texte=?
        WHERE id_commentaire = ?
    `,[id_commentaire, paysage_id, id_touriste, Texte, Date])
    return result.insertId
}

export async function deleteCommentPaysage(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentpaysage
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}
