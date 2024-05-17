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


export async function createCommentSante(id_commentaire, sante_id,id_touriste, Texte, Date ){
    const [result]= await pool.query(`
            INSERT INTO commentsante(id_commentaire, sante_id,id_touriste, Texte, Date)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_commentaire, sante_id,id_touriste, Texte, Date])
    return result.insertId
}

export async function updateCommentSante(id_commentaire, sante_id,id_touriste, Texte, Date){
    const [result]= await pool.query(`
        UPDATE 
        SET email=?,password=?,type=?
        WHERE id_utilisateur = ?
    `,[email,password,type])
    return result.insertId
}

export async function deleteEtablissement(id_utilisateur){
    const [result]= await pool.query(`
        DELETE utilisateur
        WHERE id_utilisateur = ?
    `,[id_utilisateur])
    return result.insertId
}
