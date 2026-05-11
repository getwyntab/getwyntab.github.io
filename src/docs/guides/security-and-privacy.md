# Security & Privacy

WYNTab is designed with security and privacy as core principles. Since the extension allows for custom HTML rendering, we employ several layers of protection.

## Sandboxed Rendering

All templates are rendered inside a sandboxed `iframe` using the `srcDoc` attribute. This ensures that the custom HTML has limited access to your browser and cannot interfere with the extension's core functionality or your other tabs.

## HTML Sanitization

When you upload or save a custom template, WYNTab runs it through a robust sanitization engine. This engine automatically removes potentially dangerous elements and attributes, including:

*   `<script>` tags
*   `<iframe>` tags
*   `<object>` and `<embed>` tags
*   `on*` attributes (e.g., `onclick`, `onload`)
*   `javascript:` links

This is required for compliance with browser extension security policies (Content Security Policy) and ensures your safety.

## Privacy First

WYNTab does not collect any user data. All your templates, settings, and configurations are stored locally in your browser's storage. We do not use any external trackers or analytics.
