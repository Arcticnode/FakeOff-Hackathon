document.addEventListener('DOMContentLoaded', function() {
  var blacklist = document.getElementById('blacklist');
  blacklist.addEventListener('click', function() {
      var domain = "";
      addDomain();
    });
});

var blacklist = [];

function addDomain() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

    if (tabs[0] != undefined){
                var pathArray = tabs[0].url.split('/');
                var protocol = pathArray[0];
                var host = pathArray[2];
                domain = protocol +'//' + host;

                console.log(domain);
                blacklist.push(domain);
                var req = new XMLHttpRequest();
                req.overrideMimeType(domain);
                req.open('GET', "https://34.89.30.97/phpFakeOutServer/add_blacklist.php"+"?url="+domain, true);
                req.onload  = function() {
                var jsonResponse = JSON.parse(req.responseText);
                number = jsonResponse.success;
                if(number){
                  var blacklistBtn = document.getElementById("blacklist");
                var para = document.createElement("p");
                para.style.color = "green";
                para.textContent = domain + " added to blacklist.";
                para.style.fontWeight = "bold";
                blacklistBtn.parentNode.replaceChild(para, blacklistBtn);
                }
                else{
                var blacklistBtn = document.getElementById("blacklist");
                var para = document.createElement("p");
                para.style.color = "green";
                para.textContent = domain + " not added to blacklist (already there).";
                para.style.fontWeight = "bold";
                blacklistBtn.parentNode.replaceChild(para, blacklistBtn);
                }

                };
                req.send(null);
                // alert(url +  " added to blacklist.");
            }
    });
}
/* join these when everything is debugged
headline label needs to be shown next to "Headline" on popup menu, it's only a button for debugging purposes*/
document.addEventListener('DOMContentLoaded', function() {
var headline = document.getElementById('headline');
  headline.addEventListener('click', function() {
      var title = "";
      var encodedTitle = "";
      addTitle();
    });
});

function addTitle() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

    if (tabs[0] != undefined){
                title = tabs[0].title;
                var encodedTitle = encodeURIComponent(title);
                var key = 'eVa4e4wCJlap';
                var api_url = "https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=eVa4e4wCJlap&text=" + encodedTitle;
                var request = new XMLHttpRequest();
                request.open('GET', api_url, true);
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                      var response = request.responseText;
                      var negative = parseFloat(response.substring(14,20).trim());
                      var positive = parseFloat(response.substring(34,40).trim());

                      var paraTitle = document.createElement("p");
                      paraTitle.style.fontFamily = "Times New Roman";
                      paraTitle.textContent = title;
                      paraTitle.style.fontWeight = "bold";
                      document.body.appendChild(paraTitle);

                      if (Math.abs(negative - positive) > 600000) {
                        var paraText = document.createElement("p");
                        paraText.style.fontFamily = "Impact";
                        paraText.textContent = "suspected clickbait";
                        paraText.style.color = "white";
                        paraText.style.border = "medium solid #000000";
                        paraText.style.textAlign = "center";
                        paraText.style.background = "brown";

                        document.body.appendChild(paraText);

                          // alert(title + "suspected clickbait");
                          // alert(negative + "," + positive);
                          // paragraph.text = title + " suspected clickbait";
                          // // document.appendChild(paragraph);
                        }
                      else {
                        var paraText = document.createElement("p");
                        paraText.style.fontFamily = "Impact";
                        paraText.textContent = "title is neutral";
                        paraText.style.color = "white";
                        paraText.style.border = "medium solid #000000";
                        paraText.style.textAlign = "center";
                        paraText.style.background = "green";

                        document.body.appendChild(paraText);
                          // alert(title + "title is neutral");
                          // alert(negative + "," + positive);
                        }
                    }
                }
                request.send();
    }
    });
}

// Block Article button
document.addEventListener('DOMContentLoaded', function() {
  var blockArticle = document.getElementById('blockArticle');
  blockArticle.addEventListener('click', function() {

      //  Blacklist the article
      var url = "";
      addURL();

    });
});

function addURL() {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

    if (tabs[0] != undefined){
                url = tabs[0].url;

                console.log(url);
                blacklist.push(url);
                var req = new XMLHttpRequest();
                req.overrideMimeType(url);
                req.open('GET', "https://34.89.30.97/phpFakeOutServer/add_blacklist.php"+"?url="+url, true);
                req.onload  = function() {
                var jsonResponse = JSON.parse(req.responseText);
                number = jsonResponse.success;
                if(number){
                  var blacklistBtn = document.getElementById("blockArticle");
                var para = document.createElement("p");
                para.style.color = "green";
                para.textContent = url + " added to blacklist.";
                para.style.fontWeight = "bold";
                blacklistBtn.parentNode.replaceChild(para, blacklistBtn);
                }
                else{
                var blacklistBtn = document.getElementById("blockArticle");
                var para = document.createElement("p");
                para.style.color = "green";
                para.textContent = url + " not added to blacklist (already there).";
                para.style.fontWeight = "bold";
                blacklistBtn.parentNode.replaceChild(para, blacklistBtn);
                }

                };
                req.send(null);
                //alert(url +  " added to blacklist.");
            }
    });
}

document.addEventListener('DOMContentLoaded', function() {
var bodyText = document.getElementById('text');
  bodyText.addEventListener('click', function() {
      var text = "";
      //getText();
    });
});

        /*function getText(){
            text = document.getElementsByTagName('body')[0].innerText || document.body.textContent;
            alert(text);
            var api_url = "https://api.uclassify.com/v1/uClassify/Sentiment/classify";
            var request = new XMLHttpRequest();
            request.open('POST', api_url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Authorization", "Token eVa4e4wCJlap");
            request.onreadystatechange = function() {
            var response = request.responseText;
            alert(response);
            }
            request.send(JSON.stringify({ texts: ["the movie is really good"] }));
          }*/
