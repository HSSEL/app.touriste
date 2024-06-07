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


export async function createMonument(id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image){
    const [result]= await pool.query(`
            INSERT INTO monument(id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,[id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image])
    return result.insertId
}



export async function updateMonument(monument_id, id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image){
    const [result]= await pool.query(`
    UPDATE monument
    SET id_ville = ?,
        Nom = ?,
        description = ?,
        date_construction = ?,
        style = ?,
        hauteur = ?,
        commanditaire = ?,
        etat_conservation = ?,
        fonction_actuelle = ?,
        horaires_ouverture = ?,
        frais_entree = ?,
        accessibilite = ?,
        evenements_speciaux = ?,
        site_web = ?,
        Localisation = ?,
        image = ?
    WHERE monument_id = ?
    `,[monument_id, id_ville, Nom, description, date_construction, style, hauteur, commanditaire, etat_conservation, fonction_actuelle, horaires_ouverture, frais_entree, accessibilite, evenements_speciaux, site_web, Localisation, image])
    return result.insertId
}

export async function deleteMonument(monument_id){
    const [result]= await pool.query(`
        DELETE monument
        WHERE monument_id = ?
    `,[monument_id])
    return result.insertId
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM monument WHERE monument_id = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}