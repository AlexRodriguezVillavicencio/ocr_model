button_detection = document.querySelector("#snap")
button_detection.disabled = true;

// function startWebcam() {
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({video:{
//       // width: 200,
//       height:50,
//       facingMode: 'environment'
//   }})
//   .then((stream) => {
//    window.localStream = stream;
//    webcam_video.srcObject = stream;
//   })
//   .catch((error) => {console.log(error)});
//   button_detection.disabled = false;
//   }
//   else {
//     console.log('La API de MediaDevices no es compatible con este navegador.');
//   }
// }

function startWebcam() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        // Buscar la cámara con video disponible
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        if (videoDevices.length > 0) {
          const constraints = {
            video: {
              deviceId: videoDevices[0].deviceId,
              width: { exact: 200 },
              height: { exact: 50 },
              facingMode: 'environment'
            }
          };

          navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
              window.localStream = stream;
              webcam_video.srcObject = stream;
              button_detection.disabled = false;
            })
            .catch(function(error) {
              console.log('Error al acceder a la cámara:', error);
            });
        } else {
          console.log('No se encontró ninguna cámara disponible.');
        }
      })
      .catch(function(error) {
        console.log('Error al enumerar dispositivos:', error);
      });
  } else {
    console.log('La API de MediaDevices no es compatible con este navegador.');
  }
}

function stopWebcam() {
  localStream.getVideoTracks()[0].stop();
  webcam_video.src = '';
  context.clearRect(0, 0,200,50);
  button_detection.disabled = true;
}