import { pool } from "../databases"

export async function getUtilisateurs(){
    const [row]=await pool.query("SELECT * FROM utilisateur")
    return row
}


export async function getLogin(email,password){
    const [row]=await pool.query(`
    SELECT * 
    FROM utilisateur 
    WHERE email = ? AND password-?
    `,[emai,pasword])
    return row[0]
}
export async function getUtilisateurEmail(id){
    const [row]=await pool.query(`
    SELECT email 
    FROM utilisateur 
    WHERE id_utilisateur = ? 
    `,[id])
    return row[0]
}

export async function getUtilisateurMdp(id){
    const [row]=await pool.query(`
    SELECT password
    FROM utilisateur 
    WHERE id_utilisateur = ?
    `,[id])
    return row[0]
}


export async function createUtilisateur(email,password,type ){
    const [result]= await pool.query(`
            INSERT INTO etablissement(email,password,type )
            VALUES(?,?,?)
    `,[email,password,type ])
    return result.insertId
}

export async function updateUtilisateur(email,password,type){
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

export {connexionController}