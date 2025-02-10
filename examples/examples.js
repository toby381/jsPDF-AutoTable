var examples = {}
window.examples = examples
var totalPagesExp = 'totalpagescountstringtobereplaced'

const margin =  {
  left: 14
}
const imageAreaWidth = 200; 
const imageAreaHeight = 170;
const cellPadding = 2;

examples.frontPage = function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  addFontPack(doc);
  doc.setFont('DINBold')
  doc.setFontSize(42)
  doc.text("Tech Pack", margin.left, 40);
  
  
  
  doc.setFontSize(7)
  addPageHeader(doc)
  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)
  // addPageNumber(doc);

  return doc
}

examples.mainIllustration = async function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  const img = await getDataUri('examples/img/mainPackShot.png')
  addFontPack(doc);
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text("Norrøna Tech Pack", margin.left, 20);
  doc.setFontSize(21)
  doc.text("1001-20 lofoten Gore-tex Pro Plus Jacket M's", margin.left, 35);
  doc.addImage(img.base64, 'JPEG', margin.left, 40, 270, 0);      

  
  
  doc.setFontSize(7)
  addPageHeader(doc)
  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)
  // addPageNumber(doc);

  return doc
}


examples.variantIllustration = async function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  const img = await getDataUri('examples/img/colorPackShot.png')
  addFontPack(doc);
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text("Style and Color Overview", margin.left, 20);
  doc.setFontSize(10)

  const startX = margin.left;
  const startY = 40;
  const width = imageAreaWidth / 3;
  const height  = 80;
  const padding = 30
  let row = 0;
  let col = 0;
  for(let i = 0; i < 5; i++) {
    const xpos = startX + (col*(width + padding))
    const ypos = startY + (row*height);
    doc.addImage(img.base64, 'JPEG', xpos, ypos, width, 0);      
    doc.text("1001-21\nOlveNight\nS-XL\nCarry over color",xpos, ypos + 40);
    if((i+1) % 3 === 0) {
      row++;
      col = 0;
    } else {
      col++;
    }
  }
  doc.setFontSize(7)
  addPageHeader(doc)
  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)
  // addPageNumber(doc);

  return doc
}


examples.tableOfContent = async function () {
  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  addFontPack(doc);
  doc.setFont('DINNormal')
  doc.setFontSize(10)
  doc.text("Page", 150, 30);
  doc.text("Main Sections", 170, 30);
  for(let i = 0; i < 30; i++) {
    doc.text(`${i+1}`, 150, 40 + (i*5));
    doc.text('1.', 170, 40 + (i*5));
    doc.text('Product design drawing', 180, 40 + (i*5));

  }
  
  
  
  doc.setFontSize(7)
  addPageHeader(doc)
  doc.setFont('dinsmallcapspdf')
  doc.putTotalPages(totalPagesExp)
  // addPageNumber(doc);

  return doc
}



examples.drawings = async function () {

  var doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
  })
  const img0 = await getDataUri('examples/img/techpng.png')
  const img1 = await getDataUri('examples/img/Asset 1.png')
  const img2 = await getDataUri('examples/img/Asset 2.png')
  const img3 = await getDataUri('examples/img/Asset 3.png')
  const img4 = await getDataUri('examples/img/Asset 4.png')
  const img5 = await getDataUri('examples/img/Asset 5.png')
  const img6 = await getDataUri('examples/img/Asset 6.png')
  const img7 = await getDataUri('examples/img/Asset 7.png')
  const img8 = await getDataUri('examples/img/Asset 8.png')
  const img9 = await getDataUri('examples/img/Asset 9.png')
  const img10 = await getDataUri('examples/img/Asset 10.png')
  const img11 = await getDataUri('examples/img/Asset 11.png')

  addFontPack(doc);

  doc.setFontSize(7)
  makeIllustrationPage(doc, 
    {
      text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
      columns: [{ dataKey: 'col1', width: 100 }],
      rows: [{ name: 'row1', height: 100}],
      cells: [{img:img0, span: 1, id: 'cell1', title: 'Illustration title 1'}]
    });


    makeIllustrationPage(doc, 
      {
        text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
        columns: [{ dataKey: 'col1', width: 100 }],
        rows: [
          { name: 'row1', height: 60},
          { name: 'row2', height: 40}
        ],
        cells: [
          {img:img1, span: 1, id: 'cell1', title: 'Illustration title 1'},
          {img:img2, span: 1, id: 'cell2', title: 'Illustration title 2'}
        ]
      });

    makeIllustrationPage(doc, 
      {
        text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
        columns: [
          { dataKey: 'col1', width: 50 },
          { dataKey: 'col2', width: 50 }
        ],
        rows: [
          { name: 'row1', height: 60},
          { name: 'row2', height: 40}
        ],
        cells: [
          {img:img3, span: 1, id: 'cell1', title: 'Illustration title 1'},
          {img:img4, span: 1, id: 'cell2', title: 'Illustration title 2'},
          {img:img5, span: 2, id: 'cell3', title: 'Illustration title 3'},
          {span: 0, id: 'cell4'}
        ]
      });

      makeIllustrationPage(doc, 
        {
          text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
          columns: [
            { dataKey: 'col1', width: 50 },
            { dataKey: 'col2', width: 50 }
          ],
          rows: [
            { name: 'row1', height: 60},
            { name: 'row2', height: 40}
          ],
          cells: [
            {img:img6, span: 1, id: 'cell1', title: 'Illustration title 1'},
            {img:img7, span: 1, id: 'cell2', title: 'Illustration title 2'},
            {img:img8, span: 1, id: 'cell3', title: 'Illustration title 3'},
            {img:img9, span: 1, id: 'cell4', title: 'Illustration title 4'},
          ]
        });
  

        makeIllustrationPage(doc, 
          {
            text:'1. Brim mesh\n2. brim wire\n3. 3 edgle tape 20 mm\nHow to:',
            columns: [
              { dataKey: 'col1', width: 80 },
              { dataKey: 'col2', width: 20 }
            ],
            rows: [
              { name: 'row1', height: 100},
            ],
            cells: [
              {img:img10, span: 1, id: 'cell1', title: 'Illustration title 1'},
              {img:img11, span: 1, id: 'cell2', title: 'Illustration title 2'},
            ]
          });






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
      if (data.section === 'body') {
          if(data.cell.colSpan === 14) {
            console.log(data)
          }
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
      addPageHeader(doc)
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

examples.colorMatrix = function () {
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
      { dataKey: 'col1' },
      { dataKey: 'col2' },
      { dataKey: 'col3' },
      { dataKey: 'col4' },
      
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
    head: [],
    body: [],
    didParseCell: (data) => {
    },
    didDrawCell: (data) => {
    },
    willDrawPage: function (data) {
    },
    didDrawPage: function () {
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

function addPageHeader(doc) {
  doc.setFont('dinsmallcapspdf')
  doc.setTextColor(40)
  if (LOGO_SMALL) {
    doc.addImage(LOGO_SMALL, 'JPEG', margin.left, 5, 18, 5)
  }

  doc.text('SS2425', margin.left + 23, 9)
  doc.text('100120',margin.left + 53, 9)
  doc.text(
    'lofoten Goretex pro plus Jacket Ms',
    margin.left + 78,
    9,
  )
  doc.text('031220', margin.left + 200, 9)
  doc.setDrawColor(40)
  doc.line(margin.left, 13, 281, 13)
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
  body.splice(3, 0, {image: { content: 'Fabrics', colSpan: 14, styles:{fillColor: 200 }}});
  body.splice(15, 0, {image: { content: 'Zippers', colSpan: 14, styles:{fillColor: 200 } }});
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
      addPageHeader(doc)
    },
    didDrawPage: function () {
      addPageNumber(doc)
    },
  })
}


function addIllustrationGrid(doc, data, gridSettings) {
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
        const cellContent = { column: col.dataKey, content: `${cell.title} [${cell.id}]`, colSpan: cell.span, rowSpan: 1, styles: { minCellHeight: imageAreaHeight * (row.height / 100)  } };
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
    didParseCell: async (data) => {
      if (data.section === 'body' && data.cell.raw && data.cell.raw.content) {
        const match = data.cell.raw.content.match(/(?<=\[)[^\][]*(?=])/g);
        const imageId = match[0];
        data.cell.text[0] = data.cell.text[0].replace(`[${imageId}]`, '');
        if(imageId) {
          const cellData = gridSettings.cells.find(c => c.id === imageId);
          if(cellData) {
            data.cell.imgObj = cellData.img;
          }
        }
      }

    },
    didDrawCell: async (data) => {
      if (data.section === 'body' && data.cell.imgObj) {
        const obj = data.cell.imgObj;
        const str = obj.base64;
        const cellProp = (data.cell.width-4) / (data.cell.height - 10);
        const imgProp = obj.width / obj.height;
        if(imgProp <= cellProp) {
          doc.addImage(str, 'JPEG', data.cell.x+2, data.cell.y+8, 0, data.cell.height-10);      
        } else {
          doc.addImage(str, 'JPEG', data.cell.x+2, data.cell.y+2, data.cell.width-4, 0);      
        }
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
