const mongoose = require('mongoose');

const PresentationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slides: { type: Array, default: [] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Presentation', PresentationSchema);
