/**
 * Variant Illustrations section.
 * Renders a grid of color-variant product images with labels.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {string} [data.sectionTitle='Style and Color Overview']
 * @param {string} [data.imagePath='lib/assets/img/colorPackShot.png']
 * @param {Array<{sku: string, colorName: string, sizes: string, note: string}>} [data.variants]
 * @param {object} [data.header] - Passed to addPageHeader
 */
async function sectionVariantIllustration(doc, data) {
  data = data || {}
  var sectionTitle = data.sectionTitle || 'Style and Color Overview'
  var imagePath = data.imagePath || 'lib/assets/img/colorPackShot.png'
  var variants = data.variants || [
    { sku: '1001-21', colorName: 'OlveNight', sizes: 'S-XL', note: 'Carry over color' },
    { sku: '1001-21', colorName: 'OlveNight', sizes: 'S-XL', note: 'Carry over color' },
    { sku: '1001-21', colorName: 'OlveNight', sizes: 'S-XL', note: 'Carry over color' },
    { sku: '1001-21', colorName: 'OlveNight', sizes: 'S-XL', note: 'Carry over color' },
    { sku: '1001-21', colorName: 'OlveNight', sizes: 'S-XL', note: 'Carry over color' },
  ]

  var img = await getDataUri(imagePath)

  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text(sectionTitle, PAGE_MARGIN.left, 20)

  var startX = PAGE_MARGIN.left
  var startY = 40
  var width = 200 / 3
  var height = 80
  var padding = 30
  var row = 0
  var col = 0

  variants.forEach(function (variant, i) {
    var xpos = startX + (col * (width + padding))
    var ypos = startY + (row * height)
    doc.addImage(img.base64, 'JPEG', xpos, ypos, width, 0)
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
