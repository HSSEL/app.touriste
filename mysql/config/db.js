import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

async function connectToDB() {
    try {
        // Create a connection to the MySQL database
        const connection = await createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("Connected to MySQL database...");

        // If you want to use the connection elsewhere, return it
        return connection;
    } catch (error) {
        console.error("Connection failed to MySQL database!", error);
    }
}

import connectToDB from './path/to/connectToDB';

(async () => {
    const connection = await connectToDB();
    if (connection) {
        // Use the connection for queries
        const [rows, fields] = await connection.execute('SELECT * FROM your_table');
        console.log(rows);

        // Don't forget to close the connection when done
        await connection.end();
    }
})();


export default connectToDB;
