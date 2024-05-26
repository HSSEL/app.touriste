import { pool } from "../databases.js"

export async function getSantes(){
    const [row]=await pool.query("SELECT * FROM sante")
    return row
}

export async function getSanteVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM sante 
    WHERE id_ville = ?
    `,[id])
    return row[0]
}

export async function getSante(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM sante 
    WHERE sante_id = ?
    `,[id])
    return row[0]
}


export async function createSante(id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email){
    const [result]= await pool.query(`
            INSERT INTO sante(id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email )
            VALUES(?,?,?,?,?,?,?,?,?)
    `,[id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email])
    return result.insertId
}

export async function updateSante(sante_id,id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email){
    const [result]= await pool.query(`
        UPDATE sante
        SET id_ville=?,Type=?,Nom=? ,Adresse=?,Téléphone=? ,Horaires_ouverture=?,Activites=?,site_Web=? ,Email=?
        WHERE sante_id = ?
    `,[sante_id,id_ville,Type,Nom ,Adresse,Téléphone ,Horaires_ouverture,Activites,site_Web ,Email])
    return result.insertId
}

export async function deleteSante(sante_id){
    const [result]= await pool.query(`
        DELETE sante
        WHERE sante_id = ?
    `,[sante_id])
    return result.insertId
}