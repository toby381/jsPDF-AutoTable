/**
 * Front Page section.
 * Renders the "Tech Pack" title page onto the doc.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {string} data.title - Main title text
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionFrontPage(doc, data) {
  doc.setFont('DINBold')
  doc.setFontSize(42)
  doc.text(data.title, PAGE_MARGIN.left, 40)

  doc.setFontSize(7)
  addPageDecorations(doc, data.header)
}
