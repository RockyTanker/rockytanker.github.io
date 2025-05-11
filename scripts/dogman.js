const gameSpace = document.getElementById("gameSpace")
const score = document.getElementById("score")
const flashbang = document.getElementById("flashbang")
const dogmanImages = [
    "../assets/clickthedogman/sillyDogman.png",
    "../assets/clickthedogman/depressedDogman.png"
]

var points = 0
var entities = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function clickedDogman(object) {
    points += 1
    score.innerText = "Score: " + points
    gameSpace.removeChild(object)
}

function clickedBomb(object) {
    var sound = document.createElement("audio")
    sound.src = "../assets/clickthedogman/flashbang.wav"
    document.body.appendChild(sound)
    flashbang.style.display = "block"
    sound.play()
    
    function crashBrowser() {window.close()}
    setTimeout(crashBrowser, 2000)
}

function spawnEntity() {
    var randomSelect = getRandomInt(5)

    if (randomSelect >= 3) {
        
        var newItem = document.createElement('img')
        newItem.src = dogmanImages[getRandomInt(2)]
        newItem.style.height = "5vh"
        newItem.style.position = "absolute"

        newItem.style.marginLeft = getRandomInt(gameSpace.clientWidth - newItem.offsetHeight)
        newItem.style.marginTop = getRandomInt(gameSpace.clientHeight - newItem.offsetHeight)
        newItem.onclick = function() {clickedDogman(newItem)}

        gameSpace.appendChild(newItem)

        function selfDestruct() {if (gameSpace.contains(newItem) == true) {gameSpace.removeChild(newItem)}}
        setTimeout(selfDestruct, 1500)

    } else {
        var newItem = document.createElement('img')
        newItem.src = "../assets/clickthedogman/nuclearBomb.png"
        newItem.style.height = "5vh"
        newItem.style.position = "absolute"

        newItem.style.marginLeft = getRandomInt(gameSpace.clientWidth - newItem.offsetHeight)
        newItem.style.marginTop = getRandomInt(gameSpace.clientHeight - newItem.offsetHeight)
        newItem.onclick = function() {clickedBomb(newItem)}

        gameSpace.appendChild(newItem)

        function selfDestruct() {if (gameSpace.contains(newItem) == true) {gameSpace.removeChild(newItem)}}
        setTimeout(selfDestruct, 1500)
    }
}

setInterval(spawnEntity, 500)