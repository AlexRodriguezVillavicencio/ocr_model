  
// init camera
const webcam_video = document.querySelector('#webcam__video')
// webcam_video.style.transform = "scaleX(-1)";

// draw image 
const snap = document.getElementById("snap");
const canvas2 = document.getElementById('canvas2');
var context = canvas2.getContext('2d');
// canvas2.style.transform = "scaleX(-1)";

const texto_insertado = document.getElementById("textoInsertado");

// var contador = []
snap.addEventListener("click", function() {
    var countmatrix = [];
    
    context.drawImage(webcam_video, 0, 0); // generate image
    const dataURL = canvas2.toDataURL(); // generate base 64
    console.log(dataURL);

    const formData = new FormData();
    formData.append("base64Image", dataURL);
    formData.append("language"   , "eng");
    formData.append("apikey"  , "K87428168588957");
    fetch('https://api.ocr.space/parse/image',{
        method: 'POST', 
        // headers: {
        //  'Content-type': 'application/json',
        //  'Accept': 'application/json'
        // },
        body: formData
        // body: JSON.stringify({"image":dataURL})
      })
   .then((response) => response.json())
   .then((ocrParsedResult) => 
   {
    // Obtener los resultados analizados, código de salida de OCR y otros datos
    const parsedResults = ocrParsedResult["ParsedResults"];
    const ocrExitCode = ocrParsedResult["OCRExitCode"];
    const isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
    const errorMessage = ocrParsedResult["ErrorMessage"];
    const errorDetails = ocrParsedResult["ErrorDetails"];
    const processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
    
    console.log('Estamos en la respuesta de la API:');
    texto_insertado.innerHTML = parsedResults[0]['ParsedText'];
  })
  .catch(error => {
    console.log('Error en la solicitud:', error);
  }
   );
});

