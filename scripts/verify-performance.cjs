// Run against a local static server. API requests are mocked; no real quote is sent.
const { chromium, webkit, devices } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
const output = process.env.TEST_OUTPUT || '/tmp/tecnomarmol-verification';
fs.mkdirSync(output, { recursive: true });
const results = [];
async function run(engine, name, options) {
  const browser = await engine.launch({ headless: true });
  try {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const errors = [], failures = [], videosRequested = [];
    let quotes = 0;
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) failures.push(response.url()); });
    page.on('request', request => { if (/\.mp4(?:\?|$)/.test(request.url())) videosRequested.push(request.url()); });
    await page.route('**/api/**', async route => {
      if (route.request().url().endsWith('/quote')) {
        assert.match(route.request().headers()['content-type'], /multipart\/form-data/);
        quotes++;
      }
      await route.fulfill({ json: { ok: true } });
    });
    await page.addInitScript(() => {
      window.__frames = 0;
      const raf = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = callback => raf(time => { window.__frames++; callback(time); });
      window.__layoutShifts = 0;
      try { new PerformanceObserver(list => list.getEntries().forEach(e => {
        if (!e.hadRecentInput) window.__layoutShifts += e.value;
      })).observe({ type: 'layout-shift', buffered: true }); } catch {}
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.evaluate(() => window.__TMI_SCRIPT_READY), true);
    assert.equal(await page.evaluate(() => window.__TMI_INLINE_VERSION), undefined);
    assert.equal(videosRequested.length, 0, 'No video is downloaded behind the language gate');
    await page.locator('[data-language="es"]').click();
    await page.locator('#languageGate').waitFor({ state: 'hidden' });
    await page.waitForTimeout(650);
    assert.equal(videosRequested.length, 0, 'No offscreen video download at the hero');
    const initial = await page.evaluate(() => ({
      bytes: performance.getEntriesByType('resource').reduce((sum, r) => sum + r.transferSize, 0),
      layoutShift: window.__layoutShifts,
      images: [...document.images].filter(i => i.complete && i.currentSrc && !i.naturalWidth).map(i => i.src),
    }));
    assert.deepEqual(initial.images, []);
    await page.screenshot({ path: `${output}/${name}-hero.png` });
    // Layout checks across narrow iPhones, tablet and desktop widths.
    const widths = options.isMobile ? [320, 375, 390, 430, 768] : [820, 1024, 1280, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 844 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow at ${width}px`);
    }
    await page.setViewportSize(options.viewport || { width: 1440, height: 900 });
    if (options.isMobile) {
      await page.locator('.nav-toggle').click();
      await page.locator('#navMenu').waitFor({ state: 'visible' });
      await page.locator('[data-language-toggle]').click();
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      await page.locator('[data-language-toggle]').click();
      await page.locator('#navMenu a[href="#materiales"]').click();
      assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'false');
    }
    await page.locator('[data-material-modal-open="#marbleModal"]').click();
    await page.locator('#marbleModal.is-open').waitFor();
    assert.equal(await page.locator('#marbleModal .marble-type-card').count(), 15);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('#marbleModal')).opacity === '1');
    await page.screenshot({ path: `${output}/${name}-materials.png` });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#marbleModal').getAttribute('aria-hidden'), 'true');
    await page.locator('[data-material-modal-open="#quartzModal"]').click();
    await page.locator('#quartzModal.is-open').waitFor();
    assert.equal(await page.locator('#quartzModal .marble-type-card').count(), 10);
    await page.keyboard.press('Escape');
    await page.locator('[data-video-rotator]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const v = document.querySelector('.workshop-video.is-active');
      return v.currentSrc && !v.paused && v.readyState >= 2;
    });
    // Exercise pagehide/pageshow (including restoration) without leaving the local page.
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
    await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => v.paused));
    await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    await page.waitForFunction(() => !document.querySelector('.workshop-video.is-active').paused);
    await page.locator('.workshop-video-dots button').nth(2).click();
    await page.waitForFunction(() => !document.querySelectorAll('.workshop-video')[2].paused);
    assert.equal(await page.locator('.workshop-video-dots button').nth(2).getAttribute('aria-pressed'), 'true');
    await page.locator('.workshop-video.is-active').click({ position: { x: 60, y: 60 } });
    await page.locator('[data-video-lightbox].is-open').waitFor();
    await page.waitForFunction(() => [...document.querySelectorAll('.workshop-video')].every(v => v.paused));
    await page.keyboard.press('Escape');
    await page.locator('[data-project-slideshow]').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-project-image]').naturalWidth > 0);
    await page.locator('[data-project-dot]').nth(1).click();
    await page.waitForFunction(() => !document.querySelector('[data-project-slide].is-active video').paused);
    await page.locator('[data-project-expand]').click();
    await page.locator('[data-project-lightbox].is-open').waitFor();
    await page.waitForFunction(() => [...document.querySelectorAll('[data-project-video]')].every(v => v.paused));
    await page.locator('[data-project-lightbox-next]').click();
    await page.waitForFunction(() => document.querySelector('[data-project-lightbox-image]').naturalWidth > 0);
    await page.keyboard.press('Escape');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => v.paused));
    const before = await page.locator('[data-project-current]').textContent();
    await page.waitForTimeout(8000);
    assert.equal(await page.locator('[data-project-current]').textContent(), before, 'Reduced motion disables automatic slide changes');
    await page.locator('[data-project-next]').click();
    assert.notEqual(await page.locator('[data-project-current]').textContent(), before, 'Manual navigation remains available');
    await page.locator('#cotizacion-panel').scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(400);
    const frames = await page.evaluate(() => window.__frames);
    await page.waitForTimeout(1100);
    assert.equal(await page.evaluate(() => window.__frames), frames, 'No continuous JS animation frames away from hero');
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('video')].every(v => v.paused)), true);
    // Exercise form validation + mocked multipart submission, including an attachment.
    await page.locator('[data-quote-form] [name="name"]').fill('Prueba local');
    await page.locator('[data-quote-form] [name="email"]').fill('local@example.com');
    await page.locator('[data-quote-form] [name="phone"]').fill('7875550100');
    await page.locator('[data-quote-form] select').selectOption({ index: 1 });
    await page.locator('[data-quote-form] textarea').fill('Prueba local de rendimiento sin envío real.');
    await page.locator('[data-file-picker]').setInputFiles({ name: 'plano.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF') });
    await page.locator('.form-submit').click();
    await page.waitForFunction(() => document.querySelector('[data-form-status]').dataset.status === 'success');
    assert.equal(quotes, 1);
    await page.screenshot({ path: `${output}/${name}-form.png` });
    assert.deepEqual(errors, [], 'No runtime exceptions');
    assert.deepEqual(failures, [], 'No failed local assets');
    results.push({ name, initial, widths, checks: 'media lifecycle, dialogs, both languages, manual slides, reduced motion, offscreen RAF, multipart quote (mock)', errors, failures });
    console.log(`PASS ${name}`, JSON.stringify(initial));
    // Reduced motion from first paint, plus explicit video playback still available.
    const reduced = await context.newPage();
    await reduced.route('**/api/**', route => route.fulfill({ json: { ok: true } }));
    await reduced.emulateMedia({ reducedMotion: 'reduce' });
    await reduced.goto(base, { waitUntil: 'networkidle' });
    await reduced.locator('[data-language="es"]').click();
    await reduced.locator('[data-video-rotator]').scrollIntoViewIfNeeded();
    await reduced.waitForTimeout(500);
    assert.equal(await reduced.evaluate(() => [...document.querySelectorAll('video')].every(v => v.paused && !v.getAttribute('src'))), true);
    await reduced.locator('.workshop-video-dots button').nth(1).click();
    await reduced.waitForFunction(() => !document.querySelectorAll('.workshop-video')[1].paused);
    await reduced.close();
    // The on-demand emergency script still unlocks the page if the main script fails.
    const fallback = await context.newPage();
    await fallback.route('**/script.js?*', route => route.abort());
    await fallback.goto(base, { waitUntil: 'domcontentloaded' });
    await fallback.waitForFunction(() => window.__TMI_INLINE_FALLBACK_READY);
    await fallback.locator('[data-language="en"]').click();
    assert.equal(await fallback.locator('html').getAttribute('lang'), 'en');
    assert.equal(await fallback.locator('body').evaluate(body => body.classList.contains('language-pending')), false);
    await fallback.close();
    console.log(`PASS ${name} reduced first paint, manual playback, fallback`);
  } finally { await browser.close(); }
}
(async () => {
  await run(chromium, 'desktop-chromium', { viewport: { width: 1440, height: 900 } });
  await run(webkit, 'iphone-webkit', { ...devices['iPhone 13'] });
  fs.writeFileSync(`${output}/results.json`, JSON.stringify(results, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
