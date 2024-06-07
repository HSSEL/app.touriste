
import { pool } from "../databases.js"

const User = {
    create: (user, callback) => {
      const query = 'INSERT INTO users (name, surname, email, phone, password, isEstablishment) VALUES (?, ?, ?, ?, ?, ?)';
      pool.query(query, [user.name, user.surname, user.email, user.phone, user.password, user.isEstablishment], callback);
    },
    findByEmail: (email, callback) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      pool.query(query, [email], callback);
    },
    findById: (id, callback) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      pool.query(query, [id], callback);
    }
  };
  
  export default User;