/**
 * Techpack PDF module
 * -------------------
 * Main entry point. Provides two public functions:
 *
 *   techpack.generateAll(data)             → Promise<jsPDF>
 *     Generates a single PDF containing all sections in order.
 *     Use this for the "Download PDF" action.
 *
 *   techpack.generateSection(name, data)   → Promise<jsPDF>
 *     Generates a single-section PDF for preview.
 *
 * Both functions return a jsPDF document instance. The caller can then:
 *   doc.save('filename.pdf')                  ← trigger download
 *   doc.output('datauristring')               ← get base64 for <object> preview
 *
 * ---------------------------------------------------------------------------
 * Data shape (all fields optional — defaults are used when omitted):
 *
 * {
 *   frontPage:            { title, header }
 *   mainIllustration:     { brandLine, productName, imagePath, header }
 *   variantIllustration:  { sectionTitle, imagePath, variants: [...], header }
 *   tableOfContent:       { entries: [...], header }
 *   BOMTable:             { rows: [...], dividers: [...], header }
 *   colorMatrix:          { columns: [...], head: [...], body: [...], header }
 *   drawings:             { pages: [...], header }
 * }
 *
 * The `header` sub-object (shared shape):
 * {
 *   season:      string  (default 'SS2425')
 *   sku:         string  (default '100120')
 *   productName: string  (default 'lofoten Goretex pro plus Jacket Ms')
 *   date:        string  (default '031220')
 * }
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
   * Creates a new landscape A4 jsPDF document with fonts loaded.
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
   * Finalises total-page placeholders and returns the doc.
   * @param {import('jspdf').jsPDF} doc
   * @returns {import('jspdf').jsPDF}
   */
  function finalise(doc) {
    doc.setFont('dinsmallcapspdf')
    doc.putTotalPages(TOTAL_PAGES_EXP)
    return doc
  }

  /**
   * Generates a complete PDF with all sections in order.
   *
   * @param {object} [data] - Data object keyed by section name
   * @returns {Promise<import('jspdf').jsPDF>}
   */
  async function generateAll(data) {
    data = data || {}
    var doc = createDoc()
    var first = true

    for (var i = 0; i < SECTION_ORDER.length; i++) {
      var name = SECTION_ORDER[i]
      var generator = SECTION_GENERATORS[name]
      if (!generator) continue

      if (!first) {
        doc.addPage()
      }
      first = false

      await generator(doc, data[name] || {})
    }

    return finalise(doc)
  }

  /**
   * Generates a PDF containing only one named section.
   * Useful for the section preview in the sidebar.
   *
   * @param {string} name - Section name (e.g. 'BOMTable')
   * @param {object} [data] - Data object keyed by section name
   * @returns {Promise<import('jspdf').jsPDF>}
   */
  async function generateSection(name, data) {
    data = data || {}
    var generator = SECTION_GENERATORS[name]
    if (!generator) {
      throw new Error('Unknown section: ' + name)
    }

    var doc = createDoc()
    await generator(doc, data[name] || {})
    return finalise(doc)
  }

  return {
    generateAll: generateAll,
    generateSection: generateSection,
  }

})()
