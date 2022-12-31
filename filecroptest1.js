// all pages crop successfully for flipkart

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function cropPDF(inputPath, outputPath, pageNumber, x, y, width, height) {
  // Read the input PDF file
  const pdfDoc = await PDFDocument.load(fs.readFileSync(inputPath));

//   Loop through all pages in the PDF
for (let i = 0; i < pdfDoc.getPages().length; i++) {


  // Get the page that you want to crop
  let page = pdfDoc.getPage(i);

  // Set the crop box for the page
  page.setCropBox(x, y, width, height);
}
  // Save the output PDF file
  fs.writeFileSync(outputPath, await pdfDoc.save());
}


// call cropPDF function
cropPDF('fileupload.pdf', 'outputme.pdf', 0, 170, 467, 255, 353)
  .then(() => {
       console.log("PDF is cropped");
    // PDF has been cropped
  })
  .catch((error) => {
       console.log(error);
  });


