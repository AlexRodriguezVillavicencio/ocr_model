//Prepare form data
var formData = new FormData();
// formData.append("file", fileToUpload);
formData.append("url", "URL-of-Image-or-PDF-file");
formData.append("language"   , "eng");
formData.append("apikey"  , "K87428168588957");
formData.append("isOverlayRequired", True);
//Send OCR Parsing request asynchronously
jQuery.ajax({
url: 'https://api.ocr.space/parse/image',
data: formData,
dataType: 'json',
cache: false,
contentType: false,
processData: false,
type: 'POST',
success: function (ocrParsedResult) {
//Get the parsed results, exit code and error message and details
var parsedResults = ocrParsedResult["ParsedResults"];
var ocrExitCode = ocrParsedResult["OCRExitCode"];
var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
var errorMessage = ocrParsedResult["ErrorMessage"];
var errorDetails = ocrParsedResult["ErrorDetails"];
var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
console.log('estamos en la devuelta de la api:');
console.log(JSON.stringify(parsedResults));
}
})
// //If we have got parsed results, then loop over the results to do something
// if (parsedResults!= null) {
// //Loop through the parsed results
// $.each(parsedResults, function (index, value) {
// var exitCode = value["FileParseExitCode"];
// var parsedText = value["ParsedText"];
// var errorMessage = value["ParsedTextFileName"];
// var errorDetails = value["ErrorDetails"];

// var textOverlay = value["TextOverlay"];
// var pageText = '';
// switch (+exitCode) {
// case 1:
// pageText = parsedText;
// break;
// case 0:
// case -10:
// case -20:
// case -30:
// case -99:
// default:
// pageText += "Error: " + errorMessage;
// break;
// }

// $.each(textOverlay["Lines"], function (index, value) {

// });



// });
// }
// }
// });