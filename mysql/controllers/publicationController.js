import { pool } from "../databases.js"

export async function getPublications(){
    const [row]=await pool.query("SELECT * FROM publication")
    return row
}

export async function getPublication(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM publication 
    WHERE id_publication = ?
    `,[id])
    return row[0]
}




export async function createPublication(objet,text,image,type,date,etablissement_id){
    const [result]= await pool.query(`
            INSERT INTO publication(objet,text,image,type,date,etablissement_id)
            VALUES(?,?,?,?,?,?)
    `,[objet,text,image,type,date])
    return result.insertId
}

export async function updatePublication(id_publication ,objet,text,image,type,date,etablissement_id){
    const [result]= await pool.query(`
        UPDATE publication
        SET objet=?,text=? ,image=? ,type=? ,date=?, etablissement_id=?
        WHERE id_publication = ?
    `,[id_publication ,objet,text,image,type,date,etablissement_id])
    return result.insertId
}

export async function deletePublication(id_publication){
    const [result]= await pool.query(`
        DELETE publication
        WHERE id_publication = ?
    `,[id_publication])
    return result.insertId
}

export async function getImage(id) {
    const [row] = await pool.query("SELECT image FROM publication WHERE id_publication = ?", [id]);
    if (row.length > 0) {
        return row[0].image; // Assume que image est le nom de la colonne LONGBLOB
    } else {
        throw new Error("Image not found");
    }
}
