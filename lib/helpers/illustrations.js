var ILLUSTRATION_IMAGE_AREA_WIDTH = 200
var ILLUSTRATION_IMAGE_AREA_HEIGHT = 170
var ILLUSTRATION_CELL_PADDING = 2

/**
 * Adds a new page to the doc with a two-column layout:
 *   left column = illustration grid, right column = annotation text.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} settings
 * @param {string} settings.text - Annotation text shown on the right
 * @param {Array<{dataKey: string, width: number}>} settings.columns - Grid columns (width as % of image area)
 * @param {Array<{name: string, height: number}>} settings.rows - Grid rows (height as % of image area)
 * @param {Array<{img: object, span: number, id: string, title: string}>} settings.cells - Images placed in grid cells
 * @param {object} [headerData] - Passed through to addPageHeader
 */
function makeIllustrationPage(doc, settings, headerData) {
  settings = settings || {}

  doc.autoTable({
    theme: 'plain',
    body: [['', settings.text]],
    columns: [
      { header: ' ', dataKey: 'illustration' },
      { header: ' ', dataKey: 'text' },
    ],
    columnStyles: {
      illustration: {
        cellPadding: ILLUSTRATION_CELL_PADDING,
        cellWidth: ILLUSTRATION_IMAGE_AREA_WIDTH,
        minCellHeight: ILLUSTRATION_IMAGE_AREA_HEIGHT,
      },
      text: { cellPadding: ILLUSTRATION_CELL_PADDING },
    },
    didDrawCell: function (data) {
      if (data.section === 'body' && data.column.dataKey === 'illustration') {
        addIllustrationGrid(doc, data, settings)
      }
      if (data.section === 'body' && data.column.dataKey === 'text') {
        cellBorderLeft(doc, data, 0)
      }
    },
    willDrawPage: function () {
      addPageHeader(doc, headerData)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })
}

/**
 * Renders a nested autoTable grid of illustration images inside a parent cell.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data - didDrawCell hook data from the parent table
 * @param {object} gridSettings - Same settings object passed to makeIllustrationPage
 */
function addIllustrationGrid(doc, data, gridSettings) {
  var columnStyles = {}
  var body = []

  gridSettings.columns.forEach(function (col) {
    columnStyles[col.dataKey] = {
      cellWidth: ILLUSTRATION_IMAGE_AREA_WIDTH * (col.width / 100),
    }
  })

  var cellCount = 0
  gridSettings.rows.forEach(function (row) {
    var rowData = []
    gridSettings.columns.forEach(function (col) {
      var cell = gridSettings.cells[cellCount]
      if (cell) {
        rowData.push({
          column: col.dataKey,
          content: cell.title + ' [' + cell.id + ']',
          colSpan: cell.span,
          rowSpan: 1,
          styles: {
            minCellHeight: ILLUSTRATION_IMAGE_AREA_HEIGHT * (row.height / 100),
          },
        })
        cellCount++
      }
    })
    body.push(rowData)
  })

  doc.autoTable({
    theme: 'plain',
    startY: data.cell.y,
    margin: { left: data.cell.x },
    columns: gridSettings.columns.map(function (i) {
      return { dataKey: i.dataKey }
    }),
    columnStyles: columnStyles,
    body: body,
    didParseCell: function (data) {
      if (data.section === 'body' && data.cell.raw && data.cell.raw.content) {
        var match = data.cell.raw.content.match(/(?<=\[)[^\][]*(?=])/g)
        if (match) {
          var imageId = match[0]
          data.cell.text[0] = data.cell.text[0].replace('[' + imageId + ']', '')
          if (imageId) {
            var cellData = gridSettings.cells.find(function (c) { return c.id === imageId })
            if (cellData) {
              data.cell.imgObj = cellData.img
            }
          }
        }
      }
    },
    didDrawCell: function (data) {
      if (data.section === 'body' && data.cell.imgObj) {
        var obj = data.cell.imgObj
        var str = obj.base64
        var cellProp = (data.cell.width - 4) / (data.cell.height - 10)
        var imgProp = obj.width / obj.height
        if (imgProp <= cellProp) {
          doc.addImage(str, 'JPEG', data.cell.x + 2, data.cell.y + 8, 0, data.cell.height - 10)
        } else {
          doc.addImage(str, 'JPEG', data.cell.x + 2, data.cell.y + 2, data.cell.width - 4, 0)
        }
      }
      if (data.section === 'body' && data.row.index >= 1) {
        cellBorderTop(doc, data, 200)
      }
      if (data.section === 'body' && data.column.index >= 1) {
        cellBorderLeft(doc, data, 200)
      }
    },
  })
}
