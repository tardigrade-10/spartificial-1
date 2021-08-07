const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
	filename:String
},{timestamps:true});

module.exports = mongoose.model('File', fileSchema);
