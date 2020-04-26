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
            var percentage = jsonResponse.success.toString(10);
            var rating;
            if (percentage == "0") {
                rating = "<br>Not Trustworthy";
                rating = rating.fontcolor("red");
            } else if (percentage == "100") {
                rating = "<br>Verified Trustworthy";
                rating = rating.fontcolor("green");
            } else {
                rating = "<br>Trustworthiness unidentified";
                rating = rating.fontcolor("orange");
            }
            titles[i].innerHTML += rating;
        };

        req.send(null);}
    }