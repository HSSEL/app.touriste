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

export async function updateEtablissement(id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux){
    const [result]= await pool.query(`
        UPDATE 
        SET id_ville=?,type=?,nom=?,description=?, adresse=?, telephone=?, Email=?, horaires_ouverture=?, site_web=?, services_offerts=?, reseau_sociaux=?
        WHERE etablissement_id = ?
    `,[id_ville,type ,nom ,description ,adresse ,telephone  ,Email ,horaires_ouverture ,site_web ,services_offerts  ,reseau_sociaux])
    return result.insertId
}

export async function deleteEtablissement(etablissement_id){
    const [result]= await pool.query(`
        DELETE etablissement
        WHERE etablissement_id = ?
    `,[etablissement_id])
    return result.insertId
}