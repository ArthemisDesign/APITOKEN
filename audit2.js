const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  const failed = await page.evaluate(() => performance.getEntriesByType('resource').filter(r => r.responseStatus >= 400).map(r => r.responseStatus + ' ' + r.name));
  console.log('FAILED RESOURCES:');
  console.log(failed.join('\n') || 'none');
  await browser.close();
})();
