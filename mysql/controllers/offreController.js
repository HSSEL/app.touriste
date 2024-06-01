import { pool } from "../databases.js"

export async function getOffres(){
    const [row]=await pool.query("SELECT * FROM offre")
    return row
}

export async function getOffre(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM offre 
    WHERE Id_offre = ?
    `,[id])
    return row[0]
}
