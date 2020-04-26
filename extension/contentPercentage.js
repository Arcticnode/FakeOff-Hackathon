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
            titles[i].innerHTML += rating +url;
          
            };

        req.send(null);}
    }