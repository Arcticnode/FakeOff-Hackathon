document.addEventListener('DOMContentLoaded', function() {
  var blacklist = document.getElementById('blacklist');
  blacklist.addEventListener('click', function() {
      var url = "";
      addURL();
    });
});

var blacklist = [];

function addURL() {
    
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
 
    if (tabs[0] != undefined){
                var pathArray = tabs[0].url.split( '/' );
                var protocol = pathArray[0];
                var host = pathArray[2];
                url = protocol + '//' + host;
                blacklist.push(url);

                var blacklistBtn = document.getElementById("blacklist");
                var para = document.createElement("p");
                para.style.color = "green";
                para.textContent = url + " added to blacklist.";
                para.style.fontWeight = "bold";
                blacklistBtn.parentNode.replaceChild(para, blacklistBtn);
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






