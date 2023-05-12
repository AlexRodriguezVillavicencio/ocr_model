button_detection = document.querySelector("#snap")
button_detection.disabled = true;

function startWebcam() {
  navigator.mediaDevices.getUserMedia({video:{
       width: 560,
       height:400
  }})
  .then((stream) => {
    window.localStream = stream;
    webcam_video.srcObject = stream;
  })
  .catch((error) => {console.log(error)});
  button_detection.disabled = false;

}

function stopWebcam() {
  localStream.getVideoTracks()[0].stop();
  webcam_video.src = '';
  context.clearRect(0, 0,280,200);
  button_detection.disabled = true;
}