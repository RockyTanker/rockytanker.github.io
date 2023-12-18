const fs = require("fs")

var TitleTable = []

function GetTitle() {

    if (TitleTable.length == 0){

        TitleTable = [fetch("https://pastebin.com/raw/PHU02u0v")]

        return TitleTable

    } else {

        console.log("This table has already been rendered.")
        return TitleTable
    }
}

function GetContent() {


}