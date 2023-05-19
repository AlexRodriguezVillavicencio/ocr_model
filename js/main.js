  
const containtText = document.getElementById("containtText");
let parsedText;

button_detection.addEventListener("click", function() {
  var htmlContent = `
  <div class="text__group">
  <div class="text">
      <div id="insertText"></div>
  </div>
  <button id="likeButton" onclick="likePrediction()">    
      <i class="fa-regular fa-thumbs-up"></i>
  </button>
  <button id="unlikeButton" onclick="contentUnLike()">
      <i class="fa-regular fa-thumbs-down"></i>
  </button>
  </div>
    `;
  containtText.innerHTML = htmlContent
  button_detection.disabled = true;
  
  const insertText = document.getElementById("insertText");

    dataURL = canvas.toDataURL('image/jpeg'); // generate base 64

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
    const parsedResults = ocrParsedResult["ParsedResults"];
    parsedText = parsedResults[0]['ParsedText'];
    insertText.innerHTML = parsedText;
    button_detection.disabled = false;
  })
  .catch(error => {
    console.log('Error en la solicitud:', error);
  }
   );
});

function contentUnLike(){
  const htmlUnLike = `
  <div class="text__group">
  <div class="text">
      <input id="inputText" type="text">
  </div>
  <button id="unlikeButton" onclick="sendUnlikPrediction()">
      <i class="fa-regular fa-paper-plane"></i>
  </button>
  </div>
    `;
  containtText.innerHTML = htmlUnLike;
  var inputText = document.getElementById("inputText");
  if (parsedText !== undefined) {
      inputText.value = parsedText;
    }
}

function likePrediction(){
  button_detection.disabled = true;
  const { formData, urlDate }  = formDataCSV("si");
  addPhoto(ProcessIMG(),parsedText, urlDate)
  addCSVtoS3(formData, urlDate);
  containtText.innerHTML = '';
  button_detection.disabled = false;
}

function sendUnlikPrediction(){
  const { formData, urlDate } = formDataCSV("no");
  addPhoto(ProcessIMG(),inputText.value, urlDate)
  addCSVtoS3(formData, urlDate);
  containtText.innerHTML = '';
  button_detection.disabled = false;
}