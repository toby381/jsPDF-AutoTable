/**
 * Main Illustration section.
 * Renders a full-width product packshot with title text.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {string} data.brandLine - Small brand/collection line above the product name
 * @param {string} data.productName - Large product title
 * @param {object} data.img - Pre-loaded image object { base64, width, height }
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionMainIllustration(doc, data) {
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text(data.brandLine, PAGE_MARGIN.left, 20)
  doc.setFontSize(21)
  doc.text(data.productName, PAGE_MARGIN.left, 35)
  doc.addImage(data.img.base64, 'JPEG', PAGE_MARGIN.left, 40, 270, 0)

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
}
