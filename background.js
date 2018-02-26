// This is the background script for the extension

// A listener for when the user clicks on the extension button
//chrome.browserAction.onClicked.addListener(buttonClicked);
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    // Just use the full URL if you need to open an external page
    url: chrome.runtime.getURL("https://online.mrt.ac.lk/login/index.php")
  });
});

// Handle that click
function buttonClicked(tab) {
  // Send a message to the active tab
  console.log("button clicked!");
  console.log("Tab id : "+tab.title);
  console.log(tab);

  var tabTitles=[];

  chrome.windows.getAll({populate:true},function(windows){
    var i=0;
    
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //collect all of the urls here, I will just log them instead
        console.log(tab);
        tabTitles.push(tab.title);
        var emotion="";
        $.post(
          'https://apiv2.indico.io/emotion/batch',
          JSON.stringify({
            'api_key': "e55232ba7190f8e283f6fb637d829ba7",
            'data': tab.title,
            'threshold': 0.1
          })
        ).then(function(res) { 
          console.log(res);
          console.log(typeof(res));
        
          /*var mm=res["results"]["anger"];
          var mood="anger";
          for (m in data[0]["scores"]){
              if (mm<data[0]["scores"][m]){
                  mm=data[0]["scores"][m];
                  mood=m;
              }
          }
          alert(mood);*/

        });

      });
    });
  });

  // Send a message to the tab that is open when button was clicked
  chrome.tabs.sendMessage(tab.id, {"message": "browser action"});
  
}

// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  if (request.message === "thank you") {
    // Not doing anything for messages received but I could!
  }
}

var tts=[];
chrome.tabs.onCreated.addListener(function (callback){
  //console.log(callback);
  //console.log("Tab opend ..");
  //console.log(new Date().getTime());
  tts[callback.id]=new Date().getTime();
  console.log(tts);
});


var al="1min";

chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log("Got an alarm!", alarm.name);
  chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl: 'logo.png',
    title: 'Don\'t forget!',
    message: 'Web cam monitoring starts!'

  }, function(notificationId) {});

  /*console.log("button clicked!");
  console.log("Tab id : "+tab.title);
  console.log(tab);*/

  var tabTitles=[];

  chrome.windows.getAll({populate:true},function(windows){
    var i=0;
    
    windows.forEach(function(window){
      window.tabs.forEach(function(tab){
        //collect all of the urls here, I will just log them instead
        //console.log(tab);
        tabTitles.push(tab.title);
        var emotion="";
        $.post(
          'https://apiv2.indico.io/emotion/batch',
          JSON.stringify({
            'api_key': "e55232ba7190f8e283f6fb637d829ba7",
            'data': tab.title,
            'threshold': 0.1
          })
        ).then(function(res) { 
          var psd=JSON.parse(res);
          var mm = psd["results"][0]["anger"];
          console.log(mm);
          mood = "anger";
          for (m in psd["results"][0]) {
              if (mm < psd["results"][0][m]) {
                  mm = psd["results"][0][m];
                  mood = m;
              }
          }
          console.log(mood);
          localStorage.setItem("txt_emotion", mood);

        });

      });
    });
  });

  chrome.runtime.sendMessage({ "message": "openModal" });


 //chrome.tabs.create({url:"http://localhost:63342/SampleExtension/popup.html?_ijt=gaojbag85udentcihgp2nivf4k#"});

});


/*chrome.storage.local.get(al, showNotification);

function showNotification(storedData) {
    // Now create the notification
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon2.png',
        title: 'Don\'t forget!',
        message: 'You have things to do. Wake up, dude!'
     }, function(notificationId) {});
  
}*/