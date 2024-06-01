import { pool } from "../databases.js"

export async function getContactusAll(){
    const [row]=await pool.query("SELECT * FROM contactus")
    return row
}



export async function getContactus(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM contactus 
    WHERE id_contact = ?
    `,[id])
    return row[0]
}

export async function createContactus(nom,email,text){
    const [result]= await pool.query(`
            INSERT INTO publication(nom,email,text)
            VALUES(?,?,?)
    `,[nom,email,text])
    return result.insertId
}
