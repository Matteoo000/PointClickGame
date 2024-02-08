document.getElementById("title").innerText = "point and click adventure game ";

//Game window reference
const playscreen = document.getElementById("playscreen");

//Main character 
const maincharacter = document.getElementById("maincharacter");

playscreen.onclick = function (e) {
    console.log(e.target.id);
}
