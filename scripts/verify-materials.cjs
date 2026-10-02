// TEST_URL and PLAYWRIGHT_MODULE follow verify-performance.cjs. APIs are mocked.
const { chromium, webkit, devices } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
const output = process.env.TEST_OUTPUT || '/tmp/tecnomarmol-materials-verification';
fs.mkdirSync(output, { recursive: true });
async function verify(engine, name, options, fallback = false) {
  const browser = await engine.launch({ headless: true });
  try {
    const page = await browser.newPage(options);
    const errors = [], missing = [], requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) missing.push(r.url()); });
    page.on('request', r => requests.push(r.url()));
    await page.route('**/api/**', r => r.fulfill({ json: { ok: true } }));
    if (fallback) await page.route('**/script.js?*', r => r.abort());
    await page.goto(base, { waitUntil: 'networkidle' });
    if (fallback) await page.waitForFunction(() => window.__TMI_INLINE_FALLBACK_READY);
    await page.locator('[data-language="es"]').click();
    await page.locator('#languageGate').waitFor({ state: 'hidden' });
    await page.locator('#materiales').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    assert.deepEqual(await page.locator('#materiales h3').allTextContents(), ['Mármol', 'Cuarzo', 'Granito']);
    assert.equal(requests.filter(url => /assets\/materials\//.test(url) && !/-card-/.test(url)).length, 0, 'Closed galleries must not fetch photos');
    await page.locator("#materiales").screenshot({ path: `${output}/${name}-cards.png` });
    for (const [category, count] of [['marble', 15], ['quartz', 10], ['granite', 20]]) {
      const trigger = page.locator(`[data-material-modal-open="#${category}Modal"]`);
      await trigger.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const scrollBefore = await page.evaluate(() => scrollY);
      await trigger.click();
      const modal = page.locator(`#${category}Modal`);
      const panel = modal.locator('.material-modal-panel');
      await page.waitForTimeout(600);
      assert.equal(await modal.getAttribute('aria-hidden'), 'false');
      assert.equal(await modal.locator('.marble-type-card').count(), count);
      assert.equal(await page.evaluate(() => document.body.classList.contains('modal-open')), true);
      assert.equal(await page.evaluate(() => getComputedStyle(document.body).position), 'fixed');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      assert.equal(await modal.evaluate(el => el.contains(document.activeElement)), true, 'Focus remains inside dialog');
      await panel.evaluate(el => { el.scrollTop = 0; });
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${output}/${name}-${category}.png` });
      // Exercise native internal scrolling and force each lazy image into view.
      for (const image of await modal.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(el => new Promise((resolve, reject) => {
          if (el.complete && el.naturalWidth) return resolve();
          const timer = setTimeout(() => reject(new Error(`Image timeout: ${el.src}, current=${el.currentSrc}, complete=${el.complete}`)), 8000);
          el.addEventListener("load", () => { clearTimeout(timer); resolve(); }, { once: true });
          el.addEventListener("error", () => reject(new Error(el.src)), { once: true });
        }));
        assert.equal(await image.evaluate(el => el.naturalWidth > 0 && getComputedStyle(el).objectFit === 'cover'), true);
      }
      assert.ok(await panel.evaluate(el => el.scrollTop > 0), 'Long catalog scrolls internally');
      await page.screenshot({ path: `${output}/${name}-${category}-showroom.png` });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'No page overflow');
      assert.equal(await panel.evaluate(el => el.scrollWidth <= el.clientWidth), true, 'No dialog overflow');
      const bounds = await panel.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= options.viewport.width + 1);
      if (category === 'marble') await page.keyboard.press('Escape');
      else if (category === 'quartz') await modal.locator('.modal-close').click();
      else await modal.locator('.material-modal-backdrop').click({ position: { x: 3, y: 3 } });
      assert.equal(await modal.getAttribute('aria-hidden'), 'true');
      assert.equal(await trigger.evaluate(el => document.activeElement === el), true, 'Focus returns to trigger');
      assert.equal(await page.evaluate(() => document.body.classList.contains('modal-open')), false);
      assert.ok(Math.abs(await page.evaluate(() => scrollY) - scrollBefore) < 3, 'Background position preserved');
      await page.waitForTimeout(500);
    }
    // Only the requested section is checked for removed-category references.
    const catalog = await page.locator('#materiales, .material-modal').evaluateAll(els => els.map(el => el.outerHTML).join(''));
    assert.doesNotMatch(catalog, /porcel|material4/i);
    assert.equal(await page.locator('#marbleModal .material-showroom img').count(), 2);
    // Reopening must reuse the existing gallery, without duplicate nodes.
    await page.locator('[data-material-modal-open="#graniteModal"]').click();
    assert.equal(await page.locator('#graniteModal .marble-type-card').count(), 20);
    await page.keyboard.press('Escape');
    if (!fallback) {
      await page.locator('[data-language-toggle]').evaluate(el => el.click());
      assert.equal(await page.locator('#materiales h3').last().textContent(), 'Granite');
      assert.equal(await page.locator('#graniteModalTitle').textContent(), 'Granite types');
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(missing, []);
    console.log(`PASS ${name}: 3 dialogs, all images, lazy loading, keyboard, scroll lock, overflow, focus restoration${fallback ? ', fallback' : ', translations'}`);
  } finally { await browser.close(); }
}
(async () => {
  await verify(chromium, 'desktop', { viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  await verify(webkit, 'tablet', { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 2, hasTouch: true });
  await verify(webkit, 'iphone', { ...devices['iPhone 13'] });
  await verify(chromium, 'fallback', { viewport: { width: 390, height: 844 }, isMobile: true }, true);
})().catch(error => { console.error(error); process.exitCode = 1; });
