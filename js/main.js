document.getElementById("title").innerText = "point and click adventure game ";

//Game window reference
const playscreen = document.getElementById("playscreen");

//Main character 
const maincharacter = document.getElementById("maincharacter");
const offsetcharacterX = 16;

playscreen.onclick = function (e) {
    var rect = playscreen.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    console.log(e.target.id);
    maincharacter.style.left = x - offsetcharacterX + "px";
    maincharacter.style.top = y - offsetcharacterX + "px";
}
