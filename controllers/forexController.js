const ForexRate = require('../models/ForexRate.js')
const ScraperService = require('../services/scraperService.js')


class ForexController {
  static async getForexData(req, res) {
    try {
      const { from, to, period } = req.body;
      
      await ScraperService.scrapeForexData(from, to, period);
    
      const periodMap = {
        '1W': 7,
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365
      };
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - periodMap[period]);
      
      const forexData = await ForexRate.find({
        fromCurrency: from,
        toCurrency: to,
        date: { $gte: startDate }
      }).sort({ date: 1 });
      
      res.json(forexData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ForexController;