import { pool } from "../databases.js"

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


export async function createMonument(id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation){
    const [result]= await pool.query(`
            INSERT INTO monument(id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,[id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation])
    return result.insertId
}



export async function updateMonument(monument_id ,id_ville,Nom ,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation){
    const [result]= await pool.query(`
        UPDATE monument
        SET monument_id=?,id_ville=?,nom=?,description=?,date_construction=?, style=?, hauteur=?, 
        WHERE paysage_id = ?
    `,[monument_id ,id_ville,Nom,description,date_construction,style,hauteur ,commanditaire,etat_conservation ,fonction_actuelle ,horaires_ouverture ,frais_entree ,accessibilite ,evenements_speciaux,site_web ,Localisation])
    return result.insertId
}

export async function deleteMonument(paysage_id){
    const [result]= await pool.query(`
        DELETE paysage
        WHERE paysage_id = ?
    `,[paysage_id])
    return result.insertId
}