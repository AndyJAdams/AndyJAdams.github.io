var title = dictionary[calcDayOfYear()];
console.log(title);
var promise = new Promise(function(resolve,reject) {
    setTimeout(function(){

        var req = new XMLHttpRequest(), 
        method="GET", 
        url="https://poetrydb.org/lines/"+title+"/all.json";

        req.open(method,url,true);
        req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
                var result = JSON.parse(req.responseText);
                resolve(result);
            }
        };
        req.send();
    }, 300);
});

promise.then(function(value){
    if(value.length > 0){
        let randindex = Math.floor(Math.random()*value.length);
        let poemData = '';
        for(var i = 0; i < value[randindex].lines.length; i++){
            poemData += value[randindex].lines[i]+'<br/>';
        }

        document.getElementById('poem').innerHTML = poemData;
        document.getElementById('deets').innerHTML = value[randindex].title + " - " + value[randindex].author
    } else {
        document.getElementById('poem').innerHTML = "Tragedy has struck - no poem today :<";
    }
});

function calcDayOfYear(){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}