const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  text: { type: String, required: true },
  url: { type: String, required: true, default: '/' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null }
});

const Menu = mongoose.model('Menu', MenuSchema);

