const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extendet: true }));

app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/link', require('./routes/link.routes.js'));
app.use('/t', require('./routes/redirect.routes.js'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 5000;

async function start() {
    try {
        mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));
    } catch (error) {
        console.error('Server error', error.message);
        process.exit(1);
    }
}

start();