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
                alert(url +  " added to blacklist.");
            }
    });
}

