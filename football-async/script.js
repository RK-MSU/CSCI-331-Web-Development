let demo = document.getElementById("leaderboard"); // reference the HTML
let xhr = new XMLHttpRequest();

xhr.responseType = "json"; // "text", "json", "document" for XML
xhr.open("GET", "football.json");
xhr.send();

xhr.addEventListener("load", function () {
    let jsonDoc = xhr.response;
    demo.innerHTML = fillTable(jsonDoc);
});
let filterResult = document.getElementById("filterResult");

function filterSchool(str) {
    if (str.length == 0) {
        filterResult.innerHTML = "";
        return;
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        filterResult.innerHTML = this.responseText;
    }
    xhttp.open("GET", "./football_filter.php?q=" + str);
    xhttp.send();
}

function fillTable(jdoc) {
    console.log(jdoc);
    let table = "";
    for (let i = 0; i < jdoc.bigsky.length; i++) {
        table += "<tr><td>" + jdoc.bigsky[i].name +
            "</td><td>" + jdoc.bigsky[i].school +
            "</td><td>" + jdoc.bigsky[i].rank +
            "</td></tr>";
    }
    return table;
}