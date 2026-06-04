/**
 * Color Matrix section.
 * Renders a color matrix table.
 * Ready to be populated from the PLM API.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {Array<string>} data.columns - Column dataKey names
 * @param {Array} data.head - jsPDF-AutoTable head rows
 * @param {Array} data.body - jsPDF-AutoTable body rows
 * @param {object} data.header - Page header values (season, sku, productName, date)
 */
function sectionColorMatrix(doc, data) {
  var columns = data.columns.map(function (key) { return { dataKey: key } })

  doc.autoTable({
    theme: 'plain',
    margin: { top: 15 },
    rowPageBreak: 'avoid',
    columns: columns,
    styles:     { lineWidth: 0, fontSize: 7 },
    headStyles: { font: 'DINNormal' },
    bodyStyles: { font: 'DINNormal' },
    head: data.head,
    body: data.body,
    willDrawPage: function () {
      addPageHeader(doc, data.header)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })
}
