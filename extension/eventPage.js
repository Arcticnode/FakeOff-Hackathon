var contextMenuItem = {
	"id": "FakeOff",
	"title": "Check for similar articles",
	"contexts": ["selection"]
};

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
			alert(clickData.selectionText);
		}
	}
})