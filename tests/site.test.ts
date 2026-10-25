import { describe, test, expect } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../src/config/site';

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');

describe('Site Configuration (src/config/site.ts)', () => {
  test('version is a valid semver string', () => {
    expect(siteConfig.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('contains 5 verified template showcases', () => {
    expect(siteConfig.templates).toHaveLength(5);
    const expectedIds = ['atmosphere', 'terminal', 'links', 'editor', 'dashboard'];
    expect(siteConfig.templates.map((t) => t.id)).toEqual(expectedIds);

    for (const tmpl of siteConfig.templates) {
      expect(tmpl.name.length).toBeGreaterThan(0);
      expect(tmpl.tagline.length).toBeGreaterThan(0);
      expect(tmpl.alt.length).toBeGreaterThan(0);
      expect(tmpl.image).toMatch(/^\/screenshots\//);

      // Verify screenshot file exists on disk
      const assetPath = path.join(publicDir, tmpl.image.replace(/^\//, ''));
      expect(fs.existsSync(assetPath)).toBe(true);
      const stat = fs.statSync(assetPath);
      expect(stat.isFile()).toBe(true);
      expect(stat.size).toBeGreaterThan(1000);
    }
  });

  test('contains 6 technical features', () => {
    expect(siteConfig.features).toHaveLength(6);
    const expectedIds = ['codemirror', 'react', 'sandbox', 'storage', 'prerender', 'offline'];
    expect(siteConfig.features.map((f) => f.id)).toEqual(expectedIds);

    for (const feat of siteConfig.features) {
      expect(feat.title.length).toBeGreaterThan(0);
      expect(feat.description.length).toBeGreaterThan(0);
      expect(feat.icon.length).toBeGreaterThan(0);
    }
  });

  test('contains valid URLs for store and GitHub', () => {
    expect(siteConfig.cwsUrl).toMatch(/^https:\/\/chromewebstore\.google\.com\//);
    expect(siteConfig.githubUrl).toMatch(/^https:\/\/github\.com\//);
    expect(siteConfig.siteUrl).toBe('https://getwyntab.github.io');
  });

  test('aiPrompt contains mandatory WYNTab specifications', () => {
    expect(siteConfig.aiPrompt).toContain('100vw by 100vh');
    expect(siteConfig.aiPrompt).toContain('cdn.tailwindcss.com');
    expect(siteConfig.aiPrompt).toContain('esm.sh');
    expect(siteConfig.aiPrompt).toContain('window.wyntab.set');
    expect(siteConfig.aiPrompt).toContain('window.wyntab.get');
    expect(siteConfig.aiPrompt).toContain('window.wyntab.remove');
  });
});

describe('Public Assets & SEO Assets', () => {
  test('favicon.png exists and is non-empty', () => {
    const faviconPath = path.join(publicDir, 'favicon.png');
    expect(fs.existsSync(faviconPath)).toBe(true);
    expect(fs.statSync(faviconPath).size).toBeGreaterThan(500);
  });

  test('robots.txt allows all and links to sitemap', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');
    expect(fs.existsSync(robotsPath)).toBe(true);
    const content = fs.readFileSync(robotsPath, 'utf8');
    expect(content).toContain('User-agent: *');
    expect(content).toContain('Allow: /');
    expect(content).toContain('Sitemap: https://getwyntab.github.io/sitemap.xml');
  });

  test('sitemap.xml contains valid XML with home and privacy routes', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const content = fs.readFileSync(sitemapPath, 'utf8');
    expect(content).toContain('<loc>https://getwyntab.github.io/</loc>');
    expect(content).toContain('<loc>https://getwyntab.github.io/privacy/</loc>');
  });

  test('marquee promo tile and small tile exist', () => {
    const marqueePath = path.join(publicDir, 'screenshots', 'marquee-promo-tile-1400x560.png');
    const smallTilePath = path.join(publicDir, 'screenshots', 'small-promo-tile-440x280.png');
    expect(fs.existsSync(marqueePath)).toBe(true);
    expect(fs.existsSync(smallTilePath)).toBe(true);
  });

  test('brag launch video and poster exist', () => {
    const videoPath = path.join(publicDir, 'media', 'brag.mp4');
    const posterPath = path.join(publicDir, 'media', 'brag.jpg');
    expect(fs.existsSync(videoPath)).toBe(true);
    expect(fs.existsSync(posterPath)).toBe(true);
    expect(fs.statSync(videoPath).size).toBeGreaterThan(100000); // >100KB
    expect(fs.statSync(posterPath).size).toBeGreaterThan(10000);  // >10KB
  });
});

describe('Static Build Output (dist/)', () => {
  test('dist/index.html exists and contains valid structure', () => {
    const indexPath = path.join(distDir, 'index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
    const html = fs.readFileSync(indexPath, 'utf8');

    // Canonical link
    expect(html).toContain('<link rel="canonical" href="https://getwyntab.github.io/">');

    // OpenGraph & Twitter
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');

    // JSON-LD Structured Data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    expect(jsonLdMatch).not.toBeNull();
    const jsonLd = JSON.parse(jsonLdMatch![1]);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('SoftwareApplication');
    expect(jsonLd.name).toBe('WYNTab');
    expect(jsonLd.applicationCategory).toBe('BrowserApplication');
    expect(jsonLd.offers.price).toBe('0');

    // Video hero frame (16:9 aspect ratio matching 1080p brag.mp4)
    expect(html).toContain('src="/media/brag.mp4"');
    expect(html).toContain('poster="/media/brag.jpg"');
    expect(html).toContain('aspect-video');

    // Template gallery tabs and panels (16:10 aspect ratio matching 1280x800 CWS screenshots)
    expect(html).toContain('aspect-[16/10]');
    for (const tmpl of siteConfig.templates) {
      expect(html).toContain(`id="tab-${tmpl.id}"`);
      expect(html).toContain(`id="panel-${tmpl.id}"`);
    }

    // Features
    for (const feat of siteConfig.features) {
      const htmlTitle = feat.title.replace(/&/g, '&amp;');
      expect(html).toContain(htmlTitle);
    }

    // AI Prompt Copy
    expect(html).toContain('id="copy-prompt-btn"');
    expect(html).toContain('id="ai-prompt-content"');
    expect(html).toContain('terminal-scrollbar');

    // Browser compatibility
    expect(html).toContain('Google Chrome');
    expect(html).toContain('Brave Browser');
    expect(html).toContain('Microsoft Edge');
    expect(html).toContain('Opera');
    expect(html).toContain('Vivaldi');
  });

  test('dist/privacy/index.html exists and contains valid privacy disclosure', () => {
    const privacyPath = path.join(distDir, 'privacy', 'index.html');
    expect(fs.existsSync(privacyPath)).toBe(true);
    const html = fs.readFileSync(privacyPath, 'utf8');

    // Canonical link with trailing slash
    expect(html).toContain('<link rel="canonical" href="https://getwyntab.github.io/privacy/">');

    // Back link
    expect(html).toContain('href="/"');

    // Privacy content
    expect(html).toContain('Chrome Web Store Privacy Disclosure');
    expect(html).toContain('Zero Analytics');
    expect(html).toContain('100% Local Storage');
    expect(html).toContain('No Cloud Sync');
    expect(html).toContain('chrome.storage.local');
    expect(html).toContain('Apache-2.0');
  });

  test('template tabs have proper WAI-ARIA tabindex and aria-selected states', () => {
    const indexPath = path.join(distDir, 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');

    // First tab (Atmosphere) is selected with tabindex 0
    expect(html).toContain('id="tab-atmosphere" aria-selected="true" aria-controls="panel-atmosphere" tabindex="0"');

    // Other tabs are unselected with tabindex -1
    expect(html).toContain('id="tab-terminal" aria-selected="false" aria-controls="panel-terminal" tabindex="-1"');
    expect(html).toContain('id="tab-links" aria-selected="false" aria-controls="panel-links" tabindex="-1"');
    expect(html).toContain('id="tab-editor" aria-selected="false" aria-controls="panel-editor" tabindex="-1"');
    expect(html).toContain('id="tab-dashboard" aria-selected="false" aria-controls="panel-dashboard" tabindex="-1"');

    // Video has cursor-pointer class and playsinline
    expect(html).toContain('class="w-full h-full object-contain cursor-pointer"');
    expect(html).toContain('playsinline');

    // Social image alt tags
    expect(html).toContain('property="og:image:alt" content="WYNTab — Write Your NewTab"');
    expect(html).toContain('name="twitter:image:alt" content="WYNTab — Write Your NewTab"');
  });
});

describe('Asset Sync Pipeline (scripts/sync-assets.mjs)', () => {
  test('runs successfully and syncs assets', () => {
    const proc = Bun.spawnSync(['bun', 'scripts/sync-assets.mjs'], {
      cwd: rootDir,
      stdout: 'pipe',
      stderr: 'pipe',
    });

    expect(proc.exitCode).toBe(0);
    const stdout = proc.stdout.toString();
    expect(stdout).toContain('[sync-assets]');
    expect(stdout).toContain('Asset sync completed successfully.');
  });
});

