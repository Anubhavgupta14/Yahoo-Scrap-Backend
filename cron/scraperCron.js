const cron = require('node-cron')
const ScraperService = require('../services/scraperService')

const currencyPairs = [
  { from: 'GBP', to: 'INR', periods: ['1W', '1M', '3M', '6M', '1Y'] },
  { from: 'AED', to: 'INR', periods: ['1W', '1M', '3M', '6M', '1Y'] }
];

class ScraperCron {
  static init() {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
      console.log('Starting periodic forex data scraping...');
      
      for (const pair of currencyPairs) {
        for (const period of pair.periods) {
          try {
            await ScraperService.scrapeForexData(pair.from, pair.to, period);
            console.log(`Scraped ${pair.from}-${pair.to} for period ${period}`);
          } catch (error) {
            console.error(`Error scraping ${pair.from}-${pair.to} for period ${period}:`, error);
          }
        }
      }
    });
  }
}

module.exports = ScraperCron