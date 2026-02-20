// bot.js
var messages = [];
var raids = [];
var connStatus = false;
var clientID = 'frpzu87mj746gw3qweotv4gy2yz4m4';

var targetChan = 'andeeeadams';
// Define the client configuration
var client = new tmi.Client({
    connection: {
        reconnect: true,
        secure: true
    },
    channels: [targetChan]
});

function Message(msg, user) {
    this.msg = msg; this.user = user;
    this.shown = false;
}

function Raid(user, count) {
    this.user = user;
    this.count = count;
    this.shown = false;
}

function addListeners() {
    client.on('connected', () => {
        console.log('chat conencted ' + targetChan);
        connStatus = true;
    });

    client.on('disconnected', () => {
        console.log('disconnected');
        connStatus = false;
    });

    client.on('raid', (channel, username, viewers, tags) => {
        messages.unshift(new Message(username + " is raiding with " + viewers + " friends!", "PRIORITY ALERT--"));
        raids.unshift(new Raid(username, viewers));
    });

    function handleMsg(channel, userstate, message, self) {
        if (!self) {
            let name = userstate['display-name'];
            messages.unshift(new Message(message, name));
            //console.log(message + " :: " + name);
            updateMessageCount();
        }
    }

    client.on('message', handleMsg);
}



function formQueryString(qs = {}) {
    return Object.keys(qs).map(key => '${key}=${qs[key]}').join('&');
}

function request({ base = '', endpoint = '', qs, headers = {}, method = 'get' }) {
    let opts = {
        method,
        headers: new Headers(headers)
    };
    return fetch(base + endpoint + '?' + formQueryString(qs), opts).then(res => res.json());
}

function updateMessageCount() {
    if (messages.length > 60) {
        messages.pop();
    }
}

function kraken(opts) {
    let defaults = {
        base: 'https://api.twitch.tv/unstable_chat_bot',
        headers: {
            'Client-ID': clientID,
            Accept: 'application/vnd.twitch.tv.v5+json'
        }
    };
    return request(Object.assign(defaults, opts));
}


function SetChannel(trgt) {
    client.disconnect();
    messages = []; //DUMP MESSAGE QUEUE
    targetChan = trgt; //STORE NEW TARGET FOR RECONNECTS
    client = new tmi.Client({ //GENERATE NEW CLIENT OBJECT
        connection: {
            reconnect: true,
            secure: true
        },
        channels: [targetChan]
    });
    addListeners(); //UPDATE LISTENERS
    client.connect(); //CONNECT NEW CHANNEL  
}