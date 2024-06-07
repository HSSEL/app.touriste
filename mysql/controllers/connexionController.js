import { pool } from "../databases.js"

export async function getUtilisateurs(){
    const [row]=await pool.query("SELECT * FROM user")
    return row
}


export async function getLogin(email,password){
    const [row]=await pool.query(`
    SELECT * 
    FROM users 
    WHERE email = ? AND password-?
    `,[email,password])
    return row[0]
}
export async function getUtilisateurEmail(id){
    const [row]=await pool.query(`
    SELECT email 
    FROM users 
    WHERE id = ? 
    `,[id])
    return row[0]
}

export async function getUtilisateurMdp(id){
    const [row]=await pool.query(`
    SELECT password
    FROM users 
    WHERE id = ?
    `,[id])
    return row[0]
}


export async function createUtilisateur(email,password,isEstablishment ){
    const [result]= await pool.query(`
            INSERT INTO users(email,password,isEstablishment )
            VALUES(?,?,?)
    `,[email,password,isEstablishment ])
    return result.insertId
}

export async function updateUtilisateur(id,email,password,isEstablishment){
    const [result]= await pool.query(`
        UPDATE users
        SET email=? AND password=? AND isEstablishment=?
        WHERE id = ?
    `,[id,email,password,isEstablishment])
    return result.insertId
}

export async function register(req, res) {
    const { name, surname, email, phone, password, isEstablishment } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO users (name, surname, email, phone, password, isEstablishment)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [name, surname, email, phone, password, isEstablishment]);

        const newUser = {
            id: result.insertId,
            name,
            surname,
            email,
            phone,
            password,
            isEstablishment
        };

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query(`
            SELECT * FROM users WHERE email = ? AND password = ?
        `, [email, password]);

        if (rows.length > 0) {
            const user = rows[0];
            res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






