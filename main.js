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

function FinishLoading(){

    document.querySelector('html').style.overflowY = 'scroll'
    Loading.style.opacity = '0%'
};

document.addEventListener('load', () => {

    console.log('The page is fully loaded.');
    document.getElementById('LoadStatus').innerHTML = "Sucessfully loaded!"
    setTimeout(FinishLoading, 2000)
});

// SKIP LOAD

document.addEventListener('mousedown', function(){

    document.getElementById('LoadStatus').innerHTML = "Loading skipped!"
    setTimeout(FinishLoading, 2000)
})