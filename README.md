# Forex Rate Tracker

## 📊 Forex Exchange Rate Scraper and Visualization Tool

### 🌟 Project Overview

This Forex Rate Tracker is a full-stack web application that scrapes real-time forex exchange rates, stores historical data, and provides an interactive visualization dashboard. The project uses Next.js, React, Puppeteer for web scraping, and MongoDB for data persistence.

### ✨ Features

- Real-time forex exchange rate scraping
- Historical rate tracking
- Interactive chart visualization
- Multiple currency pair support
- Dark/Light mode interface
- Responsive design

### 🛠 Tech Stack

- **Frontend**: 
  - Next.js
  - React
  - Chart.js
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Puppeteer (Web Scraping)
  - Mongoose (MongoDB ODM)

- **Database**:
  - MongoDB

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16+ recommended)
- npm or Yarn
- MongoDB (Local or Cloud Instance)

### 🚀 Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Anubhavgupta14/Yahoo-Scrap-Frontend.git
cd forex-rate-tracker
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/forexdb

# Backend URL
NEXT_PUBLIC_API_URL='http://localhost:3001/'

# Next.js Environment
NODE_ENV=development
```

#### 4. Database Setup

- Create a MongoDB database
- Add your connection string to `.env.local`
- Ensure proper network access and user permissions

#### 5. Running the Application

**Development Mode**:
```bash
npm run dev
# or
yarn dev
```

**Production Build**:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### 🤖 Scraping Configuration

The application uses Puppeteer to scrape forex rates. Key configurations are in `services/ScraperService.js`:

- Supports multiple time periods (1W, 1M, 3M, 6M, 1Y)
- Anti-detection mechanisms
- Configurable currency pairs

### 📈 Supported Forex Pairs

- GBP/INR
- AED/INR
- USD/EUR
- JPY/USD

*Easily extendable in the code*

### 🔒 Security Considerations

- Web scraping with randomized user agents
- Browser launch with secure configurations
- Environment-based executable path
- Data sanitization before database insertion

### 🚧 Deployment

#### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Configure Vercel settings
3. Run `vercel` in project directory

#### Key Deployment Files

- `vercel.json`: Vercel-specific configurations
- `.npmrc`: Puppeteer browser installation settings
- `next.config.js`: Next.js build configurations

### 🧪 Testing

```bash
# Coming Soon: Implement test scripts
npm test
```

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### ⚠️ Limitations & Considerations

- Scraping may be affected by website changes
- Requires constant monitoring of anti-scraping techniques
- Rate limits and potential IP blocking

### 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

### 📞 Contact

Your Name - [Your Email]

Project Link: [https://github.com/Anubhavgupta14/Yahoo-Scrap-Frontend](https://github.com/Anubhavgupta14/Yahoo-Scrap-Frontend)

### 🙏 Acknowledgements

- Next.js
- Puppeteer
- Chart.js
- Tailwind CSS
- MongoDB

---

**Disclaimer**: This project is for educational purposes. Always comply with website terms of service and legal regulations when scraping data.