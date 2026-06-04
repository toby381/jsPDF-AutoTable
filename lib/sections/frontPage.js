/**
 * Front Page section.
 * Renders the "Tech Pack" title page onto the doc.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {string} [data.title='Tech Pack']
 */
function sectionFrontPage(doc, data) {
  data = data || {}
  var title = data.title || 'Tech Pack'

  doc.setFont('DINBold')
  doc.setFontSize(42)
  doc.text(title, PAGE_MARGIN.left, 40)

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
}
