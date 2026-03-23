// Initialization
const link = "https://raw.githubusercontent.com/RockyTanker/TDL-App/refs/heads/main/Main%20List"
var result, fetched
var listArray = []

// Fetch data
fetch(link)
.then(function(response) {
    response.text().then(function(text) {
    result = text;

    compileData()
});});

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

// Compile data
function compileData() {
    listArray = JSON.parse(result)

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
        var mainDifficulty = Math.floor(mapData.overview.rating)

        if (mainDifficulty != (currentDifficulty + 1)) {
            currentDifficulty = mainDifficulty - 1
            var difficultyGroup = document.querySelector(diffIds[7 - mainDifficulty])

            document.querySelector("#listScroller").appendChild(difficultyGroup)
            difficultyGroup.style.display = "flex"
        }

        map.style.display = "grid"
        map.id = i

        // Customize data
        var videoID = extractVideoId(mapData.overview.video)
        var upperDetails = map.querySelector(".infoLayout").querySelector("#upperDetails")
        var lowerDetails = map.querySelector(".infoLayout").querySelector("#lowerDetails")

        upperDetails.querySelector("#rating").style.color = diffColors[6 - currentDifficulty]
        upperDetails.querySelector("#rating").innerText = "#" + (i + 1) + " [" + mapData.overview.rating + "] "
        upperDetails.querySelector("#name").innerText = mapData.overview.name
        
        lowerDetails.querySelector("#creators").innerText = "by " + mapData.overview.creators
        lowerDetails.querySelector("#id").innerText = mapData.overview.id

        map.querySelector(".thumbnailContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg)"
        map.querySelector(".youtubeVideo").style.backgroundImage = "url(https://img.youtube.com/vi/" + videoID + "/hqdefault.jpg)"
        map.querySelector(".youtubeVideo").href = mapData.overview.video

        // Awards
        var mapLabels = map.querySelector(".infoLayout").querySelector("#labels")
        if (mapData.selection.awards.revolutionary == true) {
            map.querySelector(".youtubeVideo").style.border = "2px solid"
            map.querySelector(".youtubeVideo").style.borderImageSlice = "1"
            map.querySelector(".youtubeVideo").style.borderImage = "linear-gradient(45deg, #ff6600 0%, #eeff00 100%) 1"
            mapLabels.querySelector("#awards").src = "assets/awards/2.png"
        } else if (mapData.selection.awards.featured == true) {
            map.querySelector(".youtubeVideo").style.border = "2px solid"
            map.querySelector(".youtubeVideo").style.borderImageSlice = "1"
            map.querySelector(".youtubeVideo").style.borderImage = "linear-gradient(45deg, #ff00aa 0%, #ffee00 100%) 1"
            mapLabels.querySelector("#awards").src = "assets/awards/1.png"
        } else {
            
            map.querySelector(".youtubeVideo").style.border = "2px solid"
            map.querySelector(".youtubeVideo").style.borderColor = "#ffffff"
            mapLabels.querySelector("#awards").src = "assets/awards/0.png"
        }

        // Skill
        let jsonSkillCode = ["walljumps", "wallruns", "dive", "linearSliding", "momentumSliding", "orbs"]
        for (let i = 0; i < jsonSkillCode.length; i++) {
            var skillID = mapData.selection.skills[jsonSkillCode[i]]
            if (skillID == true) {
                mapLabels.querySelector("#skill" + i).style.opacity = "100%"
            };
        }

        // Expanded Layout
        map.querySelector("#titleBlock").innerText = mapData.overview.name

        // Technical
        map.querySelector("#stats").querySelector("#buttonCount").querySelector("p").innerText = mapData.other.buttons
        map.querySelector("#stats").querySelector("#instances").querySelector("p").innerText = mapData.other.instances
        map.querySelector("#stats").querySelector("#mapLength").querySelector("p").innerText = mapData.other.length
        
        // Description
        map.querySelector("#description").querySelector("#descriptionText").innerText = mapData.description
        map.querySelector("#description").querySelector("#music").innerText = mapData.other.music
        map.querySelector("#description").querySelector("#date").innerText = mapData.other.published

        // Medal
        if (mapData.selection.medal == true) {
            map.querySelector("#medalStatus").querySelector("img").src = "assets/medal/Yes.png"
            map.querySelector("#medalStatus").querySelector("p").innerText = "Medal obtainable!"
        } else {
            map.querySelector("#medalStatus").querySelector("img").src = "assets/medal/No.png"
            map.querySelector("#medalStatus").querySelector("p").innerText = ""
        }

        // Merge into list
        document.querySelector("#listScroller").appendChild(map)
    }

    console.log(listArray)
    console.log("Complete! Loaded " + listArray.length + " maps.")
}

// Expand information
var currentlyExpanded
function expandDetails(source) {
    if (currentlyExpanded == source) {
        source.querySelector("#otherInfo").style.display = "none"
        currentlyExpanded = ""
    } else {
        if (currentlyExpanded) {
            currentlyExpanded.querySelector("#otherInfo").style.display = "none"
        }

        source.querySelector("#otherInfo").style.display = "block"
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