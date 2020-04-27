var txt = document.body.innerText;
var arr = [];
var nxt = 0;
var cur = "";
for (var i = 0; i < txt.length; i++) {
	if (txt.charAt(i) == '%') {
		arr[nxt++] = cur;
		cur = "";
	} else {
		cur += txt.charAt(i);
	}
}
if (cur != "") {
	arr[nxt++] = cur;
}

var req = new XMLHttpRequest();
req.overrideMimeType(domain);
req.open('GET', "http://35.197.239.192/text-search-result/", true);
req.onload  = function() {
	var jsonResponse = JSON.parse(req.responseText);
	
};
req.send(null);