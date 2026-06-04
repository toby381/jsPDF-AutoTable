/**
 * Drawings section.
 * Renders multiple illustration pages (technical drawings with annotations).
 * Images are pre-loaded by imageLoader.js — each cell already has a resolved
 * img object ({ base64, width, height }) by the time this runs.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} data
 * @param {Array<DrawingPage>} data.pages - Illustration page definitions
 * @param {object} data.header - Page header values (season, sku, productName, date)
 *
 * @typedef {object} DrawingPage
 * @property {string} text - Annotation text shown in the right column
 * @property {Array<{dataKey: string, width: number}>} columns
 *   Grid columns. width is a percentage of the illustration area width (0–100).
 * @property {Array<{name: string, height: number}>} rows
 *   Grid rows. height is a percentage of the illustration area height (0–100).
 * @property {Array<DrawingCell>} cells - Images placed in the grid
 *
 * @typedef {object} DrawingCell
 * @property {object} [img] - Pre-loaded image { base64, width, height } (set by imageLoader.js)
 * @property {number} span - Column span (0 = placeholder / skip cell)
 * @property {string} id - Unique cell identifier
 * @property {string} [title] - Caption shown above the image
 */
function sectionDrawings(doc, data) {
  data.pages.forEach(function (page) {
    makeIllustrationPage(doc, page, data.header)
  })
}
