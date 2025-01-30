var examples = {}
window.examples = examples

examples.techpack = function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  doc.addFileToVFS('DINLight-normal.ttf', light)
  doc.addFont('DINLight-normal.ttf', 'DINLight', 'normal')
  doc.addFileToVFS('DINNormal-normal.ttf', normal)
  doc.addFont('DINNormal-normal.ttf', 'DINNormal', 'normal')
  doc.addFileToVFS('DINBold-normal.ttf', bold)
  doc.addFont('DINBold-normal.ttf', 'DINBold', 'normal')
  doc.addFileToVFS('dinsmallcapspdf-normal.ttf', smallcaps)
  doc.addFont('dinsmallcapspdf-normal.ttf', 'dinsmallcapspdf', 'normal')

  var totalPagesExp = 'totalpagescountstringtobereplaced'

  // image: 'image',
  // supplier: 'supplier',
  // material: 'material name',
  // paidby: 'paid by',
  // size: 'size',
  // wheretouse: 'where to use',
  // materialtype: 'material type',
  // consume: 'consume',
  // waste: 'waste',
  // shrink: 'shrink.',
  // csp3cons: 'csp3 cons.',
  // patternrotation: 'pattern rotation',
  // garmentrotation: 'garment rotation',
  // grading: 'grading',

  let numberOfTableBreaks = 0;
  doc.autoTable({
    theme: 'plain',
    startY: 15,
    margin: 0,
    columns: [
      { dataKey: 'image' },
      { dataKey: 'supplier' },
      { dataKey: 'material' },
      { dataKey: 'paidby' },
      { dataKey: 'size' },
      { dataKey: 'wheretouse' },
      { dataKey: 'materialtype' },
      { dataKey: 'consume' },
      { dataKey: 'waste' },
      { dataKey: 'shrink' },
      { dataKey: 'csp3cons' },
      { dataKey: 'patternrotation' },
      { dataKey: 'garmentrotation' },
      { dataKey: 'grading' },
    ],
    styles: {
      lineWidth: 0,
    },
    headStyles: {
      font: 'DINNormal',
    },
    bodyStyles: {
      font: 'DINNormal',
    },
    columnStyles: {},
    head: headRows(),
    body: bodyRows(40),
    didParseCell: (data) => {
     
      if (data.section === 'head' && data.row.index === 2) {
        data.cell.styles.font = 'dinsmallcapspdf'
      }
    },
    didDrawCell: (data) => {
      if ([5, 7, 11, 13].includes(data.column.index)) {
        doc.setDrawColor(0)
        doc.line(
          data.cell.x,
          data.cell.y,
          data.cell.x,
          data.cell.y + data.cell.height,
        )
      } else if (
        data.column.index > 0 &&
        (data.section === 'body' ||
          (data.section === 'head' && data.row.index === 2))
      ) {
        doc.setDrawColor(200)
        doc.line(
          data.cell.x,
          data.cell.y,
          data.cell.x,
          data.cell.y + data.cell.height,
        )
      }
      if (data.section === 'head' && data.row.index === 2) {
        doc.setDrawColor(0)
        doc.line(
          data.cell.x,
          data.cell.y,
          data.cell.x + data.cell.width,
          data.cell.y,
        )
      }
    },
    willDrawPage: function (data) {
      numberOfTableBreaks +=1;
      // Header
      doc.setFont('dinsmallcapspdf')
      doc.setFontSize(10)
      doc.setTextColor(40)
      if (LOGO_SMALL) {
        doc.addImage(LOGO_SMALL, 'JPEG', data.settings.margin.left, 5, 18, 5)
      }

      doc.text('SS2425', data.settings.margin.left + 23, 9)
      doc.text('100120', data.settings.margin.left + 53, 9)
      doc.text(
        'lofoten Goretex pro plus Jacket Ms',
        data.settings.margin.left + 78,
        9,
      )
      doc.text('031220', data.settings.margin.left + 200, 9)
      doc.setDrawColor(40)
      doc.line(data.settings.margin.left, 13, 281, 13)
    },
    didDrawPage: function (data) {

      // Footer
      var str ='Page ' + doc.internal.getNumberOfPages() + ' of ' + totalPagesExp
      doc.setFont('dinsmallcapspdf')
      doc.setFontSize(10)
      doc.setTextColor(40)
      doc.text(str, 260, 9, { align: 'left' })
    },
    margin: { top: 30 },
  })

  // table count output
  doc.setFont('DINBold')
  const replaceExpression = new RegExp(doc.pdfEscape16('{BOMTablePageCount}', doc.internal.getFont()), "g");
  for (var n = 1; n <= doc.internal.getNumberOfPages(); n++) {
    for (var i = 0; i < doc.internal.pages[n].length; i++) {
      doc.internal.pages[n][i] = doc.internal.pages[n][i].replace(replaceExpression, doc.pdfEscape16(`${n} / ${numberOfTableBreaks}`, doc.internal.getFont()));
    }
  }

  
  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)

  return doc
}

/*
 |--------------------------------------------------------------------------
 | Below is some helper functions for the examples
 |--------------------------------------------------------------------------
 */

function headRows() {
  return [
    {
      image: {
        content: 'Bill of Material {BOMTablePageCount}',
        colSpan: 14,
        styles:{
          font: 'DINBold',
          minCellHeight: '15'
        }
      },
    },
    {
      image: {
        content: 'Material info',
        colSpan: 5,
      },
      wheretouse: {
        content: 'Placement',
        colSpan: 2,
      },
      wheretouse: {
        content: 'Consumption',
        colSpan: 4,
      },
      patternrotation: {
        content: 'Marker info',
        colSpan: 2,
      },
      grading: {
        content: 'Grading',
        colSpan: 1,
      }
    },
    {
      image: 'image',
      supplier: 'supplier',
      material: 'material name',
      paidby: 'paid by',
      size: 'size',
      wheretouse: 'where to use',
      materialtype: 'material type',
      consume: 'consume',
      waste: 'waste',
      shrink: 'shrink.',
      csp3cons: 'csp3 cons.',
      patternrotation: 'pattern rotation',
      garmentrotation: 'garment rotation',
      grading: 'grading',
    },
  ]
}

function bodyRows(rowCount) {
  rowCount = rowCount || 10
  var body = []
  for (var j = 1; j <= rowCount; j++) {
    body.push({
      image: '',
      supplier: 'xxxx',
      material: 'xxxx',
      paidby: 'xxxx',
      size: 's',
      wheretouse: 'xxx',
      materialtype: 'xxx',
      consume: 'xxx',
      waste: 'xxx',
      shrink: 'xxx.',
      csp3cons: 'xxx',
      patternrotation: 'xxx',
      garmentrotation: 'xxx',
      grading: '',
    })
  }
  return body
}
