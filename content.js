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
  if(request.message === "openModal"){
    console.log("Got it");
    var iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL("modal.html");
    iframe.frameBorder = 0;
    iframe.id = "myFrame";
    $(iframe).hide();//necessary otherwise frame will be visible
    $(iframe).appendTo("body");

    break;  
  }
}

function showModal(){
  wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
  
  iframeElement = document.createElement("iframe");
  iframeElement.setAttribute("style","width: 100%; height: 100%;");
  
  wrapperDiv.appendChild(iframeElement);
  
  modalDialogParentDiv = document.createElement("div");
  modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");
  
  modalDialogSiblingDiv = document.createElement("div");
  
  modalDialogTextDiv = document.createElement("div"); 
  modalDialogTextDiv.setAttribute("style" , "text-align:center");
  
  modalDialogTextSpan = document.createElement("span"); 
  modalDialogText = document.createElement("strong"); 
  modalDialogText.innerHTML = "Processing...  Please Wait.";
  
  breakElement = document.createElement("br"); 
  imageElement = document.createElement("img"); 
  imageElement.src = chrome.extension.getURL("lg.png");
  
  modalDialogTextSpan.appendChild(modalDialogText);
  modalDialogTextDiv.appendChild(modalDialogTextSpan);
  modalDialogTextDiv.appendChild(breakElement);
  modalDialogTextDiv.appendChild(breakElement);
  modalDialogTextDiv.appendChild(imageElement);
  
  modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
  modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
  
  document.body.appendChild(wrapperDiv);
  document.body.appendChild(modalDialogParentDiv);
}

/*chrome.alarms.create("5min", {
  delayInMinutes: 1, periodInMinutes: 1});*/