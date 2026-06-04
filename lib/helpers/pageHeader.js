var TOTAL_PAGES_EXP = 'totalpagescountstringtobereplaced'

var PAGE_MARGIN = { left: 14 }

/**
 * Draws the standard page header (logo, season, SKU, product name, date, rule).
 * Call this from willDrawPage hooks.
 *
 * @param {import('jspdf').jsPDF} doc
 * @param {object} [headerData] - Optional dynamic values
 * @param {string} [headerData.season='SS2425']
 * @param {string} [headerData.sku='100120']
 * @param {string} [headerData.productName='lofoten Goretex pro plus Jacket Ms']
 * @param {string} [headerData.date='031220']
 */
function addPageHeader(doc, headerData) {
  headerData = headerData || {}
  var season = headerData.season || 'SS2425'
  var sku = headerData.sku || '100120'
  var productName = headerData.productName || 'lofoten Goretex pro plus Jacket Ms'
  var date = headerData.date || '031220'

  doc.setFont('dinsmallcapspdf')
  doc.setTextColor(40)

  if (typeof LOGO_SMALL !== 'undefined' && LOGO_SMALL) {
    doc.addImage(LOGO_SMALL, 'JPEG', PAGE_MARGIN.left, 5, 18, 5)
  }

  doc.text(season, PAGE_MARGIN.left + 23, 9)
  doc.text(sku, PAGE_MARGIN.left + 53, 9)
  doc.text(productName, PAGE_MARGIN.left + 78, 9)
  doc.text(date, PAGE_MARGIN.left + 200, 9)
  doc.setDrawColor(40)
  doc.line(PAGE_MARGIN.left, 13, 281, 13)
}

/**
 * Draws a "Page N of [total]" string in the top-right corner.
 * Call this from didDrawPage hooks.
 *
 * @param {import('jspdf').jsPDF} doc
 */
function addPageNumber(doc) {
  var str = 'Page ' + doc.internal.getNumberOfPages() + ' of ' + TOTAL_PAGES_EXP
  doc.setFont('dinsmallcapspdf')
  doc.setTextColor(40)
  doc.text(str, 283, 9, { align: 'right' })
}
