const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <h1>Frontend</h1>
    <button onclick="fetchData()">Get Message</button>
    <div id="result"></div>
    <script>
      async function fetchData() {
        const res = await fetch('/api/message');
        const data = await res.json();
        document.getElementById('result').innerHTML = '<pre>' + data.content + '</pre>';
      }
    </script>
  `);
});

app.get('/api/message', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/message`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});
