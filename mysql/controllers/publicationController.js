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



export async function createPublication(id_publication,objet,text,image,type,date){
    const [result]= await pool.query(`
            INSERT INTO publication(id_publication,objet,text,image,type,date)
            VALUES(?,?,?,?,?,?,?,?,?)
    `,[id_publication,objet,text,image,type,date])
    return result.insertId
}

