# Storage FAQ

## Where is my data stored?

WYNTab uses `chrome.storage.local` to store your custom templates and settings. This data resides physically on your device and is managed by your browser.

## Is there a limit to how many templates I can have?

WYNTab requests the `unlimitedStorage` permission, which means there is no hard cap on the number or size of templates, beyond the available disk space on your computer.

## Do I need an account?

No. WYNTab does not have a server-side component. Everything is local to your browser.

## What happens if I uninstall WYNTab?

If you uninstall the extension, all locally stored templates will be removed by the browser. We strongly recommend [exporting a backup](../guides/backups) before uninstalling.
