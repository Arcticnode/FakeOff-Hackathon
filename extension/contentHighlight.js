var title = document.getElementsByTagName("title")[0].innerHTML;
if (title == "TEXT KEY WORD FINDER") {
    var inputbox = document.getElementsByTagName("input")[1];
    chrome.runtime.sendMessage(Math.random() * 10000000 + "", function(response) {
        inputbox.value = response;
        document.forms[0].submit();
        var para = document.createElement("p");
        para.textContent = "success2";
        document.body.appendChild(para);
    });
}
// function highlightHandler(e) {
//     // get the highlighted text
//     var text = document.getSelection();
//     // check if anything is actually highlighted
//     var str = text.toString();
//     var words = 0;
//     for (var i = 0; i < str.length; i++) {
//     	if (str.charAt(i) != ' ') {
//     		words++;
//     		var j = i;
//     		while (j < str.length && str.charAt(j) != ' ') {
//     			j++;
//     		}
//     		i = j;
//     	}
//     }
//     if (words > 1) {
//         // we've got a highlight, now do your stuff here
//         doStuff(text);
//     }
// }

// document.onmouseup = highlightHandler;

// function doStuff(text) {
// 	alert(text);
// }