var clientID = 'yt-chat-soundboard';
var clientKey = 'AIzaSyAzbbjnUW4S4lNx4CcyPxlhChG862NQIIE';
var chanName = '';

function YTconnect(name) {
    chanName = name;
    try {
        fetchLiveChatMessages(chanName);
    } catch {
        console.log("FAILED TO CONNECT");
    }
}

async function fetchLiveChatMessages(liveChatId, pageToken) {
    let url = `https://youtube.googleapis.com${liveChatId}&part=snippet,authorDetails&key=${clientKey}`;
    if (pageToken) url += `&pageToken=${pageToken}`;

    const response = await fetch(url);
    const data = await response.json();

    // Process messages here (data.items)
    console.log(data.items[0]);

    const pollingInterval = data.pollingIntervalMillis;
    const nextPageToken = data.nextPageToken;

    // Schedule next fetch after the recommended interval
    setTimeout(() => fetchLiveChatMessages(liveChatId, nextPageToken), pollingInterval);
}