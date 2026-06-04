/**
 * Bill of Material section.
 * Renders a multi-page BOM table with grouped headers, row dividers,
 * and a "Page N / Total" counter in the table title cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {Array} [data.rows] - Body rows. Each row: { image, supplier, material, paidby, size,
 *                              wheretouse, materialtype, consume, waste, shrink,
 *                              csp3cons, patternrotation, garmentrotation, grading }
 * @param {Array<{content: string, colSpan: number, insertBefore: number}>} [data.dividers]
 *   - Row dividers to splice in. insertBefore = index in the rows array before which to insert.
 * @param {object} [data.header] - Passed to addPageHeader
 */
function sectionBOMTable(doc, data) {
  data = data || {}
  var rows = data.rows || defaultBOMRows(40)
  var dividers = data.dividers || [
    { content: 'Fabrics', insertBefore: 3 },
    { content: 'Zippers', insertBefore: 15 },
  ]

  var body = buildBOMBody(rows, dividers)
  var numberOfTableBreaks = 0

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
    styles: { lineWidth: 0, fontSize: 7 },
    headStyles: { font: 'DINNormal' },
    bodyStyles: { font: 'DINNormal' },
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

  // Replace the {BOMTablePageCount} placeholder embedded in the title cell
  // with the actual "current page / total pages" string.
  doc.setFont('DINBold')
  var replaceExpression = new RegExp(
    doc.pdfEscape16('{BOMTablePageCount}', doc.internal.getFont()),
    'g'
  )
  for (var n = 1; n <= doc.internal.getNumberOfPages(); n++) {
    for (var i = 0; i < doc.internal.pages[n].length; i++) {
      doc.internal.pages[n][i] = doc.internal.pages[n][i].replace(
        replaceExpression,
        doc.pdfEscape16(n + ' / ' + numberOfTableBreaks, doc.internal.getFont())
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
        styles: { font: 'DINBold', minCellHeight: '15' },
      },
    },
    {
      image: { content: 'Material info', colSpan: 5 },
      wheretouse: { content: 'Consumption', colSpan: 4 },
      patternrotation: { content: 'Marker info', colSpan: 2 },
      grading: { content: 'Grading', colSpan: 1 },
    },
    {
      image: 'image',
      supplier: 'supplier',
      material: 'material name',
      paidby: 'paid by',
      size: 'size',
      wheretouse: 'where to use',
      materialtype: 'material type',
      consume: 'consume',
      waste: 'waste',
      shrink: 'shrink.',
      csp3cons: 'csp3 cons.',
      patternrotation: 'pattern rotation',
      garmentrotation: 'garment rotation',
      grading: 'grading',
    },
  ]
}

/**
 * Builds the BOM body array by inserting divider rows at the specified positions.
 */
function buildBOMBody(rows, dividers) {
  var body = rows.slice()

  // Sort dividers descending so splicing doesn't shift later indices
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

/**
 * Default sample BOM rows used when no data is supplied.
 */
function defaultBOMRows(count) {
  var body = []
  for (var j = 1; j <= count; j++) {
    body.push({
      image: '',
      supplier: 'Global development',
      material: 'brSPL70LR/RGD 3L PRO',
      paidby: 'Norrøna',
      size: '180 cm',
      wheretouse: 'Main sewing thread\nFront zipper\nPockets',
      materialtype: 'Zipper - Ready Length',
      consume: 'CM',
      waste: '3%',
      shrink: '0%',
      csp3cons: '230',
      patternrotation: '100',
      garmentrotation: '100',
      grading: 'no',
    })
  }
  return body
}
