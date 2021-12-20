//generating a text file
function generateTxtFile(text) {
    var textFile = null;
    var data = new Blob([text], { type: 'text/plain' });

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
}

function create() {
    Swal.fire({
        title: "Great!",
        
        
        type: "success",
        confirmButtonText: "Awesome!",
        timer: 3000,
        icon: "success",
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
    text = document.getElementById('script').textContent;
    var link = document.createElement('a');
    link.href = generateTxtFile(text);
    link.download = 'note.txt';
    link.click();

}

if ("webkitSpeechRecognition" in window) {
    let recognition = new window.webkitSpeechRecognition();
    let finalTranscript = '';
    recognition.lang = 'en-US';
    recognition.lang = document.querySelector("#select_dialect").value;

    recognition.onstart = () => {
        document.querySelector("#start").innerHTML = "Listening...";
    }
    recognition.onerror = () => {
        document.querySelector("#status").style.display = "none";
        console.log("error");
    }
    recognition.onend = () => {
        document.querySelector("#status").style.display = "none";
        document.querySelector("#start").innerHTML = "Start";
        console.log("Speech Recognition Ended");
    };

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript;
        console.log(transcript);

        document.getElementById("script").innerText = document.getElementById("script").innerHTML +" "+ transcript;

    }

    document.querySelector("#start").onclick = () => {
        recognition.start();
    };
    document.querySelector("#stop").onclick = () => {
        recognition.stop();
    };
    document.querySelector("#clear").onclick = () => {
        document.querySelector("#script").innerHTML = "";
    };
    document.querySelector("#save").onclick = () => {
        create();
    };
    document.querySelector("#copy").onclick = () => {
        var text = document.getElementById("script").textContent;
        navigator.clipboard.writeText(text);
        alert("Copied the text: " + text);
    }
} else {
    console.log("Speech Recognition Not Available");
}
