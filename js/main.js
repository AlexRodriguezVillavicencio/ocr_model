  
const snap = document.getElementById("snap");
const insertText = document.getElementById("insertText");

snap.addEventListener("click", function() {

    document.getElementById('snap').disabled = true;
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
    const processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
    
    setTimeout(() => {

      if (parsedResults[0]['ParsedText'].length !== 0){
        insertText.innerHTML = parsedResults[0]['ParsedText'];
        document.getElementById('snap').disabled = false;
      }
      else {
        insertText.innerHTML = "Sin resultado";
        document.getElementById('snap').disabled = false;
      }

    }, processingTimeInMilliseconds);
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
  document.getElementById('snap').disabled = false;

}


const unlikeButton = document.getElementById('unlikeButton')
const iUnlikeButton = document.querySelector('#unlikeButton i');

unlikeButton.onclick = () => {
  if (iUnlikeButton.classList.contains('fa-thumbs-down')){
    document.getElementById('insertText').style.display = 'none';
    document.getElementById('inputText').style.display = 'block';
    document.getElementById('likeButton').disabled = true;
    document.getElementById('snap').disabled = true;
    const unlike = document.querySelector('#unlikeButton i')
    unlike.classList.remove('fa-thumbs-down');
    unlike.classList.add('fa-paper-plane')
    unlikeButton.onclick = sendUnlikPrediction;
  } 
}