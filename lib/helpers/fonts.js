/**
 * Registers the DIN custom font family into a jsPDF document instance.
 * Depends on pdfFont.js being loaded (exposes: light, normal, bold, smallcaps globals).
 *
 * @param {import('jspdf').jsPDF} doc
 */
function addFontPack(doc) {
  doc.addFileToVFS('DINLight-normal.ttf', light)
  doc.addFont('DINLight-normal.ttf', 'DINLight', 'normal')
  doc.addFileToVFS('DINNormal-normal.ttf', normal)
  doc.addFont('DINNormal-normal.ttf', 'DINNormal', 'normal')
  doc.addFileToVFS('DINBold-normal.ttf', bold)
  doc.addFont('DINBold-normal.ttf', 'DINBold', 'normal')
  doc.addFileToVFS('dinsmallcapspdf-normal.ttf', smallcaps)
  doc.addFont('dinsmallcapspdf-normal.ttf', 'dinsmallcapspdf', 'normal')
}
