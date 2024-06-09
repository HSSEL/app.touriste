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

//on cree un fichier env dont on a va stocker les informations de la base de donnes car on risque de divulguer 
//notre mot de passe si on le partage dans github par exemple
//donc env est mis en place cote securite
export  {pool}
