var examples = {}
window.examples = examples
var totalPagesExp = 'totalpagescountstringtobereplaced'


const imageAreaWidth = 200; 
const imageAreaHeight = 170;
const cellPadding = 0;
// const grids = [{
//   id: 0,
//   name: 'default',
//   columns

// }]

function makeIllustrationPage(doc, settings = {}) {
  doc.autoTable({
    theme: 'plain',
    body: [
      ['', settings.text],
    ],
    columns: [
      { header: ' ', dataKey: 'illustration' },
      { header: ' ', dataKey: 'text' },
    ],
    columnStyles: { 
      illustration: { cellPadding:cellPadding, cellWidth: imageAreaWidth, minCellHeight: imageAreaHeight},
      text: {cellPadding:cellPadding } 

    }, 
    didDrawCell: async (data) => {
      if (data.section === 'body' && data.column.dataKey === 'illustration') {
        addIllustrationGrid(doc, data, settings)
      }
      if(data.section === 'body' && data.column.dataKey === 'text'){
        cellBorderLeft(doc, data, 0)
      }
    },
    willDrawPage: function (data) {
      addPageHeader(doc, data)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })
}


function addIllustrationGrid(doc, data, gridSettings) {
  // const body = [];
  // gridData.forEach((row, rowindex) => {
  //   const newRow = [];
  //   row.forEach((cell, cellindex) => {
  //     const width =  imageAreaWidth * (cell.w / 100);
  //     const height = imageAreaHeight * (cell.h / 100);
  //     newRow.push({
  //         content: '',
  //         styles: { cellWidth: width, minCellHeight: height, colSpan: colSpan[rowindex]  }
  //     })
  //   })
  //   body.push(newRow)
  // });


  const columnStyles = {};
  const body = [];
  gridSettings.columns.forEach(col => {
    columnStyles[col.dataKey] = { cellWidth: imageAreaWidth * (col.width / 100) };
  });

  let cellCount = 0;
  gridSettings.rows.forEach(row => {
    const rowData = [];
    gridSettings.columns.forEach(col => {
      const cell = gridSettings.cells[cellCount];
      if(cell) {
        const cellContent = { column: col.dataKey, content: '', colSpan: cell.span, rowSpan: 1, styles: { minCellHeight: imageAreaHeight * (row.height / 100)  } };
        rowData.push(cellContent);
        cellCount++;
  
      }
    });
    body.push(rowData);
  });

  doc.autoTable({
    theme: 'plain',
    startY: data.cell.y,
    margin: { left: data.cell.x },
    columns: gridSettings.columns.map(i => {return {dataKey: i.dataKey}}),
    columnStyles: columnStyles,

    body: body,
    
    didDrawCell: async (data) => {
      if (data.section === 'body' && data.row.index === 0 && data.column.index === 0) {
        // doc.addImage(imgsrc.base64, 'JPEG', data.cell.x , data.cell.y + 10, 0, 90);      
      }
      if(data.section === 'body' && data.row.index >= 1){
        cellBorderTop(doc, data, 200)
      }
      if(data.section === 'body' && data.column.index === 0){
        // cellBorderTop(doc, data, 200)
      }
      if(data.section === 'body' && data.column.index >= 1){
        cellBorderLeft(doc, data, 200)
      }
    },
  })


}

examples.techPack = function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })

  addFontPack(doc);
  doc.setFontSize(7)


  makeIllustrationPage(doc, 
    {
      text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
      columns: [
        { dataKey: 'col1', width: 33 },
        { dataKey: 'col2', width: 33 },
        { dataKey: 'col3', width: 33 },
      ],
      rows: [
        { name: 'row1', height: 33},
        { name: 'row2', height: 33},
        { name: 'row3', height: 33}
      ],
      cells: [
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 2},
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 1},
        {img:imgsrc, span: 1},
      ]
    });


  // makeIllustrationPage(doc, 
  //   {
  //     text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
  //     grid: [
  //       [{w:100,h:70, img:imgsrc}], 
  //       [{w:100,h:30, img:imgsrc}]
  //     ],
  //     colSpan: [1, 1]

  //   });

  //   makeIllustrationPage(doc, 
  //     {
  //       text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
  //       grid: [
  //         [{w:10, h:50, img:imgsrc},{w:90, h:50, img:imgsrc}], 
  //         [{w:100, h:50, img:imgsrc}]
  //       ],
  //       colSpan: [1, 2]
  //     });
  




  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)
  return doc;
};


examples.BOMTable = function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  addFontPack(doc);
  doc.setFontSize(7)


  let numberOfTableBreaks = 0;
  doc.autoTable({
    theme: 'plain',
    margin: { top: 15 },
    rowPageBreak: 'avoid',
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
      fontSize: 7
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
        cellBorderLeft(doc, data)
      } else if (data.column.index > 0 && (data.section === 'body' || (data.section === 'head' && data.row.index === 2))) {
        cellBorderLeft(doc, data, 200)
      }
      if (data.section === 'head' && data.row.index === 2) {
       cellBorderTop(doc, data)
      }
      if (data.section === 'body') {
        cellBorderTop(doc, data, 200)
      }
    },
    willDrawPage: function (data) {
      numberOfTableBreaks +=1;
      // Header
      addPageHeader(doc, data)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
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

function addPageNumber(doc) {
  var str ='Page ' + doc.internal.getNumberOfPages() + ' of ' + totalPagesExp
  doc.setFont('dinsmallcapspdf')
  doc.setTextColor(40)
  doc.text(str, 320, 9, { align: 'right' })
}

function addPageHeader(doc, data) {
  doc.setFont('dinsmallcapspdf')
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
}



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

function bodyRows(rowCount = 10) {
  var body = []
  for (var j = 1; j <= rowCount; j++) {
    body.push({
      image: '',
      supplier: 'Global development',
      material: 'brSPL70LR/RGD 3L PRO',
      paidby: 'Norrøna',
      size: '180 cm',
      wheretouse: 'Main sewing thread\nFront zipper\nPockets',
      materialtype: 'Zipper - Ready Length',
      consume: 'CM',
      waste: '3%',
      shrink: '0%',
      csp3cons: '230',
      patternrotation: '100',
      garmentrotation: '100',
      grading: 'no',
    })
  }
  body.splice(3, 0, {seperatorLabel: 'Fabrics'});
  body.splice(12, 0, {seperatorLabel: 'Zippers'});
  return body
}



function getDataUri (url) {
  return new Promise(resolve => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); // getting images from external domain

    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      // next three lines for white background in case png has a transparent background
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; /// set white fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.getContext('2d').drawImage(this, 0, 0);

      resolve({base64: canvas.toDataURL('image/jpeg'), width:canvas.width, height:canvas.height});
    };

    image.src = url;
  });
}


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

function cellBorderLeft(doc, data, color = 200) {
  doc.setDrawColor(color)
  doc.line(
    data.cell.x,
    data.cell.y,
    data.cell.x,
    data.cell.y + data.cell.height,
  )
}

function cellBorderRight(doc, data, color = 200) {
  doc.setDrawColor(color)
  doc.line(
    data.cell.x + data.cell.width,
    data.cell.y,
    data.cell.x + data.cell.width,
    data.cell.y + data.cell.height,
  )
}


function cellBorderTop(doc,data, color=200) {
  doc.setDrawColor(color)
  doc.line(
    data.cell.x,
    data.cell.y,
    data.cell.x + data.cell.width,
    data.cell.y,
  )
}