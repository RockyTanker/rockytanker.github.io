// Initialization
const url = 'https://raw.githubusercontent.com/Ethan76167/TRIA.OS-Difficulty-List/refs/heads/main/migrated.md';
var result, fetched
var listArray = []

// Fetch data
//disabled for now
fetch(url)
.then(function(response) {
    response.text().then(function(text) {
    result = text;

    compileData()
});});

// Compile data
function compileData() {
    var separated = result.split('\n')
    var iteration

    // Phase 1: Get all lines
    for (let i = 0; i < separated.length; i++) {
        iteration = separated[i]
        
        // Phase 2: Get all valid lines
        if (iteration[0] + iteration[1] == "//") {
            
            var Overview = separated[i].split(' | ')
            var Meta = separated[i + 2].split(' | ')
            var Victors = separated[i + 4].split(', ')

            // Remove the // in the first data in Overview
            Overview[0] = Overview[0].substring(3)
            
            // Phase
            listArray.push(
                {
                    Overview: Overview,
                    Meta: Meta,
                    Victors: Victors
                },
            )
        }
    }

    // Extract DATA!
    function extractVideoId(url) {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return null;
        }
    }

    // Assign data
    var currentDifficulty = 0
    const diffIds = ["#eternal", "#divine", "#extreme", "#insane", "hard", "#normal", "#easy"]
    const diffColors = [
        "#ffffff",
        "#ff00ea",
        "#ff8800",
        "#ae00ff",
        "#ff0000",
        "#eeff00",
        "#54ff45"
    ]

    for (let i = 0; i < listArray.length; i++) {
        var map = document.querySelector("#template").cloneNode(true)
        var mapData = listArray[i]

        // Check if current difficulty has changed
        var mainDifficulty = Math.floor(mapData["Overview"][0])

        if (mainDifficulty != (currentDifficulty + 1)) {
            currentDifficulty = mainDifficulty - 1
            var difficultyGroup = document.querySelector(diffIds[7 - mainDifficulty])

            document.querySelector("#listScroller").appendChild(difficultyGroup)
            difficultyGroup.style.display = "flex"
        }

        map.style.display = "flex"
        map.id = i

        // Customize data
        var mapName = map.querySelector(".infoLayout").querySelector("#mapName")
        mapName.querySelector("#rating").style.color = diffColors[6 - currentDifficulty]
        mapName.querySelector("#rating").innerText = "#" + (i + 1) + " [" + mapData["Overview"][0] + "] "
        mapName.querySelector("#name").innerText = mapData["Overview"][1]
        
        map.querySelector(".infoLayout").querySelector("#creators").innerText = mapData["Overview"][2]
        map.querySelector(".youtubeVideo").src = "https://www.youtube.com/embed/" + extractVideoId(mapData["Overview"][4])

        var mapLabels = map.querySelector(".infoLayout").querySelector("#labels")
        mapLabels.querySelector("#awards").src = "../assets/TRIA/Awards/" + mapData["Meta"][1] + ".png"

        for (let i = 0; i < mapData["Meta"][0].length; i++) {
            mapLabels.querySelector("#skill" + mapData["Meta"][0][i]).style.opacity = "100%"
        }
        
        document.querySelector("#listScroller").appendChild(map)
    }

    console.log(listArray)
    console.log("Complete! Loaded " + listArray.length + " maps.")
}

var dataLog = [
    {
        Overview: {
            Rating: "",
            Name: "",
            Creators: "",
            ID: "",
            Video: ""
        },
        Meta: {
            SkillCode: "",
            HasAwards: "",
            IS_SOUNDWAVE_APPROVED: 0,
            IS_AQUARII_APPROVED: 0,
            IS_ETHAR67_APPROVED: 0
        },
        Victors: ""
    }
]

// Switch page on mobile
var currentPage = "list"

function switchPage(viewSection) {
    switch (viewSection) {
        case "list":
            currentPage = "list"
            document.querySelector("#buttons").querySelector("#viewList").className = "active"
            document.querySelector("#buttons").querySelector("#viewBulletin").className = ""

            document.querySelector("#scrollers").querySelector("#listScroller").style.display = "block"
            document.querySelector("#scrollers").querySelector("#bulletin").style.display = "none"
            break;
        case "bulletin":
            currentPage = "bulletin"
            document.querySelector("#buttons").querySelector("#viewList").className = ""
            document.querySelector("#buttons").querySelector("#viewBulletin").className = "active"
    
            document.querySelector("#scrollers").querySelector("#listScroller").style.display = "none"
            document.querySelector("#scrollers").querySelector("#bulletin").style.display = "block"
            break;
    }   
}

// In case of switch failure
addEventListener("resize", function() {
    if (window.innerWidth > 1042) {
        document.querySelector("#scrollers").querySelector("#listScroller").style.display = "block"
        document.querySelector("#scrollers").querySelector("#bulletin").style.display = "block"
    } else if (window.innerWidth <= 1042) {
        if (currentPage == "list") {
            document.querySelector("#buttons").querySelector("#viewList").className = "active"
            document.querySelector("#buttons").querySelector("#viewBulletin").className = ""

            document.querySelector("#scrollers").querySelector("#listScroller").style.display = "block"
            document.querySelector("#scrollers").querySelector("#bulletin").style.display = "none"
        } else {
            document.querySelector("#buttons").querySelector("#viewList").className = ""
            document.querySelector("#buttons").querySelector("#viewBulletin").className = "active"
    
            document.querySelector("#scrollers").querySelector("#listScroller").style.display = "none"
            document.querySelector("#scrollers").querySelector("#bulletin").style.display = "block"
        }
    }
})