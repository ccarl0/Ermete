import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Add CORS headers middleware
// Add CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const satelliteEndpoints = [
  '25544/45/9/200/5&apiKey=YPEXD3-9G2FAH-6XDH52-56A7',
  '48274/45/9/200/5&apiKey=YPEXD3-9G2FAH-6XDH52-56A7',
  '44072/45/9/200/5&apiKey=YPEXD3-9G2FAH-6XDH52-56A7',
  '31135/45/9/200/5&apiKey=YPEXD3-9G2FAH-6XDH52-56A7',
  '21055/45/9/200/5&apiKey=YPEXD3-9G2FAH-6XDH52-56A7'
];

app.get('/api/data', async (req, res) => {
  try {
    const apiPromises = satelliteEndpoints.map(async (endpoint) => {
      const apiUrl = `https://api.n2yo.com/rest/v1/satellite/positions/${endpoint}`;
      const response = await fetch(apiUrl);
      return response.json();
    });

    const responseData = await Promise.all(apiPromises);

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
