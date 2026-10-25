import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const wyntabRoot = path.resolve(projectRoot, '../wyntab');

console.log('[sync-assets] Checking for sibling wyntab repo at:', wyntabRoot);

if (!fs.existsSync(wyntabRoot)) {
  console.warn(`[sync-assets] Sibling wyntab repo not found at ${wyntabRoot}. Skipping sync (using committed assets).`);
  process.exit(0);
}

// 1. Sync version from wyntab/package.json to src/config/site.ts
const wyntabPkgPath = path.join(wyntabRoot, 'package.json');
if (fs.existsSync(wyntabPkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(wyntabPkgPath, 'utf8'));
    if (typeof pkg.version === 'string' && /^\d+\.\d+\.\d+/.test(pkg.version)) {
      console.log(`[sync-assets] Found WYNTab version: ${pkg.version}`);
      const siteConfigPath = path.join(projectRoot, 'src', 'config', 'site.ts');
      if (fs.existsSync(siteConfigPath)) {
        let content = fs.readFileSync(siteConfigPath, 'utf8');
        content = content.replace(/version:\s*['"][^'"]+['"]/, `version: '${pkg.version}'`);
        fs.writeFileSync(siteConfigPath, content, 'utf8');
        console.log(`[sync-assets] Updated src/config/site.ts version to ${pkg.version}`);
      }
    } else {
      console.warn(`[sync-assets] Invalid semver in wyntab/package.json: ${pkg.version}`);
    }
  } catch (err) {
    console.warn('[sync-assets] Could not parse wyntab/package.json:', err.message);
  }
}

// 2. Prepare destination folders in public/
const publicDir = path.join(projectRoot, 'public');
const screenshotsDir = path.join(publicDir, 'screenshots');
const mediaDir = path.join(publicDir, 'media');

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });

// 3. Sync CWS Assets
const cwsAssetsDir = path.join(wyntabRoot, '.output', 'cws-assets');
const validImageExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

if (fs.existsSync(cwsAssetsDir)) {
  const entries = fs.readdirSync(cwsAssetsDir);
  let copiedCount = 0;
  for (const entry of entries) {
    const srcFile = path.join(cwsAssetsDir, entry);
    if (!fs.statSync(srcFile).isFile()) continue;
    const ext = path.extname(entry).toLowerCase();
    if (!validImageExts.has(ext)) continue;

    const destFile = path.join(screenshotsDir, entry);
    fs.copyFileSync(srcFile, destFile);
    copiedCount++;
    console.log(`  -> Copied to public/screenshots/${entry}`);
  }
  console.log(`[sync-assets] Successfully copied ${copiedCount} assets from ${cwsAssetsDir}`);

  // Also copy store-icon-128x128.png to public/favicon.png
  const storeIconSrc = path.join(cwsAssetsDir, 'store-icon-128x128.png');
  if (fs.existsSync(storeIconSrc) && fs.statSync(storeIconSrc).isFile()) {
    fs.copyFileSync(storeIconSrc, path.join(publicDir, 'favicon.png'));
    console.log(`  -> Copied store-icon-128x128.png to public/favicon.png`);
  }
} else {
  console.warn(`[sync-assets] CWS assets directory not found at ${cwsAssetsDir}`);
}

// 4. Sync Brag Output
const bragOutputDir = path.join(wyntabRoot, '.output', 'brag-output');
if (fs.existsSync(bragOutputDir)) {
  const bragFiles = ['brag.mp4', 'brag.jpg'];
  for (const file of bragFiles) {
    const srcFile = path.join(bragOutputDir, file);
    if (fs.existsSync(srcFile) && fs.statSync(srcFile).isFile()) {
      const destFile = path.join(mediaDir, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`  -> Copied to public/media/${file}`);
    }
  }
} else {
  console.warn(`[sync-assets] Brag output directory not found at ${bragOutputDir}`);
}

console.log('[sync-assets] Asset sync completed successfully.');
