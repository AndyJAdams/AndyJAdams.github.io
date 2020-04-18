//Chat integration v0.001
//AndyJamesAdams on Twitch
//@AndyJamesAdams on twitter
//Code inspired by Alca - tmi.js
var messages = [];

function Message(msg, user, cheer = false){
    this.msg = msg; this.user = user; this.cheer = cheer;
    this.shown = false;
}

var krak = 'https://api.twitch.tv/kraken/';

var krakID = '3k6e7ld0rs475g212tcuxzpmhcx1ea';

var targetChan = '';
var tc = (window.location.search);
if(tc != ''){
    var data = tc.split('=');
    targetChan = data[1];
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
