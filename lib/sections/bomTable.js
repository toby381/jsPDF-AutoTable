/**
 * Bill of Material section.
 * Renders a multi-page BOM table with grouped headers, category divider rows,
 * and a "Page N / Total" counter in the table title cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {Array} data.rows - BOM line item rows. Each row:
 *   { image, supplier, material, paidby, size, wheretouse, materialtype,
 *     consume, waste, shrink, csp3cons, patternrotation, garmentrotation, grading }
 * @param {Array<{content: string, insertBefore: number}>} data.dividers
 *   Category separator rows. insertBefore is the index in data.rows before which
 *   the divider is inserted.
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionBOMTable(doc, data) {
  var body = buildBOMBody(data.rows, data.dividers)
  var numberOfTableBreaks = 0

  // Record the first page of the BOM section so the page counter can show
  // a BOM-relative "1 / N" rather than an absolute document page number.
  // This matters when the section is rendered as part of generateAll().
  var firstBOMPage = doc.internal.getNumberOfPages()

  doc.autoTable({
    theme: 'plain',
    margin: { top: 15 },
    rowPageBreak: 'avoid',
    columns: [
      { dataKey: 'image' },
      { dataKey: 'supplier' },
      { dataKey: 'material' },
      { dataKey: 'paidby' },
      { dataKey: 'size' },
      { dataKey: 'wheretouse' },
      { dataKey: 'materialtype' },
      { dataKey: 'consume' },
      { dataKey: 'waste' },
      { dataKey: 'shrink' },
      { dataKey: 'csp3cons' },
      { dataKey: 'patternrotation' },
      { dataKey: 'garmentrotation' },
      { dataKey: 'grading' },
    ],
    styles:      { lineWidth: 0, fontSize: 7 },
    headStyles:  { font: 'DINNormal' },
    bodyStyles:  { font: 'DINNormal' },
    columnStyles: {},
    head: bomHeadRows(),
    body: body,
    didParseCell: function (hookData) {
      if (hookData.section === 'head' && hookData.row.index === 2) {
        hookData.cell.styles.font = 'dinsmallcapspdf'
      }
    },
    didDrawCell: function (hookData) {
      if ([5, 7, 11, 13].includes(hookData.column.index)) {
        cellBorderLeft(doc, hookData)
      } else if (
        hookData.column.index > 0 &&
        (hookData.section === 'body' ||
          (hookData.section === 'head' && hookData.row.index === 2))
      ) {
        cellBorderLeft(doc, hookData, 200)
      }
      if (hookData.section === 'head' && hookData.row.index === 2) {
        cellBorderTop(doc, hookData)
      }
      if (hookData.section === 'body') {
        cellBorderTop(doc, hookData, 200)
      }
    },
    willDrawPage: function () {
      numberOfTableBreaks += 1
      addPageHeader(doc, data.header)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })

  // Replace the {BOMTablePageCount} placeholder in the title cell with
  // a BOM-relative "current page / total BOM pages" string.
  // We only process pages that belong to this BOM section (from firstBOMPage
  // onwards), so the counter reads "1 / N" even in a multi-section document.
  doc.setFont('DINBold')
  var replaceExpression = new RegExp(
    doc.pdfEscape16('{BOMTablePageCount}', doc.internal.getFont()),
    'g'
  )
  var lastBOMPage = doc.internal.getNumberOfPages()
  for (var n = firstBOMPage; n <= lastBOMPage; n++) {
    var bomRelativePage = n - firstBOMPage + 1
    for (var i = 0; i < doc.internal.pages[n].length; i++) {
      doc.internal.pages[n][i] = doc.internal.pages[n][i].replace(
        replaceExpression,
        doc.pdfEscape16(bomRelativePage + ' / ' + numberOfTableBreaks, doc.internal.getFont())
      )
    }
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function bomHeadRows() {
  return [
    {
      image: {
        content: 'Bill of Material {BOMTablePageCount}',
        colSpan: 14,
        styles: { font: 'DINBold', minCellHeight: 15 },
      },
    },
    {
      image:          { content: 'Material info', colSpan: 5 },
      wheretouse:     { content: 'Consumption',   colSpan: 4 },
      patternrotation:{ content: 'Marker info',   colSpan: 2 },
      grading:        { content: 'Grading',        colSpan: 1 },
    },
    {
      image:           'image',
      supplier:        'supplier',
      material:        'material name',
      paidby:          'paid by',
      size:            'size',
      wheretouse:      'where to use',
      materialtype:    'material type',
      consume:         'consume',
      waste:           'waste',
      shrink:          'shrink.',
      csp3cons:        'csp3 cons.',
      patternrotation: 'pattern rotation',
      garmentrotation: 'garment rotation',
      grading:         'grading',
    },
  ]
}

/**
 * Inserts divider rows into the body array at the specified positions.
 * Dividers are sorted descending so splicing does not shift later indices.
 *
 * @param {Array} rows
 * @param {Array<{content: string, insertBefore: number}>} dividers
 * @returns {Array}
 */
function buildBOMBody(rows, dividers) {
  var body = rows.slice()
  var sorted = dividers.slice().sort(function (a, b) { return b.insertBefore - a.insertBefore })
  sorted.forEach(function (divider) {
    body.splice(divider.insertBefore, 0, {
      image: {
        content: divider.content,
        colSpan: 14,
        styles: { fillColor: 200 },
      },
    })
  })
  return body
}
