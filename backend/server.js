import config from './src/config/config.config.js';
import app from './src/app.js';
import pool from './src/config/db.config.js';

try {
  const client = await pool.connect();
  console.log('Database connection established successfully');
  client.release();
} catch (err) {
  console.error('Failed to connect to the database:', err.message);
  process.exit(1);
}


app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}.`)
})