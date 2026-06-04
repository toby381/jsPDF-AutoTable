# PLM Techpack PDF

A self-contained browser module that generates multi-section Techpack PDFs for the PLM project. Built on [jsPDF](https://github.com/parallax/jsPDF) and [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable).

> **Note:** This repository started as a fork of jsPDF-AutoTable. The original library source has been removed. The library itself is vendored in `vendor/` and consumed as-is — do not modify those files.

---

## Running locally

No build step. Serve the repo root as static files:

```bash
npx serve . --listen 9000
# or
npm start
```

Open `http://localhost:9000`. The sidebar lets you preview each section individually. "Full Preview" generates all sections into one PDF in the viewer. "Download PDF" downloads the full document.

---

## Folder structure

```
├── index.html                  ← Single-page viewer app
├── package.json
├── vendor/                     ← Vendored third-party libs (do not modify)
│   ├── jspdf.umd.js
│   ├── jspdf.plugin.autotable.js
│   ├── pure-min.css
│   └── grids-responsive-min.css
└── lib/                        ← All custom application code
    ├── techpack.js             ← Public API — generateAll() / generateSection()
    ├── imageLoader.js          ← Pre-loads all images before rendering
    ├── data/
    │   └── sampleData.js       ← Sample data + PLM API contract (see below)
    ├── assets/
    │   ├── fonts/pdfFont.js    ← DIN font family embedded as base64
    │   └── img/                ← Sample product images
    ├── helpers/                ← Shared rendering utilities
    │   ├── images.js           ← getDataUri() — URL → base64
    │   ├── fonts.js            ← addFontPack() — register DIN fonts into doc
    │   ├── borders.js          ← cellBorderLeft/Top/Right() for table hooks
    │   ├── pageHeader.js       ← addPageHeader() / addPageNumber()
    │   └── illustrations.js    ← makeIllustrationPage() / addIllustrationGrid()
    └── sections/               ← One file per PDF section
        ├── frontPage.js
        ├── mainIllustration.js
        ├── variantIllustration.js
        ├── tableOfContent.js
        ├── bomTable.js
        ├── colorMatrix.js
        └── drawings.js
```

---

## How it works

### Data flow

```
techpackData (from sampleData.js or PLM API)
    ↓
preloadImages(data)          — fetches all imagePath URLs in parallel
    ↓                          returns resolved img objects { base64, width, height }
techpack.generateAll(data)
  or
techpack.generateSection(name, data)
    ↓
  createDoc()                — new jsPDF landscape A4, fonts loaded
  withHeader()               — merges shared header into each section's data
  sectionXxx(doc, data)      — section renders synchronously onto doc
    ↓
  doc.putTotalPages()        — resolves page-count placeholders
    ↓
  jsPDF doc instance         — caller calls .save() or .output('datauristring')
```

### Script load order

The helpers and sections are plain scripts that expose global functions. The load order in `index.html` is the dependency chain — do not reorder:

```
pdfFont.js          (globals: light, normal, bold, smallcaps, LOGO_SMALL)
    ↓
helpers/images.js   (getDataUri)
helpers/fonts.js    (addFontPack)       — depends on pdfFont.js globals
helpers/borders.js  (cellBorderLeft/Top/Right)
helpers/pageHeader.js (addPageHeader, addPageNumber, PAGE_MARGIN, TOTAL_PAGES_EXP)
helpers/illustrations.js (makeIllustrationPage, addIllustrationGrid)
    ↓
sections/*.js       — depend on all helpers above
    ↓
data/sampleData.js  (TECHPACK_SAMPLE_DATA)
imageLoader.js      (preloadImages)     — depends on getDataUri
techpack.js         (techpack)          — depends on everything above
```

---

## Connecting to the PLM API

In `index.html`, replace the sample data assignment with a fetch:

```js
// Current (sample data):
var techpackData = TECHPACK_SAMPLE_DATA

// PLM API:
var techpackData = {}
fetch('/api/techpack/' + productId, {
  headers: { 'Authorization': 'Bearer ' + token }
})
  .then(function (r) { return r.json() })
  .then(function (data) {
    techpackData = data
    previewSection()   // re-render with real data
  })
```

### API response shape

The API response must match the shape defined in `lib/data/sampleData.js`. That file is the authoritative schema — read the comments there for field-by-field documentation.

Key points:

- **Images must be URL strings** in `imagePath` fields — `imageLoader.js` fetches and converts them to base64 before rendering. They can be absolute URLs, relative paths, or data URIs.
- **The shared `header` object** (`season`, `sku`, `productName`, `date`) is printed on every page of every section. All other section keys are optional — omitting one means that section renders with no data.
- **Drawings cells** use `imagePath` strings; the pre-loader handles fetching. Each cell also needs `span`, `id`, and optionally `title`.

### Image loading and CORS

`imageLoader.js` uses a canvas to convert images to base64. If images are served from a different origin than the page, the image server must send appropriate `Access-Control-Allow-Origin` headers. The loader sets `crossOrigin = 'anonymous'` on each image request.

---

## Adding a new section

Follow these five steps:

**1. Create the section file** — `lib/sections/mySection.js`

```js
function sectionMySection(doc, data) {
  // data.header is always present (merged by techpack.js)
  // data contains whatever fields you define in sampleData.js
  doc.setFont('DINNormal')
  doc.text('My section content', PAGE_MARGIN.left, 30)
  addPageHeader(doc, data.header)
}
```

**2. Register it in `lib/techpack.js`**

```js
// Add to SECTION_ORDER at the position it should appear in the full PDF:
var SECTION_ORDER = [
  ...
  'mySection',
]

// Add to SECTION_GENERATORS:
var SECTION_GENERATORS = {
  ...
  mySection: sectionMySection,
}
```

**3. Add a menu item in `index.html`**

```html
<li><a href="#mySection">My Section</a></li>
```

**4. Add a sub-bar label in `index.html`**

```js
var SECTION_LABELS = {
  ...
  mySection: 'My Section',
}
```

**5. Add the data key in `lib/data/sampleData.js`**

```js
var TECHPACK_SAMPLE_DATA = {
  ...
  mySection: {
    // fields your section function expects
  }
}
```

**6. Load the script in `index.html`** (before `techpack.js`):

```html
<script src="lib/sections/mySection.js"></script>
```

---

## Public API

Both functions are on the global `techpack` object (defined in `lib/techpack.js`).

### `techpack.generateAll(data)` → `Promise<jsPDF>`

Generates a single PDF containing all sections in the order defined by `SECTION_ORDER`. Pre-loads all images before rendering begins.

```js
var doc = await techpack.generateAll(techpackData)
doc.save('techpack.pdf')                          // download
doc.output('datauristring')                       // base64 for <object> preview
```

### `techpack.generateSection(name, data)` → `Promise<jsPDF>`

Generates a PDF containing only one named section. Used for the sidebar preview.

```js
var doc = await techpack.generateSection('BOMTable', techpackData)
document.getElementById('output').data = doc.output('datauristring')
```

`name` must be one of: `frontPage`, `mainIllustration`, `variantIllustration`, `tableOfContent`, `BOMTable`, `colorMatrix`, `drawings`.

---

## Known limitations and TODOs

| Item | Detail |
|---|---|
| Variant images | All color variants currently share one `imagePath`. In PLM, each variant should have its own image URL. The data shape already supports this — `variantIllustration.js` needs updating to iterate per-variant image. |
| Color Matrix | Fully data-driven and renders correctly. The sample data has 7 rows. PLM API should return real color/size combinations. |
| Image load errors | If an `imagePath` URL fails to load, `preloadImages()` will throw and PDF generation will not start. Add a `.catch()` around the `generateAll`/`generateSection` calls in production. |
| `cellBorderRight()` | Defined in `helpers/borders.js` but not currently used by any section. Available if needed. |
| Page header values | `season`, `sku`, `productName`, `date` are hardcoded in `sampleData.js`. In PLM these should come from the product record in the API response. |
| Font licensing | The DIN font family embedded in `lib/assets/fonts/pdfFont.js` must be licensed for use in generated PDFs. Confirm with the brand/legal team before production use. |

---

## Dependencies

| Library | Version | Purpose |
|---|---|---|
| jsPDF | 2.5.x | PDF document generation |
| jsPDF-AutoTable | 3.8.x | Table rendering plugin for jsPDF |
| Pure CSS | — | Minimal CSS for the viewer UI layout |

All three are vendored in `vendor/` — no `npm install` required to run the viewer.
