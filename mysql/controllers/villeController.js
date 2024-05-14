

import { pool } from "../databases"

export async function getVilles(){
    const [row]=await pool.query("SELECT * FROM ville")
    return row
}

const ville=await getVilles()
//console.log(ville)

export async function getVille(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM ville 
    WHERE id_ville = ?
    `,[id])
    return row[0]
}

const villepremiere=await getVille(1)
//console.log(villepremiere)

// we could have written ${id} but its an untrusted statement its called tampled statement and what is written above is called prepared statement


export async function createVille(Nom,Description,Quartiers){
    const [result]= await pool.query(`
            INSERT INTO ville(Nom,Description,Quartiers)
            VALUES(?,?,?)
    `,[Nom,Description,Quartiers])
    return result.insertId
}

const result =await createVille("test","test","test")
//console.log(result)