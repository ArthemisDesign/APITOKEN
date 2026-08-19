const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('ERRORS:', errors.length ? errors.join('\n') : 'none');
  const missing = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('img').forEach(i => { if (i.naturalWidth === 0 && !i.complete) bad.push('img broken: ' + (i.src || i.alt)); });
    document.querySelectorAll('a[href="#calc"]').forEach(a => { if (!document.getElementById('calc')) bad.push('anchor missing: #calc'); });
    if (!document.getElementById('b2bForm')) bad.push('B2B form missing');
    if (!document.querySelector('.nav').innerHTML.includes('Гайды')) bad.push('nav missing Гайды');
    return bad;
  });
  console.log('MISSING:', missing.length ? missing.join('\n') : 'none');
  await browser.close();
})();
