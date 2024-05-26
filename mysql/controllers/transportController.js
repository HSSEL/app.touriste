
import { pool } from "../databases.js"

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

export async function updateTransport(ID_Transport,ID_Ville,Type,Nom,Description,zoneCouverte,Horaires,Tarif){
    const [result]= await pool.query(`
        UPDATE transport
        SET ID_Ville=?,Type=?,Nom=?,Description=?,zoneCouverte=?,Horaires=?,Tarif=?
        WHERE ID_Transport = ?
    `,[ID_Transport,ID_Ville, Type,Nom,Description,zoneCouverte,Horaires,Tarif])
    return result.insertId
}

export async function deleteTransport(ID_Transport){
    const [result]= await pool.query(`
        DELETE transport
        WHERE ID_Transport = ?
    `,[ID_Transport])
    return result.insertId
}