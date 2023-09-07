var numberDrum = document.querySelectorAll(".drum").length;
var recording = false;
var recordedBeats = [];
var drumSheetContainer = document.getElementById("drumSheet");

for (var i = 0; i < numberDrum; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var buttonInnerHtml = this.innerHTML;
        makesound(buttonInnerHtml);
        buttonanimation(buttonInnerHtml);
        if (recording) {
            recordedBeats.push(buttonInnerHtml);
            updatedrumSheet();
        }
    });
}

document.addEventListener("keypress", function (event) {
    makesound(event.key);
    buttonanimation(event.key);
    if (recording) {
        recordedBeats.push(event.key);
        updatedrumSheet();
    }
});

function makesound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;
        case "j":
            var snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;
        case "k":
            var crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;
        case "l":
            var kick = new Audio('./sounds/kick-bass.mp3');
            kick.play();
            break;
        default:
            console.log(buttonInnerHtml);
    }
}

function buttonanimation(currentkey) {
    var activebutton = document.querySelector("." + currentkey);
    activebutton.classList.add("pressed");
    setTimeout(function(){
        activebutton.classList.remove("pressed");
    }, 100);
}

var recordButton = document.getElementById("recordButton");
var playButton = document.getElementById("playButton");

recordButton.addEventListener("click", function () {
    recording = true;
    recordedBeats = [];
    drumSheetContainer.innerHTML= '';
    alert("Recording started!")
});

playButton.addEventListener("click", function () {
    recording = false;
    playRecordedBeats();
});

function updatedrumSheet() {
    var drumSheetNotation = recordedBeats.join(' ');
    drumSheetContainer.innerHTML = drumSheetNotation;
}

function playRecordedBeats() {
    var index = 0;
    var interval = setInterval(function () {
        if (index < recordedBeats.length) {
            makesound(recordedBeats[index]);
            buttonanimation(recordedBeats[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 350);
}
