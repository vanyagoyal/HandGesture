Webcam.set({
    height:300 ,
    width:350 ,
    image_format:'png' ,
    png_quality:90
});

camera = document.getElementById("live");
Webcam.attach(camera);

function snap(){
    Webcam.snap(function(data_url) {
        document.getElementById("result").innerHTML = '<img id="cap_img" src="'+data_url+'">'
    });
}

console.log("Ml5 Version:-" , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LEM7t9dZ3/model.json',loaded);

function loaded(){
    console.log("Model Loaded!!");
}

function predict(){
    image = document.getElementById("cap_img");
    classifier.classify(image , gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else {
        console.log(result);

        document.getElementById("r_obj_name").innerHTML = result[0].label;
        gesture = result[0].label;
        speak = "";

        if (gesture == "Victory"){
            speak = "That was the marvellous victory";
            document.getElementById("r_icon").innerHTML = "&#x270C;";
        }
        else if (gesture == "Good Luck"){
            speak = "Best Of Luck";
            document.getElementById("r_icon").innerHTML = "&#129310;";
        }
        else if (gesture == "Amazing"){
            speak = "This is Amazing";
            document.getElementById("r_icon").innerHTML = "&#128076;";
        }
        else if (gesture == "OK"){
            speak = "Ok done";
            document.getElementById("r_icon").innerHTML = "&#128077;";
        }
        else if (gesture == "Corna"){
            speak = "Lets rock it";
            document.getElementById("r_icon").innerHTML = "&#129311;";
        }
        speak1();
    }
}

function speak1(){
    var voice = window.speechSynthesis;
    data = speak;
    var utter = new SpeechSynthesisUtterance(data);
    utter.rate = 0.6;
    voice.speak(utter);
}