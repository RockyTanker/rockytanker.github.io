// Cursor

var cursor = document.querySelector('.Cursor');
var cursorinner = document.querySelector('.Cursor2');

document.addEventListener('mousemove', function(e){

    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`

    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';

    console.log('WHAT')
});