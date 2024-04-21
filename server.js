const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(cors());

app.get('/app', (req, res) => {
    const ip = req.ip;
    res.send(ip);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});