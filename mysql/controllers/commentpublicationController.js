import { pool } from "../databases.js"

export async function getCommentsPublication(){
    const [row]=await pool.query("SELECT * FROM commentpublication")
    return row
}


export async function getCommentPublication(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentpublication 
    WHERE id_publication = ?
    `,[id])
    return row[0]
}


export async function createCommentPublication(id_commentaire, id_publication,id_touriste, Texte, Date ){
    const [result]= await pool.query(`
            INSERT INTO commentpublication(id_commentaire, id_publication, id_touriste, Texte, Date)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_commentaire, id_publication, id_touriste, Texte, Date])
    return result.insertId
}

export async function updateCommentPublication(id_commentaire, id_publication, id_touriste, Texte, Date){
    const [result]= await pool.query(`
        UPDATE commentpublication
        SET Texte=?
        WHERE id_commentaire = ?
    `,[id_commentaire, id_publication, id_touriste, Texte, Date])
    return result.insertId
}

export async function deleteCommentPublication(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentpublication
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}
