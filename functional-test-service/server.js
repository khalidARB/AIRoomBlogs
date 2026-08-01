const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'functional-test-service', timestamp: new Date() });
});

app.post('/api/run-functional-test', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required.' });
  }

  let browser = null;
  const consoleErrors = [];
  const brokenLinks = [];
  let totalLinksChecked = 0;
  let statusCode = 200;

  try {
    const startTime = Date.now();

    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Monitor console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    // Monitor failed responses
    page.on('response', (response) => {
      const resUrl = response.url();
      const status = response.status();
      if (resUrl.startsWith('http') && status >= 400) {
        brokenLinks.push({ url: resUrl, status });
      }
    });

    // Navigate to target URL
    const mainResponse = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch((e) => {
      console.error('Page navigation error:', e.message);
      return null;
    });

    if (mainResponse) {
      statusCode = mainResponse.status();
    }

    const pageTitle = await page.title();

    // Count links, interactive elements & execute Deep SEO DOM Extraction
    const pageMetrics = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
      const inputs = document.querySelectorAll('input, select, textarea');

      // Deep SEO DOM Scraper
      const titleTags = Array.from(document.querySelectorAll('title'));
      const metaDescriptions = Array.from(document.querySelectorAll('meta[name="description"]'));
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      const ogTitleTag = document.querySelector('meta[property="og:title"]');
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      const ogDescTag = document.querySelector('meta[property="og:description"]');
      const robotsMetaTag = document.querySelector('meta[name="robots"]');
      const h1Tags = Array.from(document.querySelectorAll('h1'));
      const imgElements = Array.from(document.querySelectorAll('img'));

      const missingAltImages = imgElements
        .filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '')
        .map((img) => img.src || img.getAttribute('data-src') || 'image_without_src')
        .slice(0, 5);

      return {
        totalLinks: links.length,
        interactiveElements: buttons.length + inputs.length,
        deepSeoAudit: {
          titleTagsCount: titleTags.length,
          titleContent: document.title || '',
          metaDescriptionCount: metaDescriptions.length,
          metaDescriptionContent: metaDescriptions[0] ? metaDescriptions[0].getAttribute('content') || '' : '',
          canonicalUrl: canonicalTag ? canonicalTag.getAttribute('href') : null,
          hasCanonical: !!canonicalTag && !!canonicalTag.getAttribute('href'),
          ogTitle: ogTitleTag ? ogTitleTag.getAttribute('content') : null,
          ogImage: ogImageTag ? ogImageTag.getAttribute('content') : null,
          ogDescription: ogDescTag ? ogDescTag.getAttribute('content') : null,
          hasOpenGraph: !!(ogTitleTag && ogImageTag),
          h1Count: h1Tags.length,
          h1Text: h1Tags.map((h) => h.innerText.trim()).slice(0, 5),
          totalImages: imgElements.length,
          missingAltCount: imgElements.filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '').length,
          missingAltImages,
          robotsMeta: robotsMetaTag ? robotsMetaTag.getAttribute('content') : null,
        },
      };
    });

    totalLinksChecked = pageMetrics.totalLinks;
    const loadTimeMs = Date.now() - startTime;

    await browser.close();
    browser = null;

    return res.json({
      status: 'completed',
      pageTitle: pageTitle || url,
      loadTimeMs,
      statusCode,
      totalLinksChecked,
      brokenLinksCount: brokenLinks.length,
      brokenLinks: brokenLinks.slice(0, 10),
      consoleErrors: consoleErrors.slice(0, 10),
      interactiveElementsCount: pageMetrics.interactiveElements,
      deepSeoAudit: pageMetrics.deepSeoAudit,
      executionTimestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (browser) {
      await browser.close().catch(() => {});
    }
    console.error('Puppeteer execution error:', error.message);
    return res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Puppeteer Functional Testing Microservice running on port ${PORT}`);
});
