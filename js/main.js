  
// init camera
const webcam_video = document.querySelector('#webcam__video')
webcam_video.style.transform = "scaleX(-1)";

// draw image 
const snap = document.getElementById("snap");
const canvas2 = document.getElementById('canvas2');
var context = canvas2.getContext('2d');
canvas2.style.transform = "scaleX(-1)";

// var contador = []
snap.addEventListener("click", function() {
    var countmatrix = [];
    
    context.drawImage(webcam_video, 0, 0, 280,200); // generate image
    const dataURL = canvas2.toDataURL(); // generate base 64
    
    const formData = new FormData();
    formData.append("image", dataURL);
    
    fetch('http://127.0.0.1:8000/image',{
        method: 'POST', 
        headers: {
         'Content-type': 'application/json',
         'Accept': 'application/json'
        },
        // body: formData
        body: JSON.stringify({"image":dataURL})
      })
   .then((response) => response.json())
   .then((data) => 
   {
    const datos = "data:image/png;base64," + data.image;
    countmatrix.push(data.detections)
    // collecting the image
    var img = new Image();
    img.src = datos;
    
    img.onload = function() {
        context.drawImage(img, 0, 0,280,200);
    }

    for (let a = 0; a<countmatrix[0].length;a++){
        for(let b = 0; b < classes.length; b++){
            if (countmatrix[0][a] == classes[b]){
                datachart[b] += 1;
            }
        }
    }
    updateData(charttopbar, datachart)
   }
   );
});