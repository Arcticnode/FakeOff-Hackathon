chrome.runtime.onInstalled.addListener(function(details) {
var contextMenuItem = {
	"id": "FakeOff",
	"title": "Check for similar articles",
	"contexts": ["selection"]
};

var curStr;
// var arr = [];
// var nex = 0;
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function(clickData) {
	if (clickData.menuItemId == "FakeOff" && clickData.selectionText) {
		var str = clickData.selectionText;
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
        	var newURL = "http://35.197.239.192/textSearch/";
        	// var newURL = "https://www.stackoverflow.com";
  			chrome.tabs.create({ url: newURL });

  			curStr = str;
  			// if (!arr.includes(curStr)) {
  			// 	arr[nex++] = curStr;
  				chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  					// alert(curStr);
	  				sendResponse(curStr);
	  			});
  			// }
  			// });
  			// chrome.runtime.sendMessage("Hi");
  	// 		chrome.tabs.query({currentWindow: true, active: true}, 
			// function(tabs) {
			// 	chrome.tabs.sendMessage(tabs[0].id, "pls change the html")
			// })
  			// console.log("hehe");
			// alert(clickData.selectionText);
		}
	}
})

});