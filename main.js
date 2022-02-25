Webcam.set({
    height: 225,
    width:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function capture()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j5HUDRYJ6/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model is loaded");
}

function identify()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_family_member").innerHTML = results[0].label;
        document.getElementById("result_accuracy").innerHTML = (results[0].confidence.toFixed(3)) * 100 + "%";
    }
}