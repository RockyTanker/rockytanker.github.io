// Initialization
const url = 'https://raw.githubusercontent.com/RockyTanker/rtk_data/main/projectArchive/index';
var result, fetched

fetch(url)
.then(function(response) {
    response.text().then(function(text) {
    result = text;
    fetched = true;
    console.log("finished fetching!")
    });
});

// Get Cover
function getCover() {
    if (!fetched) {return "Process is not finished fetching!"}
    
    var line = result.split("\n");
    var finalResult = [];
    
    for (let i = 0; i < 5; i++) {

        if (i == 2) {
            var tagTable = line[8 + i].split(", ")
            finalResult.push(tagTable)
        } else {finalResult.push(line[8 + i]);}
    }
    return finalResult
}

function GetContent() {


}