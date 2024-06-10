import { pool } from "../databases.js";

// Fonction pour récupérer tous les utilisateurs
export async function getUtilisateurs() {
    const [row] = await pool.query("SELECT * FROM users");
    return row;
}

// Fonction pour vérifier les informations de connexion et récupérer l'utilisateur correspondant
export async function getLogin(email, password) {
    const [row] = await pool.query(`
        SELECT * 
        FROM users 
        WHERE email = ? AND password = ?
    `, [email, password]);
    return row[0];
}


export async function getUserDetails(id, isEstablishment) {
    if (isEstablishment === 1) {
        const [row] = await pool.query(`
            SELECT * 
            FROM etablissement 
            WHERE etablissement_id = ?
        `, [id]);
        return row[0];
    } else {
        const [row] = await pool.query(`
            SELECT * 
            FROM touriste 
            WHERE id_touriste = ?
        `, [id]);
        return row[0];
    }
}
// Fonction pour récupérer l'email de l'utilisateur par son ID
export async function getUtilisateurEmail(id) {
    const [row] = await pool.query(`
        SELECT email 
        FROM users 
        WHERE id = ? 
    `, [id]);
    return row[0];
}

// Fonction pour récupérer le mot de passe de l'utilisateur par son ID
export async function getUtilisateurMdp(id) {
    const [row] = await pool.query(`
        SELECT password
        FROM users 
        WHERE id = ?
    `, [id]);
    return row[0];
}

// Fonction pour créer un nouvel utilisateur
export async function createUtilisateur(email, password, touriste_id) {
    const [result] = await pool.query(`
      INSERT INTO users (email, password, touriste_id)
      VALUES (?, ?, ?)
    `, [email, password, touriste_id]);
    return result.insertId;
  }


// Fonction pour créer un utilisateur et un touriste
export async function registerUtilisateurEtTouriste(userData, touristeData) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
  
      // Créer le touriste
      const touristeId = await createTouriste(
        touristeData.Nom,
        touristeData.Prenom,
        touristeData.adresse,
        touristeData.telephone,
        touristeData.localisation,
        touristeData.villeVisite,
        touristeData.image
      );
  
      // Créer l'utilisateur avec l'id du touriste créé
      const utilisateurId = await createUtilisateur(
        userData.email,
        userData.password,
        
        touristeId
      );
  
      await connection.commit();
      return utilisateurId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
}


// Fonction pour mettre à jour les informations de l'utilisateur
export async function updateUtilisateur(id, email, password, isEstablishment) {
    const [result] = await pool.query(`
        UPDATE users
        SET email=?, password=?, isEstablishment=?
        WHERE id = ?
    `, [email, password, isEstablishment, id]);
    return result.insertId;
}

// Fonction de routage pour l'inscription d'un nouvel utilisateur
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

// Fonction de routage pour la connexion d'un utilisateur
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
