const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const ForexRate = require('../models/ForexRate.js');

class ScraperService {
  static async scrapeForexData(fromCurrency, toCurrency, period) {
    const quote = `${fromCurrency}${toCurrency}=X`;
    const encodedQuote = encodeURIComponent(quote);

    // Calculate timestamp based on period
    const periodMap = {
      '1W': 7 * 24 * 60 * 60,
      '1M': 30 * 24 * 60 * 60,
      '3M': 90 * 24 * 60 * 60,
      '6M': 180 * 24 * 60 * 60,
      '1Y': 365 * 24 * 60 * 60
    };

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const fromTimestamp = currentTimestamp - periodMap[period];

    const url = `https://finance.yahoo.com/quote/${encodedQuote}/history/?period1=${fromTimestamp}&period2=${currentTimestamp}`;

    let browser;
    try {
      // Launch browser with specific configurations to avoid detection
      browser = await puppeteer.launch({
        executablePath: 
          process.env.NODE_ENV === 'production' 
            ? process.env.PUPPETEER_EXECUTABLE_PATH 
            : puppeteer.executablePath(),
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();

      // Randomize user agent to reduce detection
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      // Randomize viewport size
      await page.setViewport({
        width: 1920 + Math.floor(Math.random() * 100),
        height: 1080 + Math.floor(Math.random() * 100)
      });

      // Navigate with timeout and wait for network
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 45000
      });

      // Wait for table to load
      await page.waitForSelector('table', { timeout: 30000 });

      // Extract data using page.evaluate
      const historicalData = await page.evaluate((fromCurrency, toCurrency) => {
        const rows = document.querySelectorAll('table tbody tr');
        return Array.from(rows)
          .map(row => {
            const columns = row.querySelectorAll('td');
            return {
              fromCurrency,
              toCurrency,
              date: new Date(columns[0].textContent).toISOString(),
              openPrice: parseFloat(columns[1].textContent),
              highPrice: parseFloat(columns[2].textContent),
              lowPrice: parseFloat(columns[3].textContent),
              closePrice: parseFloat(columns[4].textContent),
              rate: parseFloat(columns[4].textContent) // Using close price as rate
            };
          })
          .filter(item => !isNaN(item.rate)); // Filter out invalid rows
      }, fromCurrency, toCurrency);

      // Bulk upsert data
      if (historicalData.length > 0) {
        await ForexRate.bulkWrite(
          historicalData.map(data => ({
            updateOne: {
              filter: {
                fromCurrency: data.fromCurrency,
                toCurrency: data.toCurrency,
                date: data.date
              },
              update: data,
              upsert: true
            }
          }))
        );
      }

      return historicalData;
    } catch (error) {
      console.error('Detailed Scraping Error:', error);
      throw error;
    } finally {
      if (browser) await browser.close();
    }
  }
}

module.exports = ScraperService;
