// Cursor

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

// LOAD

var body = document.body
var Loading = document.querySelector('.Loading')

var Loaded = false
var Skipped = false // FOR SKIP LOAD CATEGORY

function FinishLoading(){

    document.querySelector('html').style.overflowY = 'scroll'
    Loading.style.opacity = '0%'
    
    setTimeout(function(){Loading.remove()}, 2400)
};

// ALT VERSION

document.onreadystatechange = () => {
    if (document.readyState === "interactive" && Loaded == false && Skipped == false) {
      
        Loaded = true

        document.getElementById('LoadStatus').innerHTML = "Successfully loaded!"
        setTimeout(FinishLoading, 2000)

        console.log("Loaded")
    }
  };

// SKIP LOAD

document.addEventListener('mousedown', function(){

    if (Skipped == false && Loaded == false) {

        Skipped = true

        document.getElementById('LoadStatus').innerHTML = "Loading skipped!"
        setTimeout(FinishLoading, 2000)

        console.log("Skipped")
    }
})