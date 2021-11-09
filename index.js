// Import stylesheets
import './style.css';
// import {toDataURL} from 'convert_image_to_base64.mjs';
// import jsPDF from "jspdf";
// import domtoimage from 'dom-to-image';

// pdf_template
// {
//   title;
//   description;
//   image_src;
//   fill_color;
//   text_color;
//   company_name;
//   company_logo
//   orientation;
// }

//// setup 
//// js-pdf can only take rgb colors as a number array
//// all values are literals, number | string
//// A4 page (210 x 297 mm) in pixels = (3508 x 2480 px)
//#region images need to be converted to base64 to work with js-pdf
////Test
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// toDataURL('https://avatars.githubusercontent.com/u/11679069?s=400&u=6fa22fb7fa7bd50a89a5ecd20f2a1cefeeabd32c&v=4', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })
//#endregion


const orientationTypes = ['p', 'l'];
const _title = 'Test Title',
const _title_size = 50,
const _font_family = 'Ariel',
const _description = 'Test Description',
const _descriptions_size = 20,
// const _image_src = '',
const _fill_color = [0, 174, 239],
const _text_color = [255, 255, 255],
const _company_logo = '',
const _company_name = 'Kudos Health',
const _orientation = orientationTypes[0]

const generate_pdf_function = async() => {
  console.clear()
  console.log('generate_pdf_function start');
  // #region temp values
  let image_src = document.getElementById('_qr_image').src;
  console.log(`image src: ${image_src}`)
  // #endregion
  var doc = new jsPDF({ unit: 'px', orientation: `${_orientation}` });

  //// both .setFillColor and .rect are required to set background color
  //// fill color is the color,
  //// the rect is a rectangle that is stretched over the page
  doc.setFillColor(_fill_color[0],_fill_color[1],_fill_color[2],);
  doc.rect(0, 0, 3508, 2480, 'F'); // A4 dimention
  doc.setFont(_font_family);
  
  doc.setFontSize(_title_size);
  doc.setTextColor(_text_color[0], _text_color[1], _text_color[2]);
  doc.text(`${_title}`,40, 100);
  
  doc.setFontSize(_descriptions_size);
  doc.setTextColor(_text_color[0], _text_color[1], _text_color[2]);
  doc.text(`${_description}`, 40, 60);

  // let _image_src = document.getElementById('_qr_image').src;
  // console.log(_image_src)
  // let dataUrl;
  // await toDataURL(_image_src, (dataUrl)=>{
  // console.log(dataUrl)})  

  // var img = new Image()
  // img.src= dataUrl;
  // console.log(`dataUrl : ${dataUrl}`)
  // console.log(`image src : ${img.src}`)
  // doc.addImage(img, 'JPEG', 100, 100, 100, 100)  


  // img.src = document.getElementById('_qr_image').src;
  // console.log(img.src)
  // doc.addImage(img, 'JPEG', 10, 78, 12, 15)  
  // doc.text(name, 40, 20);
  // doc.setFontSize(30);
  // doc.text(this.titleMC, 40, 60);
  // doc.setFontSize(20);
  // doc.text("Type: " + this.coinOrPoints, 40, 70);
  // doc.text("Amount: " + this.coinMC, 40, 80);
  // var qr = document.getElementById("currentQRCode");
  // console.log(qr);
  // //document.body.appendChild(img);
  // doc.addImage(image, "JPEG", 140, 260, 60, 20);
  // doc.addImage(placeholder, "JPEG", 0, 230, 60, 60);
  // doc.setTextColor(255, 255, 255);

  doc.save('QR-Code.pdf');
  // domtoimage.toPng(qr).then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  //     doc.addImage(img, "JPEG", 40, 90, 175, 90);
  //     doc.save("QR-Code.pdf");
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
};

(() => {
  console.log('start');
  document
    .getElementById('btn')
    .addEventListener('click', generate_pdf_function);

})();
