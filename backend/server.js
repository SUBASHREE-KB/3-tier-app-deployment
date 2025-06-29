const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/api/message', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
