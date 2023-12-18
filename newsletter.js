var TitleTable = []

function GetTitle() {

    if (TitleTable.length == 0){
        
        var url = 'https://raw.githubusercontent.com/RockyTanker/rockytanker.github.io/main/Data/Newsletter/1/Content';

        var Result;

        fetch(url)
        .then(function(response) {
            
            response.text().then(function(text) {
            Result = text;
            done();
            });
        });

        function done() {

            var split = Result.split("\n");
            TitleTable = [split[0]]
        };

        return TitleTable

    } else {

        console.log("This table has already been rendered.")
        return TitleTable
    }
}

function GetContent() {


}