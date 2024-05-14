import { pool } from "../databases"

export async function getEtablissements(){
    const [row]=await pool.query("SELECT * FROM etablissement")
    return row
}

export async function getEtablissementVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM etablissement 
    WHERE id_ville = ?
    `,[id])
    return row[0]
}

export async function getEtablissement(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM etablissement 
    WHERE etablissement_id = ?
    `,[id])
    return row[0]
}


export async function createEtablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ){
    const [result]= await pool.query(`
            INSERT INTO etablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux )
            VALUES(?,?,?,?,?,?,?,?,?,?,?)
    `,[id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux ])
    return result.insertId
}