const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/dawii_2022_1_grupo_01_sabado_frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/dawii_2022_1_grupo_01_sabado_frontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
