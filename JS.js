var current;
var size;
var _stop = 0;

////////////

function init(){
    document.getElementById("close").onclick= function(){
        document.getElementById("macro").style.display = "none";
        stop();
    };
    startJSON(function (response) {
         var obj = JSON.parse(response);
         var images = "";
         size = obj.length;
         obj.forEach(function (el) {
             console.log(el["src"]);
            images += "<img class='mini-image' id='" + obj.indexOf(el) + "' src=\"images/"+ el["src"] + "\" alt = \""+ el["title"] + "\" onclick='showMore(this.id)'>";
         });
         document.getElementById("container").innerHTML = images;
    });

}
function showMore(id) {
    current = id;
    console.log(current);
    startJSON(function (response) {
        var obj = JSON.parse(response);
        document.getElementById("photo").style.backgroundImage = 'url(\"images/' + obj[id]["src"] + '\")';
        document.getElementById("description").innerHTML = "<h1>" + obj[id]["title"] +"</h1>";
        document.getElementById("description").innerHTML += "<p>" + obj[id]["description"] +"</p>";
        document.getElementById("macro").style.display = "block";
    });
}

function startJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'photos.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function slideshow() {
    if(current == size -1)
        current = -1;
    if(_stop == 1) {
        return;
    }
    current++;
    showMore(current);
    setTimeout(slideshow, 2000);
}

function play() {
   _stop = 0;
   document.getElementById("stop").style.display = "block";
   document.getElementById("play").style.display = "none";
   document.getElementById("left").style.display = "none";
   document.getElementById("right").style.display = "none";
}

function stop() {
   document.getElementById("stop").style.display = "none";
   document.getElementById("play").style.display = "block";
   document.getElementById("left").style.display = "block";
   document.getElementById("right").style.display = "block";
    _stop = 1;
}

function left(){
    if(current == 0)
current = size;
    current--;
    showMore(current);
}

function right(){
    if(current == (size - 1))
current = -1;
    current++;
    showMore(current);
}
