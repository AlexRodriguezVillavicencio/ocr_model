button_detection = document.querySelector("#snap")
button_detection.disabled = true;

const stopButton = document.getElementById("stopButton");
stopButton.style.display = "none";

const initButton = document.getElementById("initButton");

const canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.createElement('video');

canvas.width = 640;
canvas.height = 480;

const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext('2d');
const video2 = document.createElement('video');
canvas2.width = 320;
canvas2.height = 80;

let animationId;
let animationRunning = false;

function drawVideoFrame() {

  if (!animationRunning) return;

  // context.filter = 'blur(5px)';
  // context.drawImage(video, 0, 0, 640, 480, 0, 0, canvas.width, canvas.height);
  // context.filter = 'none';

  const dwidth = 320;
  const dheight = 80;
  const dx = canvas.width/2 - dwidth/2;
  const dy = canvas.height/2 - dheight/2;

  context.drawImage(video, dx, dy, dwidth, dheight, dx, 20, dwidth, dheight);
  context2.drawImage(video, dx, dy, dwidth, dheight, 0, 20, dwidth, dheight);
  animationId = requestAnimationFrame(drawVideoFrame);
}

function startWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video:{
      facingMode: 'environment'
  }})
  .then((stream) => {
    window.globalStream = stream;
    video.srcObject = stream;
    video.autoplay = true;

    const track = stream.getVideoTracks()[0];
    const settings = track.getSettings();
    const w = settings.width;
    const h = settings.height;
    window.wGlobal = w;
    window.hGlobal = h;

    video.addEventListener('loadedmetadata', function() {
      animationRunning = true;
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
  cancelAnimationFrame(animationId);
  stopButton.style.display = "none";
  initButton.style.display = "block";
  globalStream.getVideoTracks()[0].stop();
  button_detection.disabled = true;
  animationRunning = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
}