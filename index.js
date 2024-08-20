const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api', userRoutes); // Isso deve garantir que as rotas sejam acessíveis em /api

// Tratamento de erro para rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: "The requested route was not found. Please refer to the API docs and try again." });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
