button_detection = document.querySelector("#snap")
button_detection.disabled = true;

const stopButton = document.getElementById("stopButton");
stopButton.style.display = "none";

const initButton = document.getElementById("initButton");

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.createElement('video');
canvas.width = 320;
canvas.height = 80;

let animationId;
let animationRunning = false;

function drawVideoFrame() {

  if (!animationRunning) return;

  const dwidth = 320;
  const dheight = 80;
  const dx = wGlobal/2 - dwidth/2;
  const dy = hGlobal/2 - dheight/2;
  context.drawImage(video, dx, dy, dwidth, dheight, 0, 0, dwidth, dheight);
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

  document.getElementById('likeButton').style.display = "block";
  document.getElementById('unlikeButton').style.display = "block";
  document.querySelector('.text').style.display = "block";
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
  document.getElementById('likeButton').style.display = "none";
  document.getElementById('unlikeButton').style.display = "none";
  document.querySelector('.text').style.display = "none";
}