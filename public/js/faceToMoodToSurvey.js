// $(document).ready(function () {
//     var fileUploadInput = $("#field-fileupload");
//     fileUploadInput.bind('change', function (e) {
//         if (fileUploadInput.val() != "") {
//             console.log(fileUploadInput.val());
//         }
//     });
// });


function processImage() {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = '7012c7c0266846608913197a8f18e374';

    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change 
    // this region.
    var uriBase =
        'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "age,gender,headPose,smile,facialHair,glasses,emotion," +
            "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };

    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

        .done(function (data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));


            $("#h1").val(data[0].faceAttributes.emotion.anger);
            $("#h2").val(data[0].faceAttributes.emotion.contempt);
            $("#h3").val(data[0].faceAttributes.emotion.disgust);
            $("#h4").val(data[0].faceAttributes.emotion.fear);
            $("#h5").val(data[0].faceAttributes.emotion.happiness);
            $("#h6").val(data[0].faceAttributes.emotion.neutral);
            $("#h7").val(data[0].faceAttributes.emotion.sadness);
            $("#h8").val(data[0].faceAttributes.emotion.surprise);
            $("#h9").val(data[0].faceAttributes.makeup.eyeMakeup);
            $("#h10").val(data[0].faceAttributes.makeup.lipMakeup);
            $("#h11").val(data[0].faceAttributes.facialHair.moustache);
            $("#h12").val(data[0].faceAttributes.facialHair.beard);
            $("#h13").val(data[0].faceAttributes.smile);

        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

};

