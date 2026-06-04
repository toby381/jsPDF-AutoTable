/**
 * Techpack PDF module
 * -------------------
 * Main entry point. Provides two public functions:
 *
 *   techpack.generateAll(data)             → Promise<jsPDF>
 *     Pre-loads all images, then generates a single PDF with all sections.
 *     Use this for the "Download PDF" action.
 *
 *   techpack.generateSection(name, data)   → Promise<jsPDF>
 *     Pre-loads all images, then generates a single-section PDF for preview.
 *
 * Both functions return a jsPDF document instance. The caller can then:
 *   doc.save('filename.pdf')               ← trigger download
 *   doc.output('blob')                     ← Blob for URL.createObjectURL() preview
 *
 * ---------------------------------------------------------------------------
 * Expected data shape (defined in lib/data/sampleData.js):
 *
 * {
 *   header: { season, sku, productName, date }   ← shared across all sections
 *
 *   frontPage:            { title }
 *   mainIllustration:     { brandLine, productName, imagePath }
 *   variantIllustration:  { sectionTitle, imagePath, variants: [...] }
 *   tableOfContent:       { entries: [...] }
 *   BOMTable:             { rows: [...], dividers: [...] }
 *   colorMatrix:          { columns: [...], head: [...], body: [...] }
 *   drawings:             { pages: [...] }
 * }
 *
 * Images are referenced as imagePath strings in the data.
 * preloadImages() (imageLoader.js) resolves them to base64 img objects
 * before any section renders, so sections are fully synchronous.
 * ---------------------------------------------------------------------------
 */

var techpack = (function () {

  /**
   * Ordered section definitions.
   * Each entry has a name (used as the data key and public API identifier)
   * and a fn (the section generator function).
   * Keeping order and generator in one structure prevents them drifting out of sync.
   */
  var SECTIONS = [
    { name: 'frontPage',           fn: function (d, s) { return sectionFrontPage(d, s) } },
    { name: 'mainIllustration',    fn: function (d, s) { return sectionMainIllustration(d, s) } },
    { name: 'variantIllustration', fn: function (d, s) { return sectionVariantIllustration(d, s) } },
    { name: 'tableOfContent',      fn: function (d, s) { return sectionTableOfContent(d, s) } },
    { name: 'BOMTable',            fn: function (d, s) { return sectionBOMTable(d, s) } },
    { name: 'colorMatrix',         fn: function (d, s) { return sectionColorMatrix(d, s) } },
    { name: 'drawings',            fn: function (d, s) { return sectionDrawings(d, s) } },
  ]

  // Build a lookup map for generateSection()
  var SECTION_MAP = {}
  SECTIONS.forEach(function (s) { SECTION_MAP[s.name] = s.fn })

  /**
   * Creates a new landscape A4 jsPDF document with fonts pre-loaded.
   * @returns {import('jspdf').jsPDF}
   */
  function createDoc() {
    var doc = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    })
    addFontPack(doc)
    doc.setFontSize(7)
    return doc
  }

  /**
   * Resolves total-page placeholders and returns the doc.
   * @param {import('jspdf').jsPDF} doc
   * @returns {import('jspdf').jsPDF}
   */
  function finalise(doc) {
    doc.setFont('dinsmallcapspdf')
    doc.putTotalPages(TOTAL_PAGES_EXP)
    return doc
  }

  /**
   * Builds the data object for a single section by merging the top-level
   * header into it. Section-level header fields take precedence.
   * Guards against a missing header in the API response.
   *
   * @param {object} globalHeader - data.header (may be undefined)
   * @param {object} sectionData  - data[sectionName] (may be undefined)
   * @returns {object}
   */
  function withHeader(globalHeader, sectionData) {
    var safeHeader = globalHeader || {}
    var safeSection = sectionData || {}
    return Object.assign(
      { header: safeHeader },
      safeSection,
      safeSection.header
        ? { header: Object.assign({}, safeHeader, safeSection.header) }
        : {}
    )
  }

  /**
   * Generates a complete PDF with all sections in order.
   * Images are pre-loaded before any section renders.
   * Sections whose data key is missing from the API response are skipped
   * with a console warning rather than crashing.
   *
   * @param {object} data - Full Techpack data object (see sampleData.js)
   * @returns {Promise<import('jspdf').jsPDF>}
   */
  async function generateAll(data) {
    data = await preloadImages(data)

    var doc = createDoc()
    var first = true

    for (var i = 0; i < SECTIONS.length; i++) {
      var section = SECTIONS[i]
      var sectionData = data[section.name]

      if (sectionData === undefined || sectionData === null) {
        console.warn('techpack: section "' + section.name + '" has no data in the response — skipping')
        continue
      }

      if (!first) doc.addPage()
      first = false

      section.fn(doc, withHeader(data.header, sectionData))
    }

    return finalise(doc)
  }

  /**
   * Generates a PDF containing only one named section.
   * Images are pre-loaded before the section renders.
   * Useful for the section preview in the sidebar.
   *
   * @param {string} name - Section name (e.g. 'BOMTable')
   * @param {object} data - Full Techpack data object (see sampleData.js)
   * @returns {Promise<import('jspdf').jsPDF>}
   */
  async function generateSection(name, data) {
    var generator = SECTION_MAP[name]
    if (!generator) {
      throw new Error('techpack: unknown section "' + name + '". Valid names: ' + SECTIONS.map(function (s) { return s.name }).join(', '))
    }

    var sectionData = data[name]
    if (sectionData === undefined || sectionData === null) {
      throw new Error('techpack: section "' + name + '" has no data in the provided data object')
    }

    data = await preloadImages(data)

    var doc = createDoc()
    generator(doc, withHeader(data.header, data[name]))
    return finalise(doc)
  }

  return {
    generateAll:     generateAll,
    generateSection: generateSection,
  }

})()
