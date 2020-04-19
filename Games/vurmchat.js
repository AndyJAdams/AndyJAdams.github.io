//Chat integration v0.001
//AndyJamesAdams on Twitch
//@AndyJamesAdams on twitter
//Code inspired by Alca - tmi.js
var messages = [];
var chatTimeOut = 12000;
var chatAllow = true;
var blueAllow = true;
var redAllow = true;
var greenAllow = true;
var fastAllow = true;
var slowAllow = true;
var derpAllow = true;

function Message(msg, user, cheer = false){
    this.msg = msg; this.user = user; this.cheer = cheer;
    this.shown = false;
}

var krak = 'https://api.twitch.tv/kraken/';

var krakID = '3k6e7ld0rs475g212tcuxzpmhcx1ea';

var targetChan = '';
var tc = (window.location.search);
if(tc != ''){
    var raw = tc.split('&');
    var data = raw[0].split('=');
    targetChan = data[1];
    if(raw.length > 1){
        data = raw[1].split('=');
        chatTimeOut = data[1];
    }
    //Handle changed default commands
    if(raw.length > 2){
        for(var i = 2; i < raw.length; i++){
            var pair = raw[i]
            data = raw[i].split('=');
            var id=data[0];
            switch(id){
                case 'chat':
                    chatAllow = false;
                    break;
                case 'blue':
                    blueAllow = false;
                    break;
                case 'red':
                    redAllow = false;
                    break;
                case 'green':
                    greenAllow = false;
                    break;
                case 'fast':
                    fastAllow = false;
                    break;
                case 'slow':
                    slowAllow = false;
                    break;
                case 'derp':
                    derpAllow = false;
                    break;
                default:
                    break;

            }
        }
    }
}

var client = new tmi.client({
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [targetChan],
});

function addListeners(){
    client.on('connected', () =>{
        //Do something here to show twitch connection
        console.log('chat connected ' + targetChan);
    });
    client.on('disconnected', () =>{
        console.log('disconnected');
    });
    
    function handleMsg(channel,userstate,message,self){
        let name = userstate['display-name'];
        //console.log(message);
        messages.unshift(new Message(message, name));
        updateMessageCount();
    }
    
    function handleCheer(chanell, userstate,message,self){
        let name = userstate['display-name'];
        message.push(new Message(message, name, true));
        updateMessageCount();
    }
    
    client.on('message', handleMsg);
    client.on('cheer', handleCheer);
}

function formQueryString(qs = {}){
    return Object.keys(qs).map(key => '${key}=${qs[key]}').join('&');
}

function request({base = '', endpoint = '', qs, headers = {}, method='get'}){
    let opts = {
        method,
        headers: new Headers(headers)
    };
    return fetch(base + endpoint + '?' + formQueryString(qs), opts).then(res => res.json());
}

function updateMessageCount(){
    if(messages.length>60){
        messages.pop();
    }
}


function kraken(opts){
    let defaults = {
        base: krak,
        headers: {
            'Client-ID': krakID,
            Accept: 'application/vnd.twitch.tv.v5+json'
        }
    };
    return request(Object.assign(defaults,opts));
}

if(targetChan != ''){
    addListeners();
    client.connect();
}
