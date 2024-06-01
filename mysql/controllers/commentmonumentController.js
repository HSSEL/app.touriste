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


export async function createCommentMonument(id_commentaire, monument_id,id_touriste, Texte, Date ){
    const [result]= await pool.query(`
            INSERT INTO commentmonument(id_commentaire, monument_id, id_touriste, Texte, Date)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_commentaire, monument_id, id_touriste, Texte, Date])
    return result.insertId
}

export async function updateCommentMonument(id_commentaire, monument_id, id_touriste, Texte, Date){
    const [result]= await pool.query(`
        UPDATE commentmonument
        SET Texte=?
        WHERE id_commentaire = ?
    `,[id_commentaire, monument_id, id_touriste, Texte, Date])
    return result.insertId
}

export async function deleteCommentMonument(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentmonument
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}
