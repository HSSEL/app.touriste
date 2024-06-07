import { pool } from "../databases.js"

export async function getCommentsEtablissement(){
    const [row]=await pool.query("SELECT * FROM commentetablissement")
    return row
}

export async function getComments(){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentetablissement 
    WHERE id_commentaire= ?
    `,[id])
    return row[0]
}
export async function getCommentEtablissement(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM commentetablissement 
    WHERE etablissement_id = ?
    `,[id])
    return row[0]
}


export async function createCommentEtablissement(etablissement_id, id_touriste,Texte , Date, image){
    const [result]= await pool.query(`
            INSERT INTO commentetablissement(etablissement_id, id_touriste,Texte , Date, image)
            VALUES(?, ?, ?, ?, ?)
    `,[etablissement_id, id_touriste,Texte , Date, image])
    return result.insertId
}

export async function updateCommentEtablissement(id_commentaire,  Texte, image){
    const [result]= await pool.query(`
        UPDATE commentetablissement
        SET Texte=? AND image=?
        WHERE id_commentaire = ?
    `,[id_commentaire,  Texte, image])
    return result.insertId
}

export async function deleteCommentEtablissement(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentetablissement
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}