/**
 * Main Illustration section.
 * Renders a full-width product packshot with title text.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {string} [data.brandLine='Norrøna Tech Pack']
 * @param {string} [data.productName="1001-20 lofoten Gore-tex Pro Plus Jacket M's"]
 * @param {string} [data.imagePath='lib/assets/img/mainPackShot.png']
 * @param {object} [data.header] - Passed to addPageHeader
 */
async function sectionMainIllustration(doc, data) {
  data = data || {}
  var brandLine = data.brandLine || 'Norrøna Tech Pack'
  var productName = data.productName || "1001-20 lofoten Gore-tex Pro Plus Jacket M's"
  var imagePath = data.imagePath || 'lib/assets/img/mainPackShot.png'

  var img = await getDataUri(imagePath)

  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text(brandLine, PAGE_MARGIN.left, 20)
  doc.setFontSize(21)
  doc.text(productName, PAGE_MARGIN.left, 35)
  doc.addImage(img.base64, 'JPEG', PAGE_MARGIN.left, 40, 270, 0)

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
}
