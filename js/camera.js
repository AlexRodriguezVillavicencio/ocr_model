button_detection = document.querySelector("#snap")
button_detection.disabled = true;

const stopButton = document.getElementById("stopButton");
stopButton.style.display = "none";

const initButton = document.getElementById("initButton");

const canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const video = document.createElement('video');
canvas.height = 320;
canvas.width = 320;

function drawVideoFrame() {
  // // context.clearRect(0, 0, canvas.width, canvas.height);
  // context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // // Aplicar efecto de desenfoque a todo el canvas
  // context.filter = 'blur(5px)';
  // context.globalAlpha = 0.7;


  // // Dibujar la ventana de 200x50 sin efecto de desenfoque
  // const windowWidth = 200;
  // const windowHeight = 50;
  // const windowX = (canvas.width - windowWidth) / 2;
  // const windowY = (canvas.height - windowHeight) / 2;
  // context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Aplicar efecto de desenfoque a la mitad izquierda del canvas
  context.filter = 'blur(5px)';
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  // context.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar la cámara sin efecto de desenfoque en la mitad derecha del canvas
  context.filter = 'none';
  context.drawImage(video, 240, 80, 240, 80, 0, 220, 320, 60);

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