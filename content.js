// A2Z F17
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F17

// This is the content script for the extension

// Things are happening
console.log("Chrome extension is running!");

// Content scripts can manipulate the DOM
// Here I'm changing the background for all the paragraphs
var elts = document.getElementsByTagName('p');
for (var i = 0; i < elts.length; i++) {
  elts[i].style['background-color'] = '#CCC';
}

// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// Handle the message
function receiver(request, sender, sendResponse) {
  console.log("sender : "+sender.id);
  chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
    var title = tab.title;
    console.log(title);
  });
  //console.log("Chrome extension is running!");

  // Now if the message matches "browser action"
  if (request.message === "browser action") {
    // Change the background color again
    var elts = document.getElementsByTagName('p');
    for (var i = 0; i < elts.length; i++) {
      elts[i].style['background-color'] = '#F0C';
    }
    // Send a message back!
    chrome.runtime.sendMessage({ "message": "thank you" });
  }
}

/*chrome.alarms.create("5min", {
  delayInMinutes: 1, periodInMinutes: 1});*/