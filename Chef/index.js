require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Chef = require('./Chef')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.get('/all',(req,res)=>{
    Chef.find().then(chefs => res.send(chefs));
})
app.post('/add',(req,res)=>{
    Chef.create(req.body)
})
app.put('/update/:name',(req,res)=>{
    Chef.updateOne({"nom":req.params.name},{$set:req.body}).then(Chef => res.send(Chef))
})
app.delete('/delete/:name',(req,res)=>{
    Chef.deleteOne({"nom":req.params.name},{$set:req.body}).then(Chef => res.send(Chef))
})
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})