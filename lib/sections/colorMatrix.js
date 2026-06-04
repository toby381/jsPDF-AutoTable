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
  // Guard against missing or malformed API data
  var columns = Array.isArray(data.columns) && data.columns.length > 0
    ? data.columns.map(function (key) { return { dataKey: key } })
    : [{ dataKey: 'col1' }]

  var head = Array.isArray(data.head) ? data.head : []
  var body = Array.isArray(data.body) ? data.body : []

  doc.autoTable(Object.assign({
    theme: 'plain',
    margin: { top: HEADER_HEIGHT },
    rowPageBreak: 'avoid',
    columns: columns,
    styles:     { fontSize: 7 },
    headStyles: { font: 'DINNormal' },
    bodyStyles: { font: 'DINNormal' },
    head: head,
    body: body,
  }, makePageHooks(doc, data.header)))
}
