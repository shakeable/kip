let textArea = document.getElementById('text-area');
let inputSpeed = document.getElementById('text-speed');
let buttonPlay = document.getElementById('play-button');
let buttonPause = document.getElementById('pause-button');
let buttonStop = document.getElementById('stop-button');

buttonPlay.addEventListener('click', ()=>{
    console.log("clicked play");
    playText(textArea.value);
})

buttonPause.addEventListener('click', ()=>{
    console.log("clicked pause")
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
})

buttonStop.addEventListener('click', ()=>{
    console.log("clicked stop")
    speechSynthesis.resume();
    speechSynthesis.cancel();
})

let ssu = new SpeechSynthesisUtterance();
let boundary;

ssu.addEventListener('end', ()=>{
    console.log('END event fired');
    textArea.disabled = false;
})

ssu.addEventListener('boundary',(e)=>{
    boundary = e.charIndex;
})

const playText = (text2play) =>{
    if (speechSynthesis.speaking && speechSynthesis.paused) {
        return speechSynthesis.resume();
    }

    if (!speechSynthesis.speaking)  {  
        console.log("Text:"+text2play);
        ssu.text = text2play;
        ssu.rate = inputSpeed.value || 1;
    
        speechSynthesis.speak(ssu);
        textArea.disabled = true;
    }
}

