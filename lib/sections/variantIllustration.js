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
  // Guard: nothing to render if the image failed to load
  if (!data.img) {
    console.warn('sectionVariantIllustration: data.img is missing — skipping image rendering')
    doc.setFont('DINNormal')
    doc.setFontSize(10)
    doc.text(data.sectionTitle || '', PAGE_MARGIN.left, 20)
    doc.text('(No variant images available)', PAGE_MARGIN.left, 35)
    addPageHeader(doc, data.header)
    addPageNumber(doc)
    return
  }

  // Landscape A4: 297mm wide, 210mm tall. Page header occupies ~15mm at top.
  var PAGE_WIDTH   = 297
  var PAGE_HEIGHT  = 210
  var HEADER_HEIGHT = 15
  var SECTION_TITLE_Y = 20
  var LABEL_LINES = 4       // sku, colorName, sizes, note
  var LABEL_LINE_HEIGHT = 5 // mm per line at 10pt

  var COLS_PER_ROW = 3
  var imgWidth  = (PAGE_WIDTH - PAGE_MARGIN.left * 2 - 20 * (COLS_PER_ROW - 1)) / COLS_PER_ROW
  var colGap    = 20

  // Compute the actual rendered image height from the natural aspect ratio
  var imgHeight = (data.img.height / data.img.width) * imgWidth
  var labelHeight = LABEL_LINES * LABEL_LINE_HEIGHT + 4  // +4mm margin below image
  var cellHeight  = imgHeight + labelHeight

  var startX = PAGE_MARGIN.left
  var startY = SECTION_TITLE_Y + 10  // 10mm below title text
  var usableHeight = PAGE_HEIGHT - HEADER_HEIGHT - startY

  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text(data.sectionTitle || '', PAGE_MARGIN.left, SECTION_TITLE_Y)
  addPageHeader(doc, data.header)
  addPageNumber(doc)

  var col = 0
  var currentY = startY

  data.variants.forEach(function (variant, i) {
    // Page break: if this row would overflow, add a new page and reset position
    if (currentY + cellHeight > PAGE_HEIGHT - HEADER_HEIGHT) {
      doc.addPage()
      addPageHeader(doc, data.header)
      addPageNumber(doc)
      currentY = HEADER_HEIGHT + 5
      col = 0
    }

    var xpos = startX + col * (imgWidth + colGap)

    doc.addImage(data.img.base64, 'JPEG', xpos, currentY, imgWidth, 0)

    // Label text — guard optional fields against undefined
    var labelLines = [
      variant.sku       || '',
      variant.colorName || '',
      variant.sizes     || '',
      variant.note      || '',
    ].filter(function (l) { return l !== '' })

    doc.setFontSize(8)
    doc.setFont('DINNormal')
    doc.text(labelLines.join('\n'), xpos, currentY + imgHeight + 4)
    doc.setFontSize(10)

    col++
    if (col >= COLS_PER_ROW) {
      col = 0
      currentY += cellHeight
    }
  })
}
