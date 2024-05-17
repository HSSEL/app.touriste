import { pool } from "../databases"

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


export async function createCommentEtablissement(id_commentaire, etablissement_id, id_touriste, Texte, Date){
    const [result]= await pool.query(`
            INSERT INTO commentetablissement(id_commentaire, etablissement_id, id_touriste, Texte, Date)
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_commentaire, etablissement_id, id_touriste, Texte, Date])
    return result.insertId
}

export async function updateCommentEtablissement(id_commentaire, etablissement_id,id_touriste, Texte, Date){
    const [result]= await pool.query(`
        UPDATE 
        SET Texte=?
        WHERE id_commentaire = ?
    `,[id_commentaire, etablissement_id,id_touriste, Texte, Date])
    return result.insertId
}

export async function deleteCommentEtablissement(id_commentaire){
    const [result]= await pool.query(`
        DELETE commentetablissement
        WHERE id_commentaire = ?
    `,[id_commentaire])
    return result.insertId
}