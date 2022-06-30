x = 0;
y = 0;

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
    apple = loadImage("apple.png");
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    to_number = Number(content);
    console.log(to_number)
    if (Number.isInteger(to_number)) {
        draw_apple = "set";
        document.getElementById("status").innerHTML = "Started Drawing Apple.";
    } else {
        document.getElementById("status").innerHTML = "Speak a Number.";
    }
}

function setup() {
    canvas = createCanvas(1200, 900);
}

function draw() {
    if (draw_apple == "set") {
        document.getElementById("status").innerHTML = to_number + " Apples drawn";
        for (var i = 1; i <= to_number; i++) {
            x = Math.floor(Math.random() * 1150);
            y = Math.floor(Math.random() * 850);
            image(apple, x, y, 50, 50);
        }
        draw_apple = "";
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = to_number + "Apples drawn";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}