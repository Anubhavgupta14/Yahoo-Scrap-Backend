const mongoose = require('mongoose')

const forexRateSchema = new mongoose.Schema({
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  date: { type: Date, required: true },
  rate: { type: Number, required: true },
  openPrice: { type: Number },
  highPrice: { type: Number },
  lowPrice: { type: Number },
  closePrice: { type: Number }
}, { 
  indexes: [
    { fromCurrency: 1, toCurrency: 1, date: -1 }
  ]
});

module.exports = mongoose.model("ForexRate", forexRateSchema);