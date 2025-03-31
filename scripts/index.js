// Standard Functions
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
}}}

// Fetch cover article
const backgroundVideo = document.getElementById("backgroundVideo")
const coverTitle = document.getElementById("coverTitle")
const coverDesc = document.getElementById("coverDesc")
const coverTags = document.getElementById("coverTags")

const url = 'https://raw.githubusercontent.com/RockyTanker/rtk_data/main/projectArchive/index';
var result

fetch(url)
.then(function(response) {
    response.text().then(function(text) {
    result = text;

    getCover()
});});

function getCover() {
    var line = result.split("\n");
    var source = document.createElement('source');
    var coverResult = [];

    for (let i = 0; i < 4; i++) {

        if (i == 1) {
            var tagTable = line[8 + i].split(", ")
            coverResult.push(tagTable)
        } else {coverResult.push(line[8 + i]);}
    }

    coverTitle.textContent = coverResult[0]
    coverTitle.href = coverResult[3]
    coverDesc.textContent = coverResult[2]

    // Get tags
    const Tags = coverResult[1]

    for (let i = 0; i < Math.round(Tags.length / 4); i++) {
        var tagSelect = i * 4
        if (!Tags[tagSelect]) {return}

        var newTagInstance = document.createElement('div')
        newTagInstance.className = "coverTag"
        newTagInstance.style.color = Tags[tagSelect + 1]
        newTagInstance.style.backgroundImage = "linear-gradient(90deg," + Tags[tagSelect + 2] + "," + Tags[tagSelect + 3] + ")"
        newTagInstance.innerHTML = Tags[tagSelect]

        coverTags.appendChild(newTagInstance)
        console.log("complet!")
}};

// Typewriter
const greetingMessage = document.getElementById("greeting")
const greetings = ["Hello! hiiii", ":3 hii", "hello bro...", "sup g"]
const greeting = greetings[getRndInteger(0, greetings.length)]

var i = 0;
var speed1 = 50;
var speed2 = 10;
var greetDebounce = false

function typeGreeting() {
    if (i < greeting.length) {
        greetingMessage.innerHTML += greeting.charAt(i);
        i++;
        setTimeout(typeGreeting, speed1);
}};

function isElementIntoView(el) { 
    var e = document.querySelector(el);
    var rect = e.getBoundingClientRect();
    return window.innerHeight-rect.top >= 200; 
};

if (isElementIntoView("#greeting") && greetDebounce == false) {
    greetDebounce = true
    greetingMessage.innerText = "   "
    typeGreeting()
}

window.addEventListener("scroll", function(){
    if (isElementIntoView("#greeting") && greetDebounce == false) {
        greetDebounce = true
        greetingMessage.innerText = "   "
        typeGreeting()
}})  