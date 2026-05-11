---
title: Troubleshooting
titleTemplate: Guides
description: Having trouble with WYNTab? Find solutions to common issues here.
---

# Troubleshooting

If you're experiencing issues with WYNTab, check the common scenarios below.

## Template Issues

### My HTML isn't rendering correctly
WYNTab uses a `DOMParser` to sanitize HTML before rendering it in a sandboxed iframe. This means:
- `<script>` tags are removed.
- `<iframe>` tags are removed.
- Inline event handlers (like `onclick`) are stripped.
- External resources (images, fonts) must be allowed by the Content Security Policy.

### My CSS isn't applying
Ensure your CSS is either in a `<style>` tag within your template or linked via a standard `<link rel="stylesheet" href="...">` tag. Note that external CSS files must be accessible over HTTPS.

## Performance

### The New Tab page is slow to load
Large templates or templates fetching many external resources can slow down the loading of your New Tab page. Try to:
- Minimize the number of external network requests.
- Inline small CSS and JS (if allowed by your build process, though WYNTab strips scripts).
- Use optimized images.

## Storage

### I lost my templates
WYNTab saves templates in `chrome.storage.local`. If you clear your browser data or uninstall the extension, your templates will be lost. We highly recommend using the **Backups** feature regularly.

## Still having trouble?

If your issue isn't listed here, please [report an issue](https://github.com/getwyntab/wyntab/issues).
