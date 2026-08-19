const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'preview-desktop.png', fullPage: true });
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({ path: 'preview-tablet.png', fullPage: true });
  await page.setViewport({ width: 375, height: 812 });
  await page.screenshot({ path: 'preview-mobile.png', fullPage: true });
  await browser.close();
})();
