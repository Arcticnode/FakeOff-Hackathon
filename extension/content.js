var titles = document.getElementsByTagName("h3");
var i;
for (i = 0; i < titles.length; i++) {
	var percentage = Math.floor(Math.random() * 100);
	var rating = "<br> Trustworhiness: " + percentage.toString(10) + "%";
	if (percentage > 50) {
		rating = rating.fontcolor("green");
	} else {
		rating = rating.fontcolor("red");
	}
	titles[i].innerHTML += rating;
}