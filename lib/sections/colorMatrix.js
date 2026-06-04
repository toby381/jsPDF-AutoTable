/**
 * Color Matrix section.
 * Renders a color matrix table. Currently a stub ready to be filled
 * with real data from the PLM API.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {Array} [data.head] - Table head rows
 * @param {Array} [data.body] - Table body rows
 * @param {Array<string>} [data.columns] - Column dataKeys (default: col1-col4)
 * @param {object} [data.header] - Passed to addPageHeader
 */
function sectionColorMatrix(doc, data) {
  data = data || {}
  var columns = (data.columns || ['col1', 'col2', 'col3', 'col4']).map(function (key) {
    return { dataKey: key }
  })
  var head = data.head || []
  var body = data.body || []

  doc.autoTable({
    theme: 'plain',
    margin: { top: 15 },
    rowPageBreak: 'avoid',
    columns: columns,
    styles: { lineWidth: 0, fontSize: 7 },
    headStyles: { font: 'DINNormal' },
    bodyStyles: { font: 'DINNormal' },
    head: head,
    body: body,
    willDrawPage: function () {
      addPageHeader(doc, data.header)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })
}
