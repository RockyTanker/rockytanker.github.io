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
        var upperDetails = map.querySelector(".infoLayout").querySelector("#upperDetails")
        var lowerDetails = map.querySelector(".infoLayout").querySelector("#lowerDetails")

        upperDetails.querySelector("#rating").style.color = diffColors[6 - currentDifficulty]
        upperDetails.querySelector("#rating").innerText = "#" + (i + 1) + " [" + mapData["Overview"][0] + "] "
        upperDetails.querySelector("#name").innerText = mapData["Overview"][1]
        
        lowerDetails.querySelector("#creators").innerText = "by " + mapData["Overview"][2]
        lowerDetails.querySelector("#id").innerText = mapData["Overview"][3]

        map.querySelector(".youtubeVideo").src = "https://www.youtube.com/embed/" + extractVideoId(mapData["Overview"][4])

        var mapLabels = map.querySelector(".infoLayout").querySelector("#labels")
        mapLabels.querySelector("#awards").src = "../assets/TRIA/Awards/" + mapData["Meta"][1] + ".png"

        // Awards
        switch (mapData["Meta"][1]) {
            
            case "1":
                map.querySelector(".youtubeVideo").style.border = "2px solid"
                map.querySelector(".youtubeVideo").style.borderImageSlice = "1"
                map.querySelector(".youtubeVideo").style.borderImage = "linear-gradient(45deg, #ff00aa 0%, #ffee00 100%) 1"
                
                break;
            case "2":
                map.querySelector(".youtubeVideo").style.border = "2px solid"
                map.querySelector(".youtubeVideo").style.borderImageSlice = "1"
                map.querySelector(".youtubeVideo").style.borderImage = "linear-gradient(45deg, #ff6600 0%, #eeff00 100%) 1"
                
                break;
            default:
                map.querySelector(".youtubeVideo").style.border = "2px solid"
                map.querySelector(".youtubeVideo").style.borderColor = "#ffffff"

                break;
        }

        // Expanded Layout
        map.querySelector("#titleBlock").innerText = mapData["Overview"][1]

        // Victors
        if (mapData["Victors"]) {
            map.querySelector("#tenVictors").querySelector(".victorPlaceholder").style.display = "none"

            for (let i = 0; i < mapData["Victors"].length; i++) {
                map.querySelector("#tenVictors").querySelector("#v" + i).style.display = "flex"
                map.querySelector("#tenVictors").querySelector("#v" + i).innerText = "[#" + (i + 1) + "] " + mapData["Victors"][i]
            }
        }

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
            HasMedal: "",
            MapLength: "",
            Instances: "",
            Buttons: "",
            Music: "",
            Date: ""
        },
        Victors: ""
    }
]

// Expand information
var currentlyExpanded
function expandDetails(source) {
    if (currentlyExpanded == source) {
        source.querySelector(".expandedLayout").style.display = "none"
        source.querySelector("#divider").style.display = "none"
        currentlyExpanded = ""
    } else {
        if (currentlyExpanded) {
            currentlyExpanded.querySelector("#divider").style.display = "none"
            currentlyExpanded.querySelector(".expandedLayout").style.display = "none"
        }

        source.querySelector(".expandedLayout").style.display = "flex"
        source.querySelector("#divider").style.display = "flex"
        currentlyExpanded = source
    }
}

// Switch page on mobile or smaller screens
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

// Check scroll even
/*

var lastObject = document.querySelector('#lastBulletin');
var hideBulletinOnScroll = false
var savePosition

window.onscroll = function(){
    //BOTTOM
    if(lastObject.getBoundingClientRect().bottom <= 0){
        document.querySelector("#scrollers").querySelector("#bulletin").style.display = "none"

        if (hideBulletinOnScroll == false) {
            savePosition = window.scrollY;
            hideBulletinOnScroll = true
        }
    }
    
    if (savePosition > window.scrollY) {
        document.querySelector("#scrollers").querySelector("#bulletin").style.display = "block"
        document.querySelector("#scrollers").querySelector("#listScroller").style.width = "100%"
        document.querySelector("#scrollers").querySelector("#listScroller").style.transition = "ease-out 500ms"
        
        hideBulletinOnScroll = false
    }
}
    
*/