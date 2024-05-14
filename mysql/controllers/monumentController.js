import { pool } from "../databases"

export async function getMonuments(){
    const [row]=await pool.query("SELECT * FROM paysage")
    return row
}

export async function getMonumentVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM monument 
    WHERE id_ville = ?
    `,[id])
    return row[0]
}

export async function getMonument(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM monument 
    WHERE monument_id = ?
    `,[id])
    return row[0]
}


export async function createPaysage(id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation){
    const [result]= await pool.query(`
            INSERT INTO monument(id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,[id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation])
    return result.insertId
}