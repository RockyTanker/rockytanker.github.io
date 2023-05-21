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

        Output.innerHTML = "Invalid FILETYPE :( <br> The file type: " + file.type + " <br><br> ACCEPTED FILES are images... videos... audio.... and text files... !!! <br> - TankerJKT"
        
        if (file.type.match('text.*')) {

            reader.readAsText(file)
        } 
        
        if (file.type.match('video.*')) {

            Output.innerHTML = '<video src="' + URL.createObjectURL(file) + '" width=100% height=100% controls>'
        }

        if (file.type.match('audio.*')) {

            Output.innerHTML = '<audio src="' + URL.createObjectURL(file) + '" controls>'
        }

        if (file.type.match('image.*')) {

            Output.innerHTML = '<img src="' + URL.createObjectURL(file) + '" width=100% height=100%>'
        }
    }
}