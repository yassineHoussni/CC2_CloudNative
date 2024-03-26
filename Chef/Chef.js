const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  specialite: { type: String, required: true }
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;