// CURSOR

var cursor = document.querySelector('.Cursor');
var cursorinner = document.querySelector('.Cursor2');

document.addEventListener('mousemove', function(e){

    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`

    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';

    cursor.style.opacity = '100%'
    cursorinner.style.opacity = '100%'
});

document.addEventListener('mouseleave', function(){

    cursor.style.opacity = '0%'
    cursorinner.style.opacity = '0%'
});

// File upload

var Output = document.querySelector(".Output")

var UploadButton = document.getElementById("Upload")
var UploadValue = ""

function FileUploaded(){

    const [file] = UploadButton.files
    const reader = new FileReader()

    reader.addEventListener("load", () => {

        Output.innerText = reader.result
        
    }, false)

    if (file) {

        reader.readAsText(file);
    }
}