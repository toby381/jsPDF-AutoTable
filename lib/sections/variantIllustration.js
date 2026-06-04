/**
 * Variant Illustrations section.
 * Renders a grid of color-variant product images with labels.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {string} data.sectionTitle - Section heading text
 * @param {object} data.img - Pre-loaded image object { base64, width, height }
 *   (shared across all variants; in PLM each variant will have its own img)
 * @param {Array<{sku, colorName, sizes, note}>} data.variants - One entry per color variant
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionVariantIllustration(doc, data) {
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text(data.sectionTitle, PAGE_MARGIN.left, 20)

  var startX  = PAGE_MARGIN.left
  var startY  = 40
  var width   = 200 / 3
  var height  = 80
  var padding = 30
  var row = 0
  var col = 0

  data.variants.forEach(function (variant, i) {
    var xpos = startX + col * (width + padding)
    var ypos = startY + row * height
    doc.addImage(data.img.base64, 'JPEG', xpos, ypos, width, 0)
    doc.text(
      variant.sku + '\n' + variant.colorName + '\n' + variant.sizes + '\n' + variant.note,
      xpos,
      ypos + 40
    )
    if ((i + 1) % 3 === 0) {
      row++
      col = 0
    } else {
      col++
    }
  })

  doc.setFontSize(7)
  addPageHeader(doc, data.header)
}
