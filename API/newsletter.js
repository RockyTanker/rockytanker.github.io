var TitleTable = []

// Initialization
// Get 3 Recent Headers
var url = 'https://raw.githubusercontent.com/RockyTanker/rtk_data/main/Newsletter/Index';
var Result

fetch(url)
.then(function(response) {
    
    response.text().then(function(text) {
    Result = text;
    Output();
    });
});

function Output() {

    var Line = Result.split("\n");
    
    for (let i = 0; i < 3; i++) {

        TitleTable.push(Line[9 + (i * 4)]);
    }
};

// Get Title
function GetTitle() {

    return TitleTable
}

function GetContent() {


}