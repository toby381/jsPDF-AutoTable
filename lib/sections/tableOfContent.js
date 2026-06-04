/**
 * Table of Content section.
 * Renders a simple list of sections with page numbers.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {Array<{page: number|string, section: string, title: string}>} [data.entries]
 * @param {object} [data.header] - Passed to addPageHeader
 */
function sectionTableOfContent(doc, data) {
  data = data || {}
  var entries = data.entries || []

  // Default placeholder entries if none provided
  if (entries.length === 0) {
    for (var i = 0; i < 30; i++) {
      entries.push({ page: i + 1, section: '1.', title: 'Product design drawing' })
    }
  }

  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text('Page', 150, 30)
  doc.text('Main Sections', 170, 30)

  entries.forEach(function (entry, i) {
    doc.text(String(entry.page), 150, 40 + i * 5)
    doc.text(entry.section, 170, 40 + i * 5)
    doc.text(entry.title, 180, 40 + i * 5)
  })

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
}
