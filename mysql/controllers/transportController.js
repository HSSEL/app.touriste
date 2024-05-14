
import { pool } from "../databases"

export async function getTranports(){
    const [row]=await pool.query("SELECT * FROM tranport")
    return row
}


export async function getTranportVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM tranport 
    WHERE ID_Ville = ?
    `,[id])
    return row[0]
}

export async function getTranport(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM tranport 
    WHERE ID_Transport = ?
    `,[id])
    return row[0]
}


export async function createTranport(ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif){
    const [result]= await pool.query(`
            INSERT INTO transport(ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif)
            VALUES(?,?,?,?,?,?,?)
    `,[ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif])
    return result.insertId
}

