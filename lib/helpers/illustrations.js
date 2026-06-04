var ILLUSTRATION_IMAGE_AREA_WIDTH  = 200
var ILLUSTRATION_IMAGE_AREA_HEIGHT = 170
var ILLUSTRATION_CELL_PADDING      = 2

// Vertical space (mm) reserved at the top of each cell for the caption text.
// The image is offset downward by this amount so the caption is not overdrawn.
var ILLUSTRATION_CAPTION_HEIGHT = 8

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
 * @param {object} [headerData] - Passed through to addPageDecorations
 */
function makeIllustrationPage(doc, settings, headerData) {
  settings = settings || {}

  doc.autoTable(Object.assign({
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
  }, makePageHooks(doc, headerData)))
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

      if (!cell) {
        // Fewer cells provided than the grid has slots — emit an empty placeholder
        // so the table layout stays correct rather than silently misaligning rows.
        rowData.push({
          column: col.dataKey,
          content: '',
          colSpan: 1,
          rowSpan: 1,
          styles: {
            minCellHeight: ILLUSTRATION_IMAGE_AREA_HEIGHT * (row.height / 100),
          },
        })
        return
      }

      // span:0 marks a placeholder cell that is visually consumed by a
      // preceding colSpan — skip it entirely rather than emitting colSpan:0
      // which is invalid in jsPDF-AutoTable.
      if (cell.span === 0) {
        cellCount++
        return
      }

      rowData.push({
        column: col.dataKey,
        // Use empty string when title is absent to avoid rendering "undefined"
        content: (cell.title || '') + ' [' + cell.id + ']',
        colSpan: cell.span,
        rowSpan: 1,
        styles: {
          minCellHeight: ILLUSTRATION_IMAGE_AREA_HEIGHT * (row.height / 100),
        },
      })
      cellCount++
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
        var match = data.cell.raw.content.match(/\[([^\]]*)\]/)
        if (match) {
          var imageId = match[1]
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
        // Detect image format from the data URI (defined in helpers/images.js).
        // This ensures PNG, WebP, etc. from the PLM API are rendered correctly.
        var fmt = imgFormatFromDataUri(str)

        // Available drawing area inside the cell (accounting for caption and padding)
        var drawWidth  = data.cell.width  - ILLUSTRATION_CELL_PADDING * 2
        var drawHeight = data.cell.height - ILLUSTRATION_CAPTION_HEIGHT - ILLUSTRATION_CELL_PADDING

        var cellProp = drawWidth / drawHeight
        var imgProp  = obj.width / obj.height

        if (imgProp <= cellProp) {
          // Portrait / tall image — fit by height, caption offset at top
          doc.addImage(str, fmt,
            data.cell.x + ILLUSTRATION_CELL_PADDING,
            data.cell.y + ILLUSTRATION_CAPTION_HEIGHT,
            0, drawHeight)
        } else {
          // Landscape / wide image — fit by width, small top padding
          doc.addImage(str, fmt,
            data.cell.x + ILLUSTRATION_CELL_PADDING,
            data.cell.y + ILLUSTRATION_CELL_PADDING,
            drawWidth, 0)
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
