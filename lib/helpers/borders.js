/**
 * Draws a left border on a table cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data - Cell hook data from jsPDF-AutoTable
 * @param {number} [color=200] - Greyscale color (0-255)
 */
function cellBorderLeft(doc, data, color) {
  color = color !== undefined ? color : 200
  doc.setDrawColor(color)
  doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height)
}

/**
 * Draws a right border on a table cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data - Cell hook data from jsPDF-AutoTable
 * @param {number} [color=200] - Greyscale color (0-255)
 */
function cellBorderRight(doc, data, color) {
  color = color !== undefined ? color : 200
  doc.setDrawColor(color)
  doc.line(
    data.cell.x + data.cell.width,
    data.cell.y,
    data.cell.x + data.cell.width,
    data.cell.y + data.cell.height
  )
}

/**
 * Draws a top border on a table cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data - Cell hook data from jsPDF-AutoTable
 * @param {number} [color=200] - Greyscale color (0-255)
 */
function cellBorderTop(doc, data, color) {
  color = color !== undefined ? color : 200
  doc.setDrawColor(color)
  doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y)
}
