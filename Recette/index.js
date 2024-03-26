require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Recette = require('./Recette')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.get('/all',(req,res)=>{
    Recette.find().then(Recettes => res.send(Recettes));
})
app.post('/add',(req,res)=>{
    Recette.create(req.body)
})
app.put('/update/:name',(req,res)=>{
    Recette.updateOne({"nom":req.params.name},{$set:req.body}).then(Recette => res.send(Recette))
})
app.delete('/delete/:name',(req,res)=>{
    Recette.deleteOne({"nom":req.params.name},{$set:req.body}).then(Recette => res.send(Recette))
})
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})