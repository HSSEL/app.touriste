import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()
/*
const pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'projet_federateur'
}).promise()
*/
const pool=mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//const result=await pool.query("SELECT * FROM ville")
//const rows=result[0];


//console.log(rows)
// ils se stockent en tant qu'une liste la premire contient les valeurs et la seconde contient les attributs de la table
// on peut ecrire pour afficher que les valeurs(premier element de la liste )la ligne qui precede
//ou bien : const [result]=await pool.query("SELECT * FROM ville")


export  {pool}
