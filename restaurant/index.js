require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Recette = require('../Recette/Recette')
const Restaurant = require('./Restaurant')
const Chef = require('../Chef/Chef')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.get('/all', (req, res) => {
  Restaurant.find().then(Restaurants => res.send(Restaurants))
});
app.get('/chefs/:restaurant', async (req, res) => {
  const restaurant = await Restaurant.findOne({ nom: req.params.restaurant });
  const chefs = await Chef.find({ _id: { $in: restaurant.chef_id } });
  res.send(chefs);
});
app.get('/recettes/:restaurant', async (req, res) => {
  const restaurant = await Restaurant.findOne({ nom: req.params.restaurant });
  const recettes = await Recette.find({ _id: { $in: restaurant.recette_id } });
  res.send(recettes);
});

app.post('/add', (req, res) => {
  Restaurant.create(req.body)
});
app.put('/update/:name', (req, res) => {
  Restaurant.updateOne({ "nom": req.params.name }, { $set: req.body }).then(Restaurant => res.send(Restaurant))
});
app.delete('/delete/:name', (req, res) => {
  Restaurant.deleteOne({ "nom": req.params.name }).then(Restaurant => res.send(Restaurant))
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})