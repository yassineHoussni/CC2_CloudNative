require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./Utilisateur')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
const TOKEN_SECRET = require('crypto').randomBytes(48).toString('hex');
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.post('/register', async (req, res) => {
    const { email, nom,login,mdp } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "deja !!." });
    }
    const password = await bcrypt.hash(mdp, 10);
    await User.create({ email, mdp: password ,nom,login});
    res.status(201).json({ message: "creer !!." });
});

app.post('/login', async (req, res) => {
    const { email, mdp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }
    const mdpMatch = await bcrypt.compare(mdp, user.mdp);
    if (!mdpMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    const token = jwt.sign({ userId: user._id },TOKEN_SECRET);
    process.env.TOKEN = token
    res.status(200).json({ token });
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})