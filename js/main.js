  
const snap = document.getElementById("snap");
const insertText = document.getElementById("insertText");

// var contador = []
snap.addEventListener("click", function() {
     // generate image
    const dataURL = canvas.toDataURL(); // generate base 64
    console.log(dataURL);

    const formData = new FormData();
    formData.append("base64Image", dataURL);
    formData.append("language"   , "eng");
    formData.append("apikey"  , "K87428168588957");
    fetch('https://api.ocr.space/parse/image',{
        method: 'POST', 

        body: formData
      })
   .then((response) => response.json())
   .then((ocrParsedResult) => 
   {
    // Obtener los resultados analizados, código de salida de OCR y otros datos
    const parsedResults = ocrParsedResult["ParsedResults"];
    // const ocrExitCode = ocrParsedResult["OCRExitCode"];
    // const isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
    // const errorMessage = ocrParsedResult["ErrorMessage"];
    // const errorDetails = ocrParsedResult["ErrorDetails"];
    // const processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
    
    console.log('Estamos en la respuesta de la API:');
    insertText.innerHTML = parsedResults[0]['ParsedText'];
  })
  .catch(error => {
    console.log('Error en la solicitud:', error);
  }
   );
});

function likePrediction(){
  document.getElementById('likeButton').style.display = 'none';
  document.getElementById('unlikeButton').style.display = 'none';
  // 
  // 

}

function sendUnlikPrediction(){
  document.getElementById('likeButton').style.display = 'none';
  document.getElementById('unlikeButton').style.display = 'none';
  // 
  // 

}


const unlikeButton = document.getElementById('unlikeButton')
const iUnlikeButton = document.querySelector('#unlikeButton i');

unlikeButton.onclick = () => {
  if (iUnlikeButton.classList.contains('fa-thumbs-down')){
    document.getElementById('insertText').style.display = 'none';
    document.getElementById('inputText').style.display = 'block';
    document.getElementById('likeButton').disabled = true;
    const unlike = document.querySelector('#unlikeButton i')
    unlike.classList.remove('fa-thumbs-down');
    unlike.classList.add('fa-paper-plane')
    unlikeButton.onclick = sendUnlikPrediction;
  } 
}