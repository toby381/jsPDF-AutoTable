var TOTAL_PAGES_EXP = 'totalpagescountstringtobereplaced'

/** Left margin used consistently across all sections (mm). */
var PAGE_MARGIN = { left: 14 }

/**
 * Height (mm) of the standard page header drawn at the top of every page.
 * autoTable sections use this as their top margin: margin: { top: HEADER_HEIGHT }
 * Manual layout sections use it to know where safe content area begins.
 */
var HEADER_HEIGHT = 15

// ---------------------------------------------------------------------------
// Private helper
// ---------------------------------------------------------------------------

function _applyHeaderStyle(doc) {
  doc.setFont('dinsmallcapspdf')
  doc.setTextColor(40)
}

// ---------------------------------------------------------------------------
// Public functions
// ---------------------------------------------------------------------------

/**
 * Draws the standard page header (logo, season, SKU, product name, date, rule).
 * Call this from willDrawPage hooks or directly at the top of a section.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [headerData]
 * @param {string} [headerData.season]
 * @param {string} [headerData.sku]
 * @param {string} [headerData.productName]
 * @param {string} [headerData.date]
 */
function addPageHeader(doc, headerData) {
  headerData = headerData || {}
  var season      = headerData.season      || 'SS2425'
  var sku         = headerData.sku         || '100120'
  var productName = headerData.productName || 'lofoten Gore-tex Pro Plus Jacket Ms'
  var date        = headerData.date        || '031220'

  _applyHeaderStyle(doc)

  if (typeof LOGO_SMALL !== 'undefined' && LOGO_SMALL) {
    doc.addImage(LOGO_SMALL, 'JPEG', PAGE_MARGIN.left, 5, 18, 5)
  }

  doc.text(season,      PAGE_MARGIN.left + 23,  9)
  doc.text(sku,         PAGE_MARGIN.left + 53,  9)
  doc.text(productName, PAGE_MARGIN.left + 78,  9)
  doc.text(date,        PAGE_MARGIN.left + 200, 9)
  doc.setDrawColor(40)
  doc.line(PAGE_MARGIN.left, 13, 281, 13)
}

/**
 * Draws a "Page N of [total]" string in the top-right corner.
 * Call this from didDrawPage hooks or directly after a section renders.
 *
 * @param {import('jspdf').jsPDF} doc
 */
function addPageNumber(doc) {
  var str = 'Page ' + doc.internal.getNumberOfPages() + ' of ' + TOTAL_PAGES_EXP
  _applyHeaderStyle(doc)
  doc.text(str, 283, 9, { align: 'right' })
}

/**
 * Draws both the page header and the page number in one call.
 * Use this instead of calling addPageHeader + addPageNumber separately —
 * they always appear together and this removes the repeated pair.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [headerData] - Passed through to addPageHeader
 */
function addPageDecorations(doc, headerData) {
  addPageHeader(doc, headerData)
  addPageNumber(doc)
}

/**
 * Returns a willDrawPage / didDrawPage hook object for use in doc.autoTable().
 * Eliminates the repeated hook boilerplate across table sections.
 *
 * Usage:
 *   doc.autoTable({
 *     ...
 *     ...makePageHooks(doc, data.header),
 *   })
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [headerData] - Passed through to addPageHeader
 * @returns {{ willDrawPage: function, didDrawPage: function }}
 */
function makePageHooks(doc, headerData) {
  return {
    willDrawPage: function () {
      addPageHeader(doc, headerData)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  }
}
