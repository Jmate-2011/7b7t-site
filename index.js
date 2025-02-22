const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/server-status', async (req, res) => {
    try {
        const response = await fetch('https://api.mcstatus.io/v2/status/java/7b7t.net');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching server status:', error);
        res.status(500).json({ error: 'Failed to fetch server status' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});