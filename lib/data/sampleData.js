/**
 * TECHPACK_SAMPLE_DATA
 * --------------------
 * Single source of truth for all Techpack PDF content.
 *
 * This object represents the contract that the PLM API response must match.
 * When connecting to the API, replace the loadData() function in index.html.
 * The response shape must stay the same so sections render without code changes.
 *
 * Images are referenced as path strings (imagePath).
 * They are resolved to base64 by imageLoader.js before PDF generation begins,
 * so all sections receive pre-loaded img objects and never do async work themselves.
 */
var TECHPACK_SAMPLE_DATA = {

  /**
   * Shared page header — printed on every page of every section.
   */
  header: {
    season:      'SS2425',
    sku:         '100120',
    productName: 'lofoten Gore-tex Pro Plus Jacket Ms',
    date:        '031220'
  },

  /**
   * Front Page
   */
  frontPage: {
    title: 'Tech Pack'
  },

  /**
   * Main Illustration
   */
  mainIllustration: {
    brandLine:   'Norrøna Tech Pack — SS2425',
    productName: "1001-20 lofoten Gore-tex Pro Plus Jacket M's",
    imagePath:   'lib/assets/img/mainPackShot.png'
  },

  /**
   * Variant Illustrations
   * In PLM each variant will have its own imagePath from the API.
   */
  variantIllustration: {
    sectionTitle: 'Style and Color Overview',
    imagePath:    'lib/assets/img/colorPackShot.png',
    variants: [
      { sku: '1001-21', colorName: 'Olive Night',    colorCode: '#2d3a2e', sizes: 'XS–XXL', note: 'Carry over'   },
      { sku: '1001-22', colorName: 'Castor Grey',    colorCode: '#7a7d75', sizes: 'XS–XXL', note: 'New color'    },
      { sku: '1001-23', colorName: 'Crimson',        colorCode: '#9b2335', sizes: 'S–XL',   note: 'New color'    },
      { sku: '1001-24', colorName: 'Indigo Night',   colorCode: '#1a1a2e', sizes: 'XS–XXL', note: 'Carry over'   },
      { sku: '1001-25', colorName: 'Seabird',        colorCode: '#c8dce8', sizes: 'XS–XL',  note: 'New color'    },
      { sku: '1001-26', colorName: 'Mustard',        colorCode: '#c9a227', sizes: 'S–XL',   note: 'Development'  },
      { sku: '1001-27', colorName: 'Steel Blue',     colorCode: '#3d5a80', sizes: 'XS–XXL', note: 'Development'  },
      { sku: '1001-28', colorName: 'Birch White',    colorCode: '#f2ede4', sizes: 'S–XL',   note: 'Discontinued' }
    ]
  },

  /**
   * Table of Content
   */
  tableOfContent: {
    entries: [
      { page:  1, section:  '1.', title: 'Front Page' },
      { page:  2, section:  '2.', title: 'Main Illustration' },
      { page:  3, section:  '3.', title: 'Style and Color Overview' },
      { page:  4, section:  '4.', title: 'Table of Content' },
      { page:  5, section:  '5.', title: 'Bill of Material — Fabrics' },
      { page:  6, section:  '5.', title: 'Bill of Material — Zippers' },
      { page:  7, section:  '5.', title: 'Bill of Material — Trims & Tapes' },
      { page:  8, section:  '5.', title: 'Bill of Material — Labels & Threads' },
      { page:  9, section:  '5.', title: 'Bill of Material — Elastic & Cords' },
      { page: 10, section:  '5.', title: 'Bill of Material — Packaging & Hangtags' },
      { page: 11, section:  '6.', title: 'Color Matrix — SS2425' },
      { page: 12, section:  '6.', title: 'Color Matrix — FW2425 Development' },
      { page: 13, section:  '7.', title: 'Drawings — Product Overview' },
      { page: 14, section:  '7.', title: 'Drawings — Front Body Construction' },
      { page: 15, section:  '7.', title: 'Drawings — Hood Details' },
      { page: 16, section:  '7.', title: 'Drawings — Pocket & Zipper Details' },
      { page: 17, section:  '7.', title: 'Drawings — Cuff & Hem Details' }
    ]
  },

  /**
   * Bill of Material
   * rows: full list of BOM line items grouped by category.
   * dividers: category headers spliced into the body at the given row index.
   */
  BOMTable: {
    rows: [

      // ── Fabrics ────────────────────────────────────────────────────────────
      {
        image: '', supplier: 'Gore-Tex Fabrics', paidby: 'Norrøna',
        material: 'GORE-TEX Pro 3L — 80D face',
        size: '150 cm', wheretouse: 'Main body\nSleeves\nHood outer',
        materialtype: 'Fabric - Main Shell',
        consume: 'M2', waste: '8%', shrink: '1%', csp3cons: '1.82', patternrotation: '0', garmentrotation: '0', grading: 'yes'
      },
      {
        image: '', supplier: 'Gore-Tex Fabrics', paidby: 'Norrøna',
        material: 'GORE-TEX Pro 3L — 40D face (lite)',
        size: '150 cm', wheretouse: 'Hood brim\nCuff outer panel',
        materialtype: 'Fabric - Main Shell',
        consume: 'M2', waste: '7%', shrink: '1%', csp3cons: '0.28', patternrotation: '0', garmentrotation: '0', grading: 'yes'
      },
      {
        image: '', supplier: 'Gore-Tex Fabrics', paidby: 'Norrøna',
        material: 'GORE-TEX Paclite Plus 2L',
        size: '150 cm', wheretouse: 'Packaway pocket panel',
        materialtype: 'Fabric - Secondary Shell',
        consume: 'M2', waste: '10%', shrink: '1%', csp3cons: '0.12', patternrotation: '0', garmentrotation: '0', grading: 'no'
      },
      {
        image: '', supplier: 'Polartec', paidby: 'Norrøna',
        material: 'Polartec Power Stretch Pro',
        size: '155 cm', wheretouse: 'Under-arm gusset\nInner cuff\nShoulder articulation',
        materialtype: 'Fabric - Stretch Panel',
        consume: 'M2', waste: '6%', shrink: '2%', csp3cons: '0.22', patternrotation: '0', garmentrotation: '0', grading: 'no'
      },
      {
        image: '', supplier: 'Schoeller', paidby: 'Factory',
        material: 'Schoeller c_change membrane lining',
        size: '148 cm', wheretouse: 'Full body lining\nSleeve lining',
        materialtype: 'Fabric - Lining',
        consume: 'M2', waste: '5%', shrink: '1%', csp3cons: '1.60', patternrotation: '0', garmentrotation: '0', grading: 'yes'
      },
      {
        image: '', supplier: 'Toray', paidby: 'Factory',
        material: 'Toray Primeflex 20D ripstop',
        size: '150 cm', wheretouse: 'Hand pocket bags\nChest pocket bag\nPackaway pocket bag',
        materialtype: 'Fabric - Pocket Lining',
        consume: 'M2', waste: '10%', shrink: '1%', csp3cons: '0.28', patternrotation: '180', garmentrotation: '0', grading: 'no'
      },
      {
        image: '', supplier: 'Toray', paidby: 'Factory',
        material: 'Toray mesh — 40D hexagonal',
        size: '150 cm', wheretouse: 'Internal media pocket\nVentilation panel lining',
        materialtype: 'Fabric - Mesh',
        consume: 'M2', waste: '8%', shrink: '0%', csp3cons: '0.08', patternrotation: '0', garmentrotation: '0', grading: 'no'
      },
      {
        image: '', supplier: 'Recco', paidby: 'Norrøna',
        material: 'Recco reflector patch',
        size: '55×35 mm', wheretouse: 'Upper back panel (bonded)',
        materialtype: 'Fabric - Functional Insert',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },

      // ── Zippers ─────────────────────────────────────────────────────────────
      {
        image: '', supplier: 'YKK', paidby: 'Norrøna',
        material: 'YKK VISLON 5VS — 2-way centre front',
        size: '68 cm', wheretouse: 'Centre front main zip',
        materialtype: 'Zipper - Ready Length',
        consume: 'CM', waste: '0%', shrink: '0%', csp3cons: '68', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'YKK', paidby: 'Norrøna',
        material: 'YKK AQUAGUARD 5FC — waterproof (chest)',
        size: '22 cm', wheretouse: 'Left chest / packaway pocket',
        materialtype: 'Zipper - Ready Length',
        consume: 'CM', waste: '0%', shrink: '0%', csp3cons: '22', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'YKK', paidby: 'Norrøna',
        material: 'YKK AQUAGUARD 5FC — waterproof (hand)',
        size: '18 cm', wheretouse: 'Right hand pocket\nLeft hand pocket',
        materialtype: 'Zipper - Ready Length',
        consume: 'CM', waste: '0%', shrink: '0%', csp3cons: '36', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'YKK', paidby: 'Norrøna',
        material: 'YKK AQUAGUARD 3C — by meter (pit zip)',
        size: 'By meter', wheretouse: 'Left pit zip\nRight pit zip',
        materialtype: 'Zipper - By Meter',
        consume: 'CM', waste: '3%', shrink: '0%', csp3cons: '72', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'YKK', paidby: 'Norrøna',
        material: 'YKK AQUAGUARD 3C — by meter (back vent)',
        size: 'By meter', wheretouse: 'Centre back vent\nCollar vent',
        materialtype: 'Zipper - By Meter',
        consume: 'CM', waste: '3%', shrink: '0%', csp3cons: '38', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'Riri', paidby: 'Factory',
        material: 'Riri M6 waterproof coil — media pocket',
        size: '12 cm', wheretouse: 'Internal media pocket',
        materialtype: 'Zipper - Ready Length',
        consume: 'CM', waste: '0%', shrink: '0%', csp3cons: '12', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },
      {
        image: '', supplier: 'YKK', paidby: 'Factory',
        material: 'YKK #3 CF coil — storm flap liner',
        size: '65 cm', wheretouse: 'Inner storm flap behind CF zip',
        materialtype: 'Zipper - Ready Length',
        consume: 'CM', waste: '0%', shrink: '0%', csp3cons: '65', patternrotation: '100', garmentrotation: '100', grading: 'no'
      },

      // ── Trims & Tapes ───────────────────────────────────────────────────────
      {
        image: '', supplier: 'Bemis', paidby: 'Factory',
        material: 'Bemis QST 20 seam tape',
        size: '20 mm', wheretouse: 'All exterior main seams',
        materialtype: 'Tape - Seam Sealing',
        consume: 'M', waste: '5%', shrink: '0%', csp3cons: '8.40', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Bemis', paidby: 'Factory',
        material: 'Bemis QST 10 seam tape (narrow)',
        size: '10 mm', wheretouse: 'Hood seams\nCuff seams\nShoulder seams',
        materialtype: 'Tape - Seam Sealing',
        consume: 'M', waste: '5%', shrink: '0%', csp3cons: '2.20', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Binding tape 15mm — DWR coated',
        size: '15 mm', wheretouse: 'Hood facial opening\nFront placket edge',
        materialtype: 'Tape - Binding',
        consume: 'M', waste: '3%', shrink: '0%', csp3cons: '1.20', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Loop tape 10mm — zipper garage',
        size: '10 mm', wheretouse: 'CF zip top & bottom garage',
        materialtype: 'Tape - Loop',
        consume: 'CM', waste: '2%', shrink: '0%', csp3cons: '8', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'ITW Nexus', paidby: 'Factory',
        material: 'Cord lock — single barrel (hood)',
        size: 'One size', wheretouse: 'Hood front drawcord exit',
        materialtype: 'Trim - Cordlock',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'ITW Nexus', paidby: 'Factory',
        material: 'Cord lock — double barrel (hem)',
        size: 'One size', wheretouse: 'Hem front drawcord exit',
        materialtype: 'Trim - Cordlock',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'ITW Nexus', paidby: 'Factory',
        material: 'Side release buckle 25mm',
        size: '25 mm', wheretouse: 'Internal chest strap',
        materialtype: 'Trim - Buckle',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Coats', paidby: 'Factory',
        material: 'Woven jacquard logo badge',
        size: '50×25 mm', wheretouse: 'Left chest exterior',
        materialtype: 'Trim - Badge',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Rubber zipper pull — branded',
        size: '30×12 mm', wheretouse: 'All waterproof zippers\nCF zip storm flap',
        materialtype: 'Trim - Zipper Pull',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '7', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },

      // ── Labels & Threads ────────────────────────────────────────────────────
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'Main woven label — DIN embroidery',
        size: '60×35 mm', wheretouse: 'Centre back neck',
        materialtype: 'Label - Main',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'Care & content label — EU market',
        size: '70×30 mm', wheretouse: 'Left side seam (inside)',
        materialtype: 'Label - Care',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'Care & content label — US market',
        size: '70×30 mm', wheretouse: 'Left side seam (inside)',
        materialtype: 'Label - Care',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'Size label',
        size: '30×15 mm', wheretouse: 'Centre back neck (below main label)',
        materialtype: 'Label - Size',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'GORE-TEX licensed product label',
        size: '40×20 mm', wheretouse: 'Left chest interior (bonded)',
        materialtype: 'Label - Licensed',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Paxar', paidby: 'Norrøna',
        material: 'Recco technology label',
        size: '35×15 mm', wheretouse: 'Inside collar',
        materialtype: 'Label - Licensed',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Coats', paidby: 'Factory',
        material: 'Coats Epic thread 60/2 — dark olive',
        size: 'Cone', wheretouse: 'All main seams',
        materialtype: 'Thread - Main Sewing',
        consume: 'M', waste: '15%', shrink: '0%', csp3cons: '420', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Coats', paidby: 'Factory',
        material: 'Coats Epic thread 60/2 — black',
        size: 'Cone', wheretouse: 'Pocket edges\nZipper attachment',
        materialtype: 'Thread - Main Sewing',
        consume: 'M', waste: '12%', shrink: '0%', csp3cons: '85', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Coats', paidby: 'Factory',
        material: 'Coats Epic thread 40/2 — black (bartack)',
        size: 'Cone', wheretouse: 'Bartacks at stress points\nVelcro tabs',
        materialtype: 'Thread - Bartack',
        consume: 'M', waste: '10%', shrink: '0%', csp3cons: '28', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },

      // ── Elastic & Cords ─────────────────────────────────────────────────────
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Flat elastic 30mm — logo woven',
        size: '30 mm', wheretouse: 'Inner waist band\nInner cuff channel',
        materialtype: 'Elastic',
        consume: 'CM', waste: '3%', shrink: '3%', csp3cons: '42', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'yes'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Flat elastic 15mm — thumb loop',
        size: '15 mm', wheretouse: 'Inner cuff thumb loop',
        materialtype: 'Elastic',
        consume: 'CM', waste: '5%', shrink: '2%', csp3cons: '8', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Round cord 5mm — reflective tracer',
        size: '5 mm', wheretouse: 'Hood front drawcord',
        materialtype: 'Cord',
        consume: 'CM', waste: '5%', shrink: '0%', csp3cons: '85', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Trim', paidby: 'Norrøna',
        material: 'Round cord 4mm — DWR coated',
        size: '4 mm', wheretouse: 'Hem drawcord\nHood rear adjust',
        materialtype: 'Cord',
        consume: 'CM', waste: '5%', shrink: '0%', csp3cons: '100', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Velcro Industries', paidby: 'Factory',
        material: 'Velcro ONE-WRAP 20mm — hook side',
        size: '20 mm', wheretouse: 'Outer cuff tab (hook)',
        materialtype: 'Velcro',
        consume: 'CM', waste: '2%', shrink: '0%', csp3cons: '4', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Velcro Industries', paidby: 'Factory',
        material: 'Velcro ONE-WRAP 20mm — loop side',
        size: '20 mm', wheretouse: 'Outer cuff tab (loop)',
        materialtype: 'Velcro',
        consume: 'CM', waste: '2%', shrink: '0%', csp3cons: '4', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },

      // ── Packaging & Hangtags ────────────────────────────────────────────────
      {
        image: '', supplier: 'Norrøna Packaging', paidby: 'Norrøna',
        material: 'Main hangtag — duplex board 400g',
        size: '80×50 mm', wheretouse: 'Attached to main label',
        materialtype: 'Packaging - Hangtag',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Packaging', paidby: 'Norrøna',
        material: 'Tech spec secondary hangtag',
        size: '80×50 mm', wheretouse: 'Attached to main hangtag',
        materialtype: 'Packaging - Hangtag',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Packaging', paidby: 'Norrøna',
        material: 'Hangtag string — natural cotton',
        size: '30 cm', wheretouse: 'Loop through main label loop',
        materialtype: 'Packaging - Hangtag String',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Packaging', paidby: 'Norrøna',
        material: 'Polybag — recycled PE, perforated',
        size: '70×50 cm', wheretouse: 'Individual garment bag',
        materialtype: 'Packaging - Polybag',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'Norrøna Packaging', paidby: 'Norrøna',
        material: 'Barcode sticker — EAN-13',
        size: '60×40 mm', wheretouse: 'Outside of polybag',
        materialtype: 'Packaging - Sticker',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '1', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      },
      {
        image: '', supplier: 'DS Smith', paidby: 'Factory',
        material: 'Carton box — double wall corrugated',
        size: '60×40×30 cm', wheretouse: '12 pcs per master carton',
        materialtype: 'Packaging - Carton',
        consume: 'PCS', waste: '0%', shrink: '0%', csp3cons: '0.083', patternrotation: 'N/A', garmentrotation: 'N/A', grading: 'no'
      }
    ],
    dividers: [
      { content: 'Fabrics',              insertBefore: 0  },  // rows 0–7   (8 rows)
      { content: 'Zippers',              insertBefore: 8  },  // rows 8–13  (6 rows)
      { content: 'Trims & Tapes',        insertBefore: 14 },  // rows 14–22 (9 rows)
      { content: 'Labels & Threads',     insertBefore: 23 },  // rows 23–31 (9 rows)
      { content: 'Elastic & Cords',      insertBefore: 32 },  // rows 32–37 (6 rows)
      { content: 'Packaging & Hangtags', insertBefore: 38 }   // rows 38–43 (6 rows)
    ]
  },

  /**
   * Color Matrix
   * head uses jsPDF-AutoTable raw head format (array of arrays).
   * body uses plain arrays matching the columns order.
   */
  colorMatrix: {
    columns: ['colorcode', 'colorname', 'season', 'colorway', 'sizes', 'moq', 'factory', 'deliveryDate', 'status'],
    head: [
      [
        {
          content: 'Color Matrix — lofoten Gore-tex Pro Plus Jacket Ms  |  Style 1001-20',
          colSpan: 9,
          styles: { fontStyle: 'bold', fontSize: 8, fillColor: [220, 224, 195] }
        }
      ],
      [
        { content: 'Color Code',    styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Color Name',    styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Season',        styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Colorway',      styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Sizes',         styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'MOQ (pcs)',     styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Factory',       styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Delivery Date', styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } },
        { content: 'Status',        styles: { fontStyle: 'bold', fillColor: [240, 241, 232] } }
      ]
    ],
    body: [
      // ── SS2425 confirmed colours ─────────────────────────────────────────
      ['1001-21', 'Olive Night',  'SS2425', 'Primary',   'XS / S / M / L / XL / XXL', '24', 'PT Kahatex',    '2025-01-15', 'Confirmed — Carry over'],
      ['1001-22', 'Castor Grey',  'SS2425', 'Primary',   'XS / S / M / L / XL / XXL', '24', 'PT Kahatex',    '2025-01-15', 'Confirmed — New'],
      ['1001-23', 'Crimson',      'SS2425', 'Secondary', 'S / M / L / XL',             '12', 'Youngone Corp', '2025-02-01', 'Confirmed — New'],
      ['1001-24', 'Indigo Night', 'SS2425', 'Primary',   'XS / S / M / L / XL / XXL', '24', 'PT Kahatex',    '2025-01-15', 'Confirmed — Carry over'],
      ['1001-25', 'Seabird',      'SS2425', 'Secondary', 'XS / S / M / L / XL',        '12', 'Youngone Corp', '2025-02-01', 'Confirmed — New'],
      // ── FW2425 development colours ───────────────────────────────────────
      ['1001-26', 'Mustard',      'FW2425', 'Accent',    'S / M / L',                   '6', 'TBD',           'TBD',        'Development'],
      ['1001-27', 'Steel Blue',   'FW2425', 'Primary',   'XS / S / M / L / XL / XXL', '24', 'TBD',           'TBD',        'Development'],
      ['1001-28', 'Birch White',  'SS2425', 'Secondary', 'S / M / L / XL',             '12', '—',             '—',          'Discontinued'],
      // ── Size run detail ──────────────────────────────────────────────────
      ['',        'Size XS',      'SS2425', '—',         'Chest 84–88 cm',              '',  '—',             '—',          'Graded from S'],
      ['',        'Size S',       'SS2425', '—',         'Chest 88–92 cm',              '',  '—',             '—',          'Base size'],
      ['',        'Size M',       'SS2425', '—',         'Chest 92–96 cm',              '',  '—',             '—',          'Graded from S'],
      ['',        'Size L',       'SS2425', '—',         'Chest 96–100 cm',             '',  '—',             '—',          'Graded from S'],
      ['',        'Size XL',      'SS2425', '—',         'Chest 100–106 cm',            '',  '—',             '—',          'Graded from S'],
      ['',        'Size XXL',     'SS2425', '—',         'Chest 106–112 cm',            '',  '—',             '—',          'Graded from S']
    ]
  },

  /**
   * Drawings
   * Each page is one illustration spread: image grid left, annotation text right.
   */
  drawings: {
    pages: [
      {
        text: 'Product Overview\n\n1. 3-layer GORE-TEX Pro 80D main shell\n2. Polartec Power Stretch underarm gusset\n3. Helmet-compatible StormHood with brim wire\n4. 2-way YKK VISLON CF zip with inner storm flap\n5. 3 × waterproof hand/chest pockets (AQUAGUARD)\n6. Dual pit zip ventilation (AQUAGUARD by meter)\n7. Recco SAR reflector — upper back (bonded)\n8. Packaway into chest pocket\n\nFit: Regular athletic\nWeight: 485g (size M)\nStandard: EN 343 (waterproofness class 3)',
        columns: [{ dataKey: 'col1', width: 100 }],
        rows:    [{ name: 'row1', height: 100 }],
        cells: [
          { imagePath: 'lib/assets/img/techpng.png', span: 1, id: 'cell1', title: 'Full product overview' }
        ]
      },
      {
        text: 'Front Body Construction\n\n1. Front panel — GORE-TEX Pro 3L 80D\n   Cut on grain. Seam allowance: 10mm.\n   Seam type: flat-fell, taped with Bemis QST 20.\n\n2. Centre front placket — double layer\n   Outer: main fabric. Inner: Toray lining.\n   Topstitch: 3mm from fold edge.\n\n3. Storm flap — inner face\n   YKK #3 CF coil zip, recessed 15mm.\n   Snap at top, magnetic closure mid.\n\n4. Chest pocket opening\n   AQUAGUARD 5FC 22cm, horizontal.\n   Doubles as packaway — reinforced at corners.\n\n5. Logo badge — left chest, centred\n   Bonded + topstitched. 2mm clearance to zip.',
        columns: [{ dataKey: 'col1', width: 100 }],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 1.png', span: 1, id: 'cell1', title: 'Front panel — full layout' },
          { imagePath: 'lib/assets/img/Asset 2.png', span: 1, id: 'cell2', title: 'Storm flap cross-section (A–A)' }
        ]
      },
      {
        text: 'Hood Construction\n\n1. 3-panel StormHood — helmet-compatible\n   Panel 1: centre crown (main fabric)\n   Panel 2: left/right side (main fabric)\n   All seams: Bemis QST 10mm narrow tape.\n\n2. Brim wire channel\n   2mm pre-bent spring wire, inserted before\n   topstitching brim. Exits at both side seams\n   — seal ends with bar tack.\n\n3. Single-hand hood adjustment\n   5mm reflective cord, single-barrel cordlock\n   exits at left side seam, 18mm eyelet.\n\n4. Facial opening\n   Bound with 15mm DWR binding tape.\n   Minimum stretch: 5% for helmet fit.\n\n5. Rear drawcord\n   4mm DWR cord, hidden channel in back panel\n   exits at both sides, double-barrel cordlock.',
        columns: [
          { dataKey: 'col1', width: 50 },
          { dataKey: 'col2', width: 50 }
        ],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 3.png', span: 1, id: 'cell1', title: 'Hood — top view (3-panel)' },
          { imagePath: 'lib/assets/img/Asset 4.png', span: 1, id: 'cell2', title: 'Hood — side profile' },
          { imagePath: 'lib/assets/img/Asset 5.png', span: 2, id: 'cell3', title: 'Brim wire channel — section B–B' },
          { span: 0, id: 'cell4' }
        ]
      },
      {
        text: 'Pocket & Zipper Details\n\n1. Hand pockets (×2)\n   YKK AQUAGUARD 5FC, 18cm each.\n   Pocket bag: Toray 20D ripstop.\n   Entry angle: 15° from vertical.\n   Seam taped, reinforced at mouth corners.\n\n2. Chest/packaway pocket\n   YKK AQUAGUARD 5FC, 22cm horizontal.\n   Internal zip garage sewn at top.\n   Internal stow loop for packaway.\n   Corner bar tacks × 4.\n\n3. Internal media pocket\n   Riri M6 waterproof coil, 12cm.\n   Mesh divider panel (Toray 40D hex).\n   Headphone port at top left seam.\n   Snap closure at port.',
        columns: [
          { dataKey: 'col1', width: 50 },
          { dataKey: 'col2', width: 50 }
        ],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 6.png', span: 1, id: 'cell1', title: 'Hand pocket — entry angle detail' },
          { imagePath: 'lib/assets/img/Asset 7.png', span: 1, id: 'cell2', title: 'Chest pocket — zip garage detail' },
          { imagePath: 'lib/assets/img/Asset 8.png', span: 1, id: 'cell3', title: 'Internal pocket — full layout' },
          { imagePath: 'lib/assets/img/Asset 9.png', span: 1, id: 'cell4', title: 'Zipper pull attachment (C–C)' }
        ]
      },
      {
        text: 'Cuff & Hem Details\n\n1. Outer cuff — GORE-TEX Pro main fabric\n   Velcro ONE-WRAP tab: hook + loop, 20mm wide,\n   40mm long. Bartacked at both ends (×4 pass).\n   Cuff overlap on close: minimum 25mm.\n\n2. Inner cuff — Polartec Power Stretch Pro\n   Thumb loop: 15mm flat elastic, bartacked.\n   Inner cuff width: 8cm relaxed, 11cm stretched.\n   Attach to outer cuff: flatlock stitch, 5mm SA.\n\n3. Hem — adjustable drawcord system\n   4mm DWR round cord, double-barrel cordlock\n   exits 20mm from CF seam on both sides.\n   Hem channel: fold-under 20mm, topstitch 18mm.\n   Hem drop: rear 4cm longer than front.\n   Hem finish: bound with 10mm binding tape.',
        columns: [
          { dataKey: 'col1', width: 80 },
          { dataKey: 'col2', width: 20 }
        ],
        rows: [{ name: 'row1', height: 100 }],
        cells: [
          { imagePath: 'lib/assets/img/Asset 10.png', span: 1, id: 'cell1', title: 'Cuff assembly — exploded view' },
          { imagePath: 'lib/assets/img/Asset 11.png', span: 1, id: 'cell2', title: 'Hem cord exit — section D–D' }
        ]
      }
    ]
  }

}
