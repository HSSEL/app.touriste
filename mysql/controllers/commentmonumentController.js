import { pool } from "../databases.js"

export async function getCommentsMonument(){
    const [row]=await pool.query("SELECT * FROM commentmonument")
    return row
}


export async function getCommentMonument(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentmonument 
    WHERE monument_id = ?
    `,[id])
    return row[0]
}


export async function createCommentMonument(id_touriste,Texte , Date, image, monument_id ){
    const [result]= await pool.query(`
            INSERT INTO commentmonument(id_touriste,Texte , Date, image, monument_id)
            VALUES(?, ?, ?, ?, ?)
    `,[id_touriste,Texte , Date, image, monument_id])
    return result.insertId
}

export async function updateCommentMonument(id_commentaire,  Texte, image){
    const [result]= await pool.query(`
        UPDATE commentmonument
        SET Texte=? AND image=?
        WHERE id_commentaire = ?
    `,[id_commentaire,  Texte, image])
    return result.insertId
}

export async function deleteCommentMonument(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentmonument
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}
