// Variables
const mapList = document.querySelector("#mapList")
const entryTemplate = document.querySelector("#entryTemplate")
const cover = document.querySelector("#cover")
const editorContainer = document.querySelector("#editorContainer")
const dialog = document.querySelector("#dialog")
const popup = document.querySelector("#popup")
const githubMirror = "https://raw.githubusercontent.com/RockyTanker/TDL-App/refs/heads/main/Main%20List"
var currentlyViewing

// Get youtube URL
function extractVideoId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return null;
    }
}

// Entry user behavior
function hoverEntry(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.4)"
}

function hoverExit(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.5)"
}

function mouseDown(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.3)"
}

function mouseUp(entry) {
  entry.querySelector(".backgroundContainer").style.filter = "brightness(0.4)"
}

// View entry
function viewEntry(entry) {
  data = entry.querySelector("#metadata")

  // Hide previous arrow
  if (currentlyViewing) {
    currentlyViewing.querySelector(".arrowIcon").querySelector("img").style.display = "none"
  }

  currentlyViewing = entry

  // Show arrow
  entry.querySelector(".arrowIcon").querySelector("img").style.display = "block"

  // Link and cover (The cover is gathered from the MapList cover lol)
  cover.querySelector("#link").value = data.querySelector("#link").innerText
  cover.querySelector("#coverContainer").style.backgroundImage = entry.querySelector(".backgroundContainer").style.backgroundImage

  // Replace Main [Top Left]
  editorContainer.querySelector("#rating").value = data.querySelector("#rating").innerText
  editorContainer.querySelector("#name").value = data.querySelector("#name").innerText
  editorContainer.querySelector("#id").value = data.querySelector("#id").innerText
  editorContainer.querySelector("#creators").value = data.querySelector("#creators").innerText

  // Replace Technical
  editorContainer.querySelector("#published").value = data.querySelector("#published").innerText
  editorContainer.querySelector("#music").value = data.querySelector("#music").innerText
  editorContainer.querySelector("#length").value = data.querySelector("#length").innerText
  editorContainer.querySelector("#instances").value = data.querySelector("#instances").innerText
  editorContainer.querySelector("#buttons").value = data.querySelector("#buttons").innerText

  // Replace Selection: Skills
  if (data.querySelector("#hasWalljumps").innerText == "#") {editorContainer.querySelector("#walljumps").style.opacity = "100%"} else {editorContainer.querySelector("#walljumps").style.opacity = "50%"}
  if (data.querySelector("#hasWallruns").innerText == "#") {editorContainer.querySelector("#wallruns").style.opacity = "100%"} else {editorContainer.querySelector("#wallruns").style.opacity = "50%"}
  if (data.querySelector("#hasDive").innerText == "#") {editorContainer.querySelector("#diving").style.opacity = "100%"} else {editorContainer.querySelector("#diving").style.opacity = "50%"}
  if (data.querySelector("#hasLinear").innerText == "#") {editorContainer.querySelector("#linearSliding").style.opacity = "100%"} else {editorContainer.querySelector("#linearSliding").style.opacity = "50%"}
  if (data.querySelector("#hasMomentum").innerText == "#") {editorContainer.querySelector("#momentumSliding").style.opacity = "100%"} else {editorContainer.querySelector("#momentumSliding").style.opacity = "50%"}
  if (data.querySelector("#hasOrbs").innerText == "#") {editorContainer.querySelector("#orbs").style.opacity = "100%"} else {editorContainer.querySelector("#orbs").style.opacity = "50%"}

  // Replace Selection: Medal
  if (data.querySelector("#hasMedal").innerText == "#") {
    editorContainer.querySelector("#noMedal").style.opacity = "50%"
    editorContainer.querySelector("#hasMedal").style.opacity = "100%"
  } else {
    editorContainer.querySelector("#noMedal").style.opacity = "100%"
    editorContainer.querySelector("#hasMedal").style.opacity = "50%"
  }

  // Replace Selection: Awards
if (data.querySelector("#isFeatured").innerText == "#") {
  editorContainer.querySelector("#verified").style.opacity = "50%"
  editorContainer.querySelector("#featured").style.opacity = "100%"
  editorContainer.querySelector("#revolutionary").style.opacity = "50%"
} else if (data.querySelector("#isRevolutionary").innerText == "#") {
  editorContainer.querySelector("#verified").style.opacity = "50%"
  editorContainer.querySelector("#featured").style.opacity = "50%"
  editorContainer.querySelector("#revolutionary").style.opacity = "100%"
} else {
  editorContainer.querySelector("#verified").style.opacity = "100%"
  editorContainer.querySelector("#featured").style.opacity = "50%"
  editorContainer.querySelector("#revolutionary").style.opacity = "50%"
}

  // Replace Description
  editorContainer.querySelector("#description").value = data.querySelector("#description").innerText

  // Open editor, if closed
  cover.style.display = "grid"
  editorContainer.style.display = "flex"
}

// Search maps
function searchMaps(field) {
  let searchEntry = field.value
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")

  for (let i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var name = entry.querySelector("#name").innerText

    if (name.substring(0, searchEntry.length).toUpperCase() == searchEntry.toUpperCase() && entry.id != "entryTemplate") {
      entry.style.display = "grid";
    } else {
      entry.style.display = "none";
    }
  }
}

// Edit entry (For text fields)
function editEntry(field) {
  let data = currentlyViewing.querySelector("#metadata")
  data.querySelector("#" + field.id).innerText = field.value

  switch (field.id) {
    case "name":
      currentlyViewing.querySelector(".entryName").innerText = field.value
      break;
    case "rating":
      currentlyViewing.querySelector(".entryRating").innerText = "[" + field.value + "]"
      break;
  }
}

// Edit cover (Specifically for YouTube link thumbnail gathering)
function updateCover() {
  let coverLink = extractVideoId(currentlyViewing.querySelector("#link").innerText)
  cover.querySelector("#coverContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + coverLink + "/hqdefault.jpg)"
  currentlyViewing.querySelector(".backgroundContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + coverLink + "/hqdefault.jpg)"
  cover.querySelector("#link").style.backgroundColor = "#05920080"
  setTimeout(() => {
    cover.querySelector("#link").style.backgroundColor = "#00000080"
  }, 500);
}

// Edit entry (For multiple choice fields)
function editSelection(field) {
  let data = currentlyViewing.querySelector("#metadata")
  switch (field.id) {
    // Medal
    case "hasMedal":
      data.querySelector("#hasMedal").innerText = "#"
      editorContainer.querySelector("#hasMedal").style.opacity = "100%"
      editorContainer.querySelector("#noMedal").style.opacity = "50%"
      break;
    case "noMedal":
      data.querySelector("#hasMedal").innerText = ""
      editorContainer.querySelector("#hasMedal").style.opacity = "50%"
      editorContainer.querySelector("#noMedal").style.opacity = "100%"
      break;
    // Awards
    case "verified":
      data.querySelector("#isFeatured").innerText = ""
      data.querySelector("#isRevolutionary").innerText = ""
      editorContainer.querySelector("#verified").style.opacity = "100%"
      editorContainer.querySelector("#featured").style.opacity = "50%"
      editorContainer.querySelector("#revolutionary").style.opacity = "50%"
      break;
    case "featured":
      data.querySelector("#isFeatured").innerText = "#"
      data.querySelector("#isRevolutionary").innerText = ""
      editorContainer.querySelector("#verified").style.opacity = "50%"
      editorContainer.querySelector("#featured").style.opacity = "100%"
      editorContainer.querySelector("#revolutionary").style.opacity = "50%"
      break;
    case "revolutionary":
      data.querySelector("#isFeatured").innerText = ""
      data.querySelector("#isRevolutionary").innerText = "#"
      editorContainer.querySelector("#verified").style.opacity = "50%"
      editorContainer.querySelector("#featured").style.opacity = "50%"
      editorContainer.querySelector("#revolutionary").style.opacity = "100%"
      break;
    // Skills
    case "walljumps":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasWalljumps").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasWalljumps").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "wallruns":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasWalljumps").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasWalljumps").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "diving":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasDive").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasDive").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "linearSliding":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasLinear").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasLinear").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "momentumSliding":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasMomentum").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasMomentum").innerText = ""
        field.style.opacity = "50%"
      }
      break;
    case "orbs":
      if (field.style.opacity == "0.5") {
        data.querySelector("#hasOrbs").innerText = "#"
        field.style.opacity = "100%"
      } else {
        data.querySelector("#hasOrbs").innerText = ""
        field.style.opacity = "50%"
      }
      break;
  }
}

// Create new entry
function createEntry() {
  let newEntry = entryTemplate.cloneNode(true)
  newEntry.style.display = "grid"
  newEntry.id = ""

  mapList.appendChild(newEntry)
  return newEntry
}

// Delete entry
function deleteEntry() {
  if (currentlyViewing) {
    currentlyViewing.remove()
    hideEditor()
  }
}

// Hide editor
function hideEditor() {
  document.querySelector("#cover").style.display = "none"
  document.querySelector("#editorContainer").style.display = "none"
}

// Prompt popout
function promptPopup(span) {
    popup.style.display = "flex"
    popup.querySelector("b").innerHTML = span
}

function closePopup() {
  popup.style.display = "none"
}

// Prompt dialog
function prompt(message) {
  dialog.style.display = "flex"
  dialog.querySelector("b").innerText = message

  return new Promise((resolve) => {
    dialog.querySelector("#yes").addEventListener("click", function() {
      dialog.style.display = "none"
      resolve(true)
    })
    dialog.querySelector("#no").addEventListener("click", function() {
      dialog.style.display = "none"
      resolve(false)
    })
  })
}

// Prompt new file
async function newFile() {
  var result = await prompt("This will overwrite any work you currently have. Are you sure?")

  if (result == true) {
    let entries = document.querySelector("#mapList").getElementsByClassName("entry")
    const count = entries.length

    for (let i = count; i > 0; i--) {
      var entry = entries[i - 1];

      if (entry.id == "") {
        entry.remove()
        currentlyViewing = ""
        hideEditor()
      }
    }
  }
}

// Verify data (ensures that data fed works lmao)
function verifyData(data) {
  var cluster = []

  try {
    cluster = JSON.parse(data)
  } catch (error) {
    console.log(error)
    return false
  } return cluster
}

// Import Data
function importEvent() { // why does it have to be this complicated man
  var input = document.createElement('input');
  input.type = 'file';

  return new Promise((resolve) => {
    input.addEventListener("change", function(){

      var reader = new FileReader();
      reader.readAsText(input.files[0],'UTF-8');
      reader.onload = readerEvent => {
          var content = readerEvent.target.result;
          content = content.replace(/\r/g, '')
          resolve(content)
      }
    })

    input.click();
  })
}

function createList(data) { // tthis is pretty much to support the github import feature
   // delete all existing entries
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")
  const count = entries.length

  for (let i = count; i > 0; i--) {
    var entry = entries[i - 1];

    if (entry.id == "") {
      entry.remove()
      currentlyViewing = ""
      hideEditor()
    }
  }

  // main import function. lord have mercy please help
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const entryNode = createEntry()
    const metadata = entryNode.querySelector("#metadata")

    // Overwrite Meta Phase 1
    // Overview
    metadata.querySelector("#name").innerText = entry.overview.name
    metadata.querySelector("#rating").innerText = entry.overview.rating
    metadata.querySelector("#id").innerText = entry.overview.id
    metadata.querySelector("#link").innerText = entry.overview.video 
    metadata.querySelector("#creators").innerText = entry.overview.creators

    // Meta
    metadata.querySelector("#buttons").innerText = entry.other.buttons
    metadata.querySelector("#published").innerText = entry.other.published
    metadata.querySelector("#instances").innerText = entry.other.instances
    metadata.querySelector("#length").innerText = entry.other.length
    metadata.querySelector("#music").innerText = entry.other.music
    metadata.querySelector("#description").innerText = entry.description

    // Skill
    let jsonSkillCode = ["walljumps", "wallruns", "dive", "linearSliding", "momentumSliding", "orbs"]
    let localSkillCode = ["Walljumps", "Wallruns", "Dive", "Linear", "Momentum", "Orbs"]
    for (let i = 0; i < jsonSkillCode.length; i++) {
      var skillID = entry.selection.skills[jsonSkillCode[i]]
      if (skillID == true) {
        metadata.querySelector("#has" + localSkillCode[i]).innerText = "#"
      };
    }

    // Medal
    if (entry.selection.medal == true) {
      metadata.querySelector("#hasMedal").innerText = "#"
    }

    if (entry.selection.awards.revolutionary == true) {
      metadata.querySelector("#isRevolutionary").innerText = "#"
    } else if (entry.selection.awards.featured == true) {
      metadata.querySelector("#isFeatured").innerText = "#"
    }

    // Update visual card
    entryNode.querySelector(".entryRating").innerText = "[" + entry.overview.rating + "]"
    entryNode.querySelector(".entryName").innerText = entry.overview.name

    // Thumbnail
    entryNode.querySelector(".backgroundContainer").style.backgroundImage = "url(https://img.youtube.com/vi/" + extractVideoId(entry.overview.video) + "/hqdefault.jpg)"
  }
}

async function importData() {
  let imported = await importEvent()
  var data = verifyData(imported)
  
  if (data == false) {
    promptPopup("This file has an invalid format and cannot be imported.")
  return}

  // prompt
  var result = await prompt("This will overwrite the current data. Are you sure?")
  if (result == false) {return}

  createList(data)
}

// Save data
function saveData() {
  // PHASE 1: Compile all data into table
  let entries = document.querySelector("#mapList").getElementsByClassName("entry")
  let arrayed = []

  for (let i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var metadata = entry.querySelector("#metadata")
    
    if (entry.id == "") {
      let newArray = {
          "overview": {
              "name": metadata.querySelector("#name").innerText,
              "rating": metadata.querySelector("#rating").innerText,
              "id": metadata.querySelector("#id").innerText,
              "creators": metadata.querySelector("#creators").innerText,
              "video": metadata.querySelector("#link").innerText
              },
          "other": {
              "published": metadata.querySelector("#published").innerText,
              "music": metadata.querySelector("#music").innerText,
              "length": metadata.querySelector("#length").innerText,
              "instances": metadata.querySelector("#instances").innerText,
              "buttons": metadata.querySelector("#buttons").innerText
              },
          "selection": {
              "skills": {
                  "walljumps": false,
                  "wallruns": false,
                  "dive": false,
                  "linearSliding": false,
                  "momentumSliding": false,
                  "orbs": false
                  },
              "awards": {
                  "featured": false,
                  "revolutionary": false,
                  },
              "medal": false
          },
          "description": metadata.querySelector("#description").innerText
      }

      // Skills
      if (metadata.querySelector("#hasWalljumps").innerText == "#") {newArray.selection.skills.walljumps = true} else {newArray.selection.skills.walljumps = false}
      if (metadata.querySelector("#hasWallruns").innerText == "#") {newArray.selection.skills.wallruns = true} else {newArray.selection.skills.wallruns = false}
      if (metadata.querySelector("#hasDive").innerText == "#") {newArray.selection.skills.dive = true} else {newArray.selection.skills.dive = false}
      if (metadata.querySelector("#hasLinear").innerText == "#") {newArray.selection.skills.linearSliding = true} else {newArray.selection.skills.linearSliding = false}
      if (metadata.querySelector("#hasMomentum").innerText == "#") {newArray.selection.skills.momentumSliding = true} else {newArray.selection.skills.momentumSliding = false}
      if (metadata.querySelector("#hasOrbs").innerText == "#") {newArray.selection.skills.orbs = true} else {newArray.selection.skills.orbs = false}

      // Awards
      if (metadata.querySelector("#isRevolutionary").innerText == "#") {newArray.selection.awards.revolutionary = true} else {newArray.selection.awards.revolutionary = false}
      if (metadata.querySelector("#isFeatured").innerText == "#") {newArray.selection.awards.featured = true} else {newArray.selection.awards.featured = false}

      // Medal
      if (metadata.querySelector("#hasMedal").innerText == "#") {newArray.selection.medal = true} else {newArray.selection.medal = false}

      arrayed.push(newArray)
    }
  }

  // sort by value
  arrayed.sort((b, a) => a[0] - b[0]);

  // concatenate into one
  let parsed = JSON.stringify(arrayed, null, 2)

  // idk what this does / save as text file
  var link = document.createElement('a');
  link.download = 'data';
  var blob = new Blob([parsed], {type: 'text/plain'});
  link.href = window.URL.createObjectURL(blob);
  link.click();
}

// Get About on Request
function getAbout() {
  promptPopup("<style> #popup b {display: flex; flex-direction: column; align-items: center;} #githubButton, #siteButton, #discordButton {color: #ffffff; text-decoration: none; background-color: #49494980; padding: 6px; margin-left: 5px; margin-right: 5px; user-select: none;} #githubButton:hover, #siteButton:hover, #discordButton:hover {color: #6e6e6e} #githubButton:active, #siteButton:active, #discordButton:active {color: #414141}</style><div><img src='../assets/other/ExtendedLogo.png' style='height: 150px;'></div><b style='opacity: 50%; font-style: italic; font-weight: lighter; font-size: 15px;'>Web Version</b>I'm SORRY? DID HE JUST SAY HIS LAST NAME IS BURGER?<div style='display: flex; flex-direction: row; margin-top: 10px;'><a id='githubButton' href='https://github.com/Ethan76167/TRIA.OS-Difficulty-List'>GitHub</a><a id='siteButton' href='https://rockytanker.net/tria/difficultylist'>Site</a><a id='discordButton' href='https://discord.gg/avVtRqjKme'>Discord</a></div>")
}

// Random Quote
const quotes = [
  "You should try playing Moonview",
  "Noodles and bacon"
]

const quote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector("#quote").querySelector("em").innerText = quote

// On load
async function onLoad() {
  var result = await prompt("Would you like to import current list from GitHub?")
  if (result == false) {return}

  fetch(githubMirror)
  .then(function(response) {
      response.text().then(function(text) {
      result = verifyData(text);

      createList(result)
  });});
}

onLoad()