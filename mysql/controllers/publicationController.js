import { pool } from "../databases"

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



export async function createPublication(objet,text,image,type,date){
    const [result]= await pool.query(`
            INSERT INTO publication(objet,text,image,type,date)
            VALUES(?,?,?,?,?)
    `,[objet,text,image,type,date])
    return result.insertId
}

export async function updatePublication(id_publication ,objet,text,image,type,date){
    const [result]= await pool.query(`
        UPDATE publication
        SET objet=?,text=? ,image=? ,type=? ,date=?
        WHERE id_publication = ?
    `,[id_publication ,objet,text,image,type,date])
    return result.insertId
}

export async function deletePublication(id_publication){
    const [result]= await pool.query(`
        DELETE publication
        WHERE id_publication = ?
    `,[id_publication])
    return result.insertId
}