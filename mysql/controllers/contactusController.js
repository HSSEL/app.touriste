import { pool } from "../databases.js"

export async function getContactusAll(){
    const [row]=await pool.query("SELECT * FROM contact_from_submissions")
    return row
}



export async function getContactus(id){
    const [row]=await pool.query(`
    SELECT * 
    FROM contact_from_submissions 
    WHERE id_contact = ?
    `,[id])
    return row[0]
}


export async function createContact(name, email, message) {
    try {
      const [result] = await pool.query(`
        INSERT INTO contact_from_submissions (name, email, message)
        VALUES (?, ?, ?)
      `, [name, email, message]);
  
      return { message: 'Contact created successfully', id: result.insertId };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Internal server error');
    }
  }
