/**
 * Table of Content section.
 * Renders a list of sections with page numbers.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {Array<{page: number|string, section: string, title: string}>} data.entries
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionTableOfContent(doc, data) {
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text('Page', 150, 30)
  doc.text('Main Sections', 170, 30)

  data.entries.forEach(function (entry, i) {
    doc.text(String(entry.page),  150, 40 + i * 5)
    doc.text(entry.section,       170, 40 + i * 5)
    doc.text(entry.title,         180, 40 + i * 5)
  })

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
  addPageNumber(doc)
}
