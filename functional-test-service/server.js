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
  const heavyAssetWarnings = [];
  let totalNetworkBytes = 0;
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

    // NETWORK MONITORING: Heavy Asset & Size Tracker
    page.on('response', async (response) => {
      const resUrl = response.url();
      const status = response.status();
      const headers = response.headers();

      if (resUrl.startsWith('data:') || resUrl.startsWith('blob:')) return;

      const contentLengthStr = headers['content-length'];
      let sizeBytes = contentLengthStr ? parseInt(contentLengthStr, 10) : 0;
      if (isNaN(sizeBytes)) sizeBytes = 0;

      totalNetworkBytes += sizeBytes;

      const sizeKb = Math.round(sizeBytes / 1024);
      const sizeMb = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));

      // Resource type determination
      const contentType = headers['content-type'] || '';
      let resourceType = 'other';
      if (contentType.includes('image') || resUrl.match(/\.(png|jpg|jpeg|gif|webp|svg|avif)/i)) {
        resourceType = 'image';
      } else if (contentType.includes('javascript') || resUrl.match(/\.(js|mjs)/i)) {
        resourceType = 'script';
      } else if (contentType.includes('css') || resUrl.match(/\.css/i)) {
        resourceType = 'stylesheet';
      } else if (contentType.includes('font') || resUrl.match(/\.(woff2?|ttf|otf)/i)) {
        resourceType = 'font';
      }

      // Flag heavy assets
      if (
        (resourceType === 'image' && sizeKb > 800) ||
        (resourceType === 'script' && sizeKb > 400) ||
        (resourceType === 'stylesheet' && sizeKb > 150) ||
        sizeKb > 1500
      ) {
        heavyAssetWarnings.push({
          url: resUrl,
          resourceType,
          sizeMb,
          sizeKb,
          recommendation:
            resourceType === 'image'
              ? `Compress image or convert to WebP/AVIF format to save ${sizeKb} KB.`
              : resourceType === 'script'
              ? `Minify & code-split JS bundle (${sizeKb} KB).`
              : `Optimize stylesheet (${sizeKb} KB).`,
        });
      }

      // Track 404 or failed sub-resource responses
      if (resUrl.startsWith('http') && status >= 400) {
        brokenLinks.push({ url: resUrl, status, linkText: 'Sub-resource Link' });
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

    // Deep SEO DOM Scraper & Extract Anchor Links for 404 Verification
    const pageMetrics = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
      const inputs = document.querySelectorAll('input, select, textarea');

      const extractedHrefLinks = links
        .map((a) => ({
          href: a.href,
          text: (a.innerText || a.getAttribute('aria-label') || 'Link').trim().substring(0, 40),
        }))
        .filter((l) => l.href.startsWith('http'))
        .slice(0, 15);

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
        extractedHrefLinks,
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

    // ACTIVE BROKEN LINK SCANNER (Testing extracted hrefs for 404 errors)
    for (const linkItem of pageMetrics.extractedHrefLinks) {
      try {
        const linkRes = await page.goto(linkItem.href, { waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => null);
        if (linkRes && linkRes.status() >= 400) {
          brokenLinks.push({
            url: linkItem.href,
            status: linkRes.status(),
            linkText: linkItem.text,
          });
        }
      } catch {
        // Ignore link navigation errors
      }
    }

    // MULTI-DEVICE VIEWPORT & CSS OVERFLOW EMULATION ENGINE
    const viewportsToTest = [
      { deviceName: 'Mobile (iPhone 13)', width: 390, height: 844 },
      { deviceName: 'Tablet (iPad Pro)', width: 820, height: 1180 },
      { deviceName: 'Desktop (1080p)', width: 1920, height: 1080 },
    ];

    const viewportResults = [];
    let totalOverflowIssues = 0;
    let totalSmallTouchTargets = 0;
    let totalA11yViolations = 0;

    for (const vp of viewportsToTest) {
      await page.setViewport({ width: vp.width, height: vp.height });

      const vpAudit = await page.evaluate((vpWidth, vpName) => {
        const docWidth = document.documentElement.clientWidth;
        const overflowing = [];

        // 1. CSS Overflow Scraper
        document.querySelectorAll('*').forEach((el) => {
          const tag = el.tagName.toLowerCase();
          if (['script', 'style', 'head', 'meta', 'link', 'svg', 'path', 'g', 'html', 'body'].includes(tag)) return;
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.right > docWidth + 4) {
            let sel = el.id ? `#${el.id}` : (el.className && typeof el.className === 'string') ? `.${el.className.split(' ').filter(Boolean).slice(0, 2).join('.')}` : tag;
            if (!sel || sel === '.') sel = tag;
            overflowing.push({
              tagName: tag,
              selector: sel,
              overflowPx: Math.round(rect.right - docWidth),
              width: Math.round(rect.width),
              htmlSnippet: el.outerHTML.substring(0, 120),
            });
          }
        });

        // 2. Small Touch Target Audit (< 44px on Mobile/Tablet)
        const smallTouch = [];
        if (vpWidth <= 820) {
          document.querySelectorAll('button, a[href], input[type="submit"], input[type="button"], [role="button"]').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              let sel = el.id ? `#${el.id}` : (el.className && typeof el.className === 'string') ? `.${el.className.split(' ').filter(Boolean).slice(0, 2).join('.')}` : el.tagName.toLowerCase();
              smallTouch.push({
                selector: sel,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                htmlSnippet: el.outerHTML.substring(0, 100),
              });
            }
          });
        }

        // 3. Accessibility & Unlabelled Interactive Element Scan
        const a11y = [];
        document.querySelectorAll('button, a[href], input[type="submit"]').forEach((el) => {
          const text = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || el.getAttribute('value') || '').trim();
          const hasImgAlt = el.querySelector('img[alt]') !== null;
          if (!text && !hasImgAlt) {
            let sel = el.id ? `#${el.id}` : (el.className && typeof el.className === 'string') ? `.${el.className.split(' ').filter(Boolean).slice(0, 2).join('.')}` : el.tagName.toLowerCase();
            a11y.push({
              id: 'unlabelled-button',
              impact: 'critical',
              description: 'Interactive button/link is missing accessible visible label or aria-label',
              targetElements: [{ selector: sel, htmlSnippet: el.outerHTML.substring(0, 100) }],
            });
          }
        });

        const uniqueOverflowing = overflowing.slice(0, 5);
        const maxOverflowPx = uniqueOverflowing.reduce((max, el) => Math.max(max, el.overflowPx), 0);

        return {
          deviceName: vpName,
          width: vpWidth,
          height: vpWidth === 390 ? 844 : vpWidth === 820 ? 1180 : 1080,
          hasHorizontalOverflow: uniqueOverflowing.length > 0,
          maxOverflowPx,
          overflowingElements: uniqueOverflowing,
          touchTargetViolations: smallTouch.slice(0, 5),
          accessibilityViolations: a11y.slice(0, 5),
        };
      }, vp.width, vp.deviceName);

      totalOverflowIssues += vpAudit.overflowingElements.length;
      totalSmallTouchTargets += vpAudit.touchTargetViolations.length;
      totalA11yViolations += vpAudit.accessibilityViolations.length;

      viewportResults.push(vpAudit);
    }

    const loadTimeMs = Date.now() - startTime;
    await browser.close();
    browser = null;

    let overallUiScore = 100;
    if (totalOverflowIssues > 0) overallUiScore -= Math.min(30, totalOverflowIssues * 10);
    if (totalSmallTouchTargets > 0) overallUiScore -= Math.min(20, totalSmallTouchTargets * 4);
    if (totalA11yViolations > 0) overallUiScore -= Math.min(20, totalA11yViolations * 5);
    overallUiScore = Math.max(40, overallUiScore);

    const totalNetworkBytesMb = parseFloat((totalNetworkBytes / (1024 * 1024)).toFixed(2));

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
      heavyAssetWarnings: heavyAssetWarnings.slice(0, 6),
      totalNetworkBytesMb,
      uiUxTest: {
        status: 'completed',
        viewports: viewportResults,
        overallUiScore,
        totalOverflowIssues,
        totalSmallTouchTargets,
        totalA11yViolations,
      },
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
  console.log(`Puppeteer Functional, Network & UI/UX Testing Microservice running on port ${PORT}`);
});
