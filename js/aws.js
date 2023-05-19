const bucketName = "ocr-images-pre";
const bucketRegion = "us-east-2";
const IdentityPoolId = "us-east-2:fd704014-ce60-4040-8882-07272a5ac9c9";

AWS.config.update({
region: bucketRegion,
credentials: new AWS.CognitoIdentityCredentials({
IdentityPoolId: IdentityPoolId
})
});

const s3 = new AWS.S3({
apiVersion: "2006-03-01",
params: { Bucket: bucketName }
});

function addPhoto(file,fileName,urlDate) {
    const photoKey = "images/" + fileName + "_" + urlDate + ".jpeg";
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: photoKey,
        Body: file
      }
    });
  
    const promise = upload.promise();
    promise.then(
      function(data) {
        alert("cargado con éxito", data);
      },
      function(err) {
        return alert("no se pudo cargar: ", err.message);
      }
    );
  }

function addCSVtoS3(formData,urlDate) {

  const csvFileName = "tablas/"+formData.get("text")+ "_" + urlDate +".csv";

  const csvData = "url,text,prediction,metadata\n" +
                  formData.get("url") + "," +
                  formData.get("text") + "," +
                  formData.get("prediction") + "," +
                  formData.get("metadata");
                  
  const appendParams = {
    Bucket: bucketName,
    Key: csvFileName,
    Body: csvData,
    ContentEncoding: 'utf-8',
    ContentType: 'text/csv'
  };

  s3.putObject(appendParams, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}