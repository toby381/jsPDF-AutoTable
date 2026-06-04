/**
 * Drawings section.
 * Renders multiple illustration pages (technical drawings with annotations).
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [data]
 * @param {Array<DrawingPage>} [data.pages] - Array of illustration page definitions.
 *   If omitted, falls back to the default sample layout using lib/assets/img/ images.
 * @param {object} [data.header] - Passed to addPageHeader on every page
 *
 * @typedef {object} DrawingPage
 * @property {string} text - Annotation text shown in the right column
 * @property {Array<{dataKey: string, width: number}>} columns - Grid columns (width as % of image area)
 * @property {Array<{name: string, height: number}>} rows - Grid rows (height as % of image area)
 * @property {Array<{img: object, span: number, id: string, title: string}>} cells - Images for grid cells
 */
async function sectionDrawings(doc, data) {
  data = data || {}

  var pages = data.pages

  if (!pages) {
    pages = await buildDefaultDrawingPages()
  }

  pages.forEach(function (page) {
    makeIllustrationPage(doc, page, data.header)
  })
}

/**
 * Builds the default 5-page drawings layout using local sample images.
 * Used as a fallback when no data is provided.
 */
async function buildDefaultDrawingPages() {
  var BASE = 'lib/assets/img/'

  var img0  = await getDataUri(BASE + 'techpng.png')
  var img1  = await getDataUri(BASE + 'Asset 1.png')
  var img2  = await getDataUri(BASE + 'Asset 2.png')
  var img3  = await getDataUri(BASE + 'Asset 3.png')
  var img4  = await getDataUri(BASE + 'Asset 4.png')
  var img5  = await getDataUri(BASE + 'Asset 5.png')
  var img6  = await getDataUri(BASE + 'Asset 6.png')
  var img7  = await getDataUri(BASE + 'Asset 7.png')
  var img8  = await getDataUri(BASE + 'Asset 8.png')
  var img9  = await getDataUri(BASE + 'Asset 9.png')
  var img10 = await getDataUri(BASE + 'Asset 10.png')
  var img11 = await getDataUri(BASE + 'Asset 11.png')

  var annotationText = '1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:'

  return [
    {
      text: annotationText,
      columns: [{ dataKey: 'col1', width: 100 }],
      rows: [{ name: 'row1', height: 100 }],
      cells: [{ img: img0, span: 1, id: 'cell1', title: 'Illustration title 1' }],
    },
    {
      text: annotationText,
      columns: [{ dataKey: 'col1', width: 100 }],
      rows: [
        { name: 'row1', height: 60 },
        { name: 'row2', height: 40 },
      ],
      cells: [
        { img: img1, span: 1, id: 'cell1', title: 'Illustration title 1' },
        { img: img2, span: 1, id: 'cell2', title: 'Illustration title 2' },
      ],
    },
    {
      text: annotationText,
      columns: [
        { dataKey: 'col1', width: 50 },
        { dataKey: 'col2', width: 50 },
      ],
      rows: [
        { name: 'row1', height: 60 },
        { name: 'row2', height: 40 },
      ],
      cells: [
        { img: img3, span: 1, id: 'cell1', title: 'Illustration title 1' },
        { img: img4, span: 1, id: 'cell2', title: 'Illustration title 2' },
        { img: img5, span: 2, id: 'cell3', title: 'Illustration title 3' },
        { span: 0, id: 'cell4' },
      ],
    },
    {
      text: annotationText,
      columns: [
        { dataKey: 'col1', width: 50 },
        { dataKey: 'col2', width: 50 },
      ],
      rows: [
        { name: 'row1', height: 60 },
        { name: 'row2', height: 40 },
      ],
      cells: [
        { img: img6, span: 1, id: 'cell1', title: 'Illustration title 1' },
        { img: img7, span: 1, id: 'cell2', title: 'Illustration title 2' },
        { img: img8, span: 1, id: 'cell3', title: 'Illustration title 3' },
        { img: img9, span: 1, id: 'cell4', title: 'Illustration title 4' },
      ],
    },
    {
      text: annotationText,
      columns: [
        { dataKey: 'col1', width: 80 },
        { dataKey: 'col2', width: 20 },
      ],
      rows: [{ name: 'row1', height: 100 }],
      cells: [
        { img: img10, span: 1, id: 'cell1', title: 'Illustration title 1' },
        { img: img11, span: 1, id: 'cell2', title: 'Illustration title 2' },
      ],
    },
  ]
}
