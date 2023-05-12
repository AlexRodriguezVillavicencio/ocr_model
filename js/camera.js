button_detection = document.querySelector("#snap")
button_detection.disabled = true;

function startWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video:{
      width: 200,
      height:50,
      facingMode: 'environment'
  }})
  .then((stream) => {
   window.localStream = stream;
   webcam_video.srcObject = stream;
  })
  .catch((error) => {console.log(error)});
  button_detection.disabled = false;
  }
  else {
    console.log('La API de MediaDevices no es compatible con este navegador.');
  }
}

function stopWebcam() {
  localStream.getVideoTracks()[0].stop();
  webcam_video.src = '';
  context.clearRect(0, 0,200,50);
  button_detection.disabled = true;
}