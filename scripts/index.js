// Fetch cover article
const backgroundVideo = document.getElementById("backgroundVideo")
const coverTitle = document.getElementsByClassName("coverTitle")[0]
const coverDesc = document.getElementsByClassName("coverDesc")[0]
const coverTags = document.getElementsByClassName("coverTags")[0]

const url = 'https://raw.githubusercontent.com/RockyTanker/rtk_data/main/projectArchive/index';
var result

fetch(url)
.then(function(response) {
    response.text().then(function(text) {
    result = text;

    getCover()
    });
});

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
    coverTitle.href = "./projects/page?id=" + coverResult[4]

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
    }
}