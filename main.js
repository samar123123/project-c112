prediction_1="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});


camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yt1hznkX9/model.json',modelLoaded);
function modelLoaded(){
    console.log("model is loaded",modelLoaded);
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is - "+prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
 if(error){
    console.log(error);
 }
 else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;

    prediction_1=results[0].label;

  speak();

  if(results[0].label == "right"){
  document.getElementById("update_emoji").innerHTML="&#9754;";
  }

  if(results[0].label == "left"){
    document.getElementById("update_emoji").innerHTML="&#9755;";
    }

    if(results[0].label == "up"){
        document.getElementById("update_emoji").innerHTML="&#9757;";
        }

 }

}