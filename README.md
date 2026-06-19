# Cruella — Vintage shop (multi-page catalogue)

Static site, no build step. Clean editorial look (inspired by cocaletto.de).

## Files
- `index.html`   → Home (editorial)
- `shop.html`    → Catalogue (filters + product grid + quick view)
- `about.html`   → Story
- `contact.html` → Contact
- `produtos.js`  → **THE ONLY FILE YOU EDIT for inventory** (products + reviews)
- `styles.css` / `app.js` → shared design + logic (rarely touched)
- `fotos/`       → all images (and `fotos/reviews/` for review screenshots)

## Deploy on Vercel (one time)
1. Put the whole folder in a GitHub repo (all files + the `fotos/` folder).
2. vercel.com → Add New Project → import the repo.
3. Framework preset: **Other**. No build command, no output dir. Deploy.
   Every push to GitHub republishes automatically.

## Add / remove a product (daily workflow)
Open **`produtos.js`** (everything is marked in there).

- **Add:** copy a `{ ... }` block inside `ARTIGOS`, edit the fields.
- **Photos:** drop the files into `fotos/` on GitHub, then point `photos: [...]`
  at them. One or more per item. Changes show on Home *and* Shop automatically.
- **Remove:** delete the `{ ... }` block.
- **Mark as sold:** `sold: false` → `sold: true`.

### Field rules
- `category`: `"footwear"` or `"clothing"`
- `subcategory` (footwear): Boots · Heels · Kitten Heels · Ballet Flats · Mules · Platforms · Loafers · Sandals · Sneakers
- `subcategory` (clothing): Jackets & Coats · Tops · Dresses · Skirts · Trousers · Denim
- `brand`: Miu Miu · Prada · Gucci · Diesel · Miss Sixty · Vintage under €30
- `price`: number in euros, e.g. `95` → shown as €95

(To add a whole new category or brand, edit the `CATEGORIES` / `BRANDS` lists at the top of `app.js`.)

## Reviews (look like real people)
Also in `produtos.js`, in the `REVIEWS` list. Two options, mix freely:
1. **Card** (mimics a real Vinted/Instagram review): `name`, `handle`, `source`
   ("Vinted"/"Instagram"), `stars`, `date`, `text`. Optional `avatar` photo.
2. **Real screenshot** (most authentic): `{ image: "fotos/reviews/print1.png" }`
   — just drop the screenshot in `fotos/reviews/` and point to it.

## Notes
- The 6 demo products use your photos. Brands/prices are placeholders — edit them.
- Instagram / Vinted / email links are placeholders: search the files for
  `instagram.com`, `vinted.com`, `hello@cruella.example` and replace.
- The announcement bar text ("Curated vintage · Shipped across Europe") is at the
  top of each HTML page if you want to change it.
- To swap the homepage hero image, change `fotos/aesthetic_shoes.jpg` in `index.html`.
- Stripe / online checkout can be added later; structure is ready.
