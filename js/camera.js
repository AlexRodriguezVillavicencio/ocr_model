button_detection = document.querySelector("#snap")
button_detection.disabled = true;

const stopButton = document.getElementById("stopButton");
stopButton.style.display = "none";

const initButton = document.getElementById("initButton");

const canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.createElement('video');
canvas.height = 460;
canvas.width = 300;

function drawVideoFrame() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(drawVideoFrame);
}

function startWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video:{
      // width: 400,
      // height: 300,
      facingMode: 'environment'
  }})
  .then((stream) => {
   window.globalStream = stream;
   video.srcObject = stream;
   video.autoplay = true;

  video.addEventListener('loadedmetadata', function() {
    drawVideoFrame();
  });
  })
  .catch((error) => {console.log(error)});
  button_detection.disabled = false;
  initButton.style.display = "none";
  stopButton.style.display = "block";
  }
  else {
    console.log('La API de MediaDevices no es compatible con este navegador.');
  }
}

function stopWebcam() {
  stopButton.style.display = "none";
  initButton.style.display = "block";
  globalStream.getVideoTracks()[0].stop();
  button_detection.disabled = true;
}