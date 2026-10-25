# getwyntab.github.io

Official promotional website for the **WYNTab** browser extension ([getwyntab.github.io](https://getwyntab.github.io)).

Built with **Astro 5** and **Tailwind CSS v4**, structured around `/brag` narrative flow (*Hook &rarr; Reveal &rarr; Core User Flow &rarr; Sharp Highlights &rarr; Outro CTA*).

## Development

Prerequisites:
- [Bun](https://bun.sh/) (>= 1.1)

```bash
# Install dependencies
bun install

# Sync assets from sibling wyntab repo (.output/cws-assets & .output/brag-output)
bun run sync

# Start development server
bun run dev

# Build production static site
bun run build

# Preview production build
bun run preview
```

## Architecture

- Static single-page application built directly into `dist/`.
- Zero-runtime overhead; strictly static pre-rendered assets.
- Deployed automatically to GitHub Pages on pushes to `main`.

## License

Licensed under the [Apache-2.0 License](LICENSE).
