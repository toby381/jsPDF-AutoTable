/**
 * TECHPACK_SAMPLE_DATA
 * --------------------
 * Single source of truth for all Techpack PDF content.
 *
 * This object represents the contract that the PLM API response must match.
 * When connecting to the API, replace this with the fetched JSON — the shape
 * must stay the same so sections render without any code changes.
 *
 * Images are referenced as path strings (imagePath / imageUrl).
 * They are resolved to base64 by imageLoader.js before PDF generation begins,
 * so all sections receive pre-loaded img objects and never do async work themselves.
 *
 * API integration pattern (index.html):
 *   fetch('/api/techpack/' + productId)
 *     .then(r => r.json())
 *     .then(data => { techpackData = data })
 */
var TECHPACK_SAMPLE_DATA = {

  /**
   * Shared page header — printed on every page of every section.
   * Maps to: addPageHeader(doc, data.header)
   */
  header: {
    season:      'SS2425',
    sku:         '100120',
    productName: 'lofoten Goretex pro plus Jacket Ms',
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
   * imagePath: URL or local path to the main product packshot.
   */
  mainIllustration: {
    brandLine:   'Norrøna Tech Pack',
    productName: "1001-20 lofoten Gore-tex Pro Plus Jacket M's",
    imagePath:   'lib/assets/img/mainPackShot.png'
  },

  /**
   * Variant Illustrations
   * imagePath: URL or local path to the color variant packshot.
   *   (Currently all variants share the same image; in PLM each variant
   *    will have its own imagePath.)
   * variants: one entry per color variant shown in the grid.
   */
  variantIllustration: {
    sectionTitle: 'Style and Color Overview',
    imagePath:    'lib/assets/img/colorPackShot.png',
    variants: [
      { sku: '1001-21', colorName: 'OlveNight',    sizes: 'S-XL', note: 'Carry over color' },
      { sku: '1001-22', colorName: 'Castor Grey',  sizes: 'S-XL', note: 'New color' },
      { sku: '1001-23', colorName: 'Crimson',      sizes: 'S-XL', note: 'New color' },
      { sku: '1001-24', colorName: 'Indigo Night', sizes: 'S-XL', note: 'Carry over color' },
      { sku: '1001-25', colorName: 'Seabird',      sizes: 'S-XL', note: 'New color' }
    ]
  },

  /**
   * Table of Content
   * entries: one entry per row in the TOC.
   */
  tableOfContent: {
    entries: (function () {
      var entries = []
      var sections = [
        'Front Page',
        'Main Illustration',
        'Style and Color Overview',
        'Table of Content',
        'Bill of Material',
        'Color Matrix',
        'Drawings — Overview',
        'Drawings — Hood Details',
        'Drawings — Pocket Details',
        'Drawings — Zipper Details',
        'Drawings — Cuff Details'
      ]
      for (var i = 0; i < 30; i++) {
        entries.push({
          page:    i + 1,
          section: (i + 1) + '.',
          title:   sections[i % sections.length]
        })
      }
      return entries
    }())
  },

  /**
   * Bill of Material
   * rows: one entry per BOM line item.
   * dividers: category separator rows spliced into the table body.
   *   insertBefore: index in the rows array before which to insert the divider.
   */
  BOMTable: {
    rows: (function () {
      var rows = []
      var materials = [
        { material: 'brSPL70LR/RGD 3L PRO', materialtype: 'Fabric - Main Shell',   consume: 'M2',  waste: '3%',  shrink: '2%',  csp3cons: '1.45', patternrotation: '0',   garmentrotation: '0'   },
        { material: 'brSPL80LR/RGD 2L ECO', materialtype: 'Fabric - Lining',       consume: 'M2',  waste: '5%',  shrink: '1%',  csp3cons: '0.80', patternrotation: '0',   garmentrotation: '0'   },
        { material: 'YKK VISLON 5VS',        materialtype: 'Zipper - Ready Length', consume: 'CM',  waste: '0%',  shrink: '0%',  csp3cons: '230',  patternrotation: '100', garmentrotation: '100' },
        { material: 'YKK AQUAGUARD 3C',      materialtype: 'Zipper - By Meter',     consume: 'CM',  waste: '2%',  shrink: '0%',  csp3cons: '85',   patternrotation: '100', garmentrotation: '100' },
        { material: 'DWR Tape 20mm',         materialtype: 'Tape',                  consume: 'M',   waste: '4%',  shrink: '0%',  csp3cons: '3.20', patternrotation: 'N/A', garmentrotation: 'N/A' },
        { material: 'Elastic 30mm flat',     materialtype: 'Elastic',               consume: 'CM',  waste: '3%',  shrink: '3%',  csp3cons: '12',   patternrotation: 'N/A', garmentrotation: 'N/A' },
        { material: 'Snap button 15mm',      materialtype: 'Button',                consume: 'PCS', waste: '0%',  shrink: '0%',  csp3cons: '4',    patternrotation: 'N/A', garmentrotation: 'N/A' },
        { material: 'Heat transfer label',   materialtype: 'Label',                 consume: 'PCS', waste: '0%',  shrink: '0%',  csp3cons: '3',    patternrotation: 'N/A', garmentrotation: 'N/A' }
      ]
      for (var j = 0; j < 40; j++) {
        var m = materials[j % materials.length]
        rows.push({
          image:           '',
          supplier:        'Global development',
          material:        m.material,
          paidby:          'Norrøna',
          size:            '180 cm',
          wheretouse:      'Main sewing thread\nFront zipper\nPockets',
          materialtype:    m.materialtype,
          consume:         m.consume,
          waste:           m.waste,
          shrink:          m.shrink,
          csp3cons:        m.csp3cons,
          patternrotation: m.patternrotation,
          garmentrotation: m.garmentrotation,
          grading:         'no'
        })
      }
      return rows
    }()),
    dividers: [
      { content: 'Fabrics',  insertBefore: 3  },
      { content: 'Zippers',  insertBefore: 15 }
    ]
  },

  /**
   * Color Matrix
   * columns: dataKey names for the table columns.
   * head / body: standard jsPDF-AutoTable head/body arrays.
   * (Currently empty — to be populated from PLM API.)
   */
  colorMatrix: {
    columns: ['col1', 'col2', 'col3', 'col4'],
    head:    [],
    body:    []
  },

  /**
   * Drawings
   * pages: one entry per illustration page.
   *   text:    annotation shown in the right column
   *   columns: grid columns — width is a percentage of the illustration area width
   *   rows:    grid rows — height is a percentage of the illustration area height
   *   cells:   images placed in the grid
   *     imagePath: URL or local path — resolved to base64 by imageLoader.js before rendering
   *     span:      column span (0 = skip/placeholder cell)
   *     id:        unique identifier used to match resolved images back to cells
   *     title:     caption shown above the image in the cell
   */
  drawings: {
    pages: [
      {
        text: '1. Brim mesh\n2. Brim wire\n3. Edge tape 20mm\nHow to: Fold tape over edge and stitch 1mm from fold.',
        columns: [{ dataKey: 'col1', width: 100 }],
        rows:    [{ name: 'row1', height: 100 }],
        cells: [
          { imagePath: 'lib/assets/img/techpng.png', span: 1, id: 'cell1', title: 'Overview' }
        ]
      },
      {
        text: '1. Front panel seam\n2. Chest pocket placement\n3. Zip guard fold\nHow to: Align notches and sew with 10mm seam allowance.',
        columns: [{ dataKey: 'col1', width: 100 }],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 1.png', span: 1, id: 'cell1', title: 'Front view' },
          { imagePath: 'lib/assets/img/Asset 2.png', span: 1, id: 'cell2', title: 'Detail A' }
        ]
      },
      {
        text: '1. Hood adjustment cord\n2. Brim wire channel\n3. Helmet-compatible peak\nHow to: Thread cord through channel before attaching peak.',
        columns: [
          { dataKey: 'col1', width: 50 },
          { dataKey: 'col2', width: 50 }
        ],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 3.png', span: 1, id: 'cell1', title: 'Hood top' },
          { imagePath: 'lib/assets/img/Asset 4.png', span: 1, id: 'cell2', title: 'Hood side' },
          { imagePath: 'lib/assets/img/Asset 5.png', span: 2, id: 'cell3', title: 'Full hood' },
          { span: 0, id: 'cell4' }
        ]
      },
      {
        text: '1. Hand pocket zipper\n2. Chest pocket zipper\n3. Internal media pocket\nHow to: Sew zipper tape flush with pocket opening.',
        columns: [
          { dataKey: 'col1', width: 50 },
          { dataKey: 'col2', width: 50 }
        ],
        rows: [
          { name: 'row1', height: 60 },
          { name: 'row2', height: 40 }
        ],
        cells: [
          { imagePath: 'lib/assets/img/Asset 6.png',  span: 1, id: 'cell1', title: 'Hand pocket' },
          { imagePath: 'lib/assets/img/Asset 7.png',  span: 1, id: 'cell2', title: 'Chest pocket' },
          { imagePath: 'lib/assets/img/Asset 8.png',  span: 1, id: 'cell3', title: 'Internal pocket' },
          { imagePath: 'lib/assets/img/Asset 9.png',  span: 1, id: 'cell4', title: 'Zip detail' }
        ]
      },
      {
        text: '1. Velcro cuff tab\n2. Elastic inner cuff\n3. Hem drawcord\nHow to: Attach velcro with bartack at each end.',
        columns: [
          { dataKey: 'col1', width: 80 },
          { dataKey: 'col2', width: 20 }
        ],
        rows: [{ name: 'row1', height: 100 }],
        cells: [
          { imagePath: 'lib/assets/img/Asset 10.png', span: 1, id: 'cell1', title: 'Cuff overview' },
          { imagePath: 'lib/assets/img/Asset 11.png', span: 1, id: 'cell2', title: 'Cuff detail' }
        ]
      }
    ]
  }

}
