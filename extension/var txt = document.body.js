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


        p = document.createElement("p");
        for (var i = 0; i < nxt; i++){
            p.textContent += arr[i] + " "
        }
        document.body.appendChild(p)

        var req = new XMLHttpRequest();
        req.overrideMimeType(domain);
        req.open('GET', "https://34.89.30.97/phpFakeOutServer/word_search"+"?word1" =p[0] +"?word2" =p[1]+"?word3" =p[2]+"?word4" =p[3] "?word5"=p[4] , true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

        };
        req.send(null);