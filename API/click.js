function Click(Element) {

    window.location.href = GetLink(Element)
}

function GetLink(Element) {

    switch (Element.innerHTML) {

        // Main Headers

        case "Newsletter":

            return "http://www.youtube.com/RockyTanker";
            break

        case "Map Queue":
            return "http://www.youtube.com/RockyTanker";
            break

        case "My Work":
            return "http://www.youtube.com/RockyTanker";
            break

        case "About":
            return "http://www.youtube.com/RockyTanker";
            break

        case "Contact":
            return "http://www.youtube.com/RockyTanker";
            break
    }
}