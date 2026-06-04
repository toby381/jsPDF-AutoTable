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
 *   doc.output('datauristring')            ← base64 string for <object> preview
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

  // Ordered list of all sections for generateAll
  var SECTION_ORDER = [
    'frontPage',
    'mainIllustration',
    'variantIllustration',
    'tableOfContent',
    'BOMTable',
    'colorMatrix',
    'drawings',
  ]

  // Map of section name → generator function
  var SECTION_GENERATORS = {
    frontPage:           sectionFrontPage,
    mainIllustration:    sectionMainIllustration,
    variantIllustration: sectionVariantIllustration,
    tableOfContent:      sectionTableOfContent,
    BOMTable:            sectionBOMTable,
    colorMatrix:         sectionColorMatrix,
    drawings:            sectionDrawings,
  }

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
   * Merges the top-level header into a section's data so every section
   * automatically receives the shared page header values.
   * Section-level header fields take precedence if provided.
   *
   * @param {object} globalHeader - data.header
   * @param {object} sectionData  - data[sectionName]
   * @returns {object}
   */
  function withHeader(globalHeader, sectionData) {
    return Object.assign(
      { header: globalHeader },
      sectionData,
      sectionData.header
        ? { header: Object.assign({}, globalHeader, sectionData.header) }
        : {}
    )
  }

  /**
   * Generates a complete PDF with all sections in order.
   * Images are pre-loaded before any section renders.
   *
   * @param {object} data - Full Techpack data object (see sampleData.js)
   * @returns {Promise<import('jspdf').jsPDF>}
   */
  async function generateAll(data) {
    data = await preloadImages(data)

    var doc = createDoc()
    var first = true

    for (var i = 0; i < SECTION_ORDER.length; i++) {
      var name = SECTION_ORDER[i]
      var generator = SECTION_GENERATORS[name]
      if (!generator) continue

      if (!first) doc.addPage()
      first = false

      generator(doc, withHeader(data.header, data[name] || {}))
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
    var generator = SECTION_GENERATORS[name]
    if (!generator) {
      throw new Error('Unknown section: ' + name)
    }

    data = await preloadImages(data)

    var doc = createDoc()
    generator(doc, withHeader(data.header, data[name] || {}))
    return finalise(doc)
  }

  return {
    generateAll:     generateAll,
    generateSection: generateSection,
  }

})()
