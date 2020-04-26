var titles = document.getElementsByTagName("h3");
for (var i = 0; i < titles.length; i++) {
    var div = titles[i].parentNode.parentNode;
    if (div.className == "r") {
        var req = new XMLHttpRequest();
        var url = titles[i].parentNode.toString();
        if(url.endsWith("/")){
            url = url.substring(0,url.length-1);
        }
        req.overrideMimeType(url);
        req.open('GET', "https://34.89.30.97/phpFakeOutServer/check_if_blackList.php"+"?url="+url, false);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);
            var percentage = jsonResponse.success;
            var rating = "<br> Trustworhiness: " + percentage.toString(10) + "%";
            if (percentage > 50) {
            rating = rating.fontcolor("green");
            } else {
            rating = rating.fontcolor("red");

            }
            titles[i].innerHTML += rating;
          
            };

        req.send(null);}
    }
function highlightHandler(e) {
    // get the highlighted text
    var text = document.getSelection();
    // check if anything is actually highlighted
    var str = text.toString();
    var words = 0;
    for (var i = 0; i < str.length; i++) {
    	if (str.charAt(i) != ' ') {
    		words++;
    		var j = i;
    		while (j < str.length && str.charAt(j) != ' ') {
    			j++;
    		}
    		i = j;
    	}
    }
    if (words > 1) {
        // we've got a highlight, now do your stuff here
        doStuff(text);
    }
}

document.onmouseup = highlightHandler;

function doStuff(text) {
	alert(text);
}