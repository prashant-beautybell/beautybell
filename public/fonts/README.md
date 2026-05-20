# BeautyBell brand fonts

Place your licensed webfont files in this folder. The site expects these filenames:

| Role | Family | Files |
|------|--------|--------|
| Logo mark **BB** | Kenao Sans Serif | `KenaoSansSerif-Regular.woff2`, `KenaoSansSerif-Regular.woff` |
| Wordmark **Beauty Bell** | Agrandir Grand | `AgrandirGrand-Regular.woff2`, `AgrandirGrand-Regular.woff` |

## Where to get the fonts

- **Kenao Sans Serif** — Ngene Studio / your brand kit (export or convert to WOFF2).
- **Agrandir Grand** — [Pangram Pangram Foundry](https://pangrampangram.com/products/agrandir-grand) (desktop license includes web use per your agreement; convert OTF to WOFF2 if needed).

## Converting to WOFF2

```bash
# Example with fonttools (pip install fonttools brotli)
pyftsubset YourFont.otf --output-file=AgrandirGrand-Regular.woff2 --flavor=woff2
```

After adding the files, restart `npm run dev` and hard-refresh the browser.
