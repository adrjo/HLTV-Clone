const url = window.location.search;
const content = document.getElementById("content");

if (url == undefined || url == "") {
    content.textContent = "404 not found";

}

console.log(url);