//chrome.runtime.sendMessage({ todo: "showPageAction"});
//window.onload = function() {

//chrome.runtime.onMessage.addListener(
  //function(request, sender, sendResponse) {
    //console.log(sender.tab ?
      //          "from a content script:" + sender.tab.url :
        //        "from the extension");
    //if (request.action == "getPage"){
      //  sendResponse({searchResults: document.body.innerHTML});
      //}
  //});  
//};

//chrome.browserAction.onClicked.addListener(function(tab) {
  //chrome.tabs.executeScript(tab.id, {
    //  file: "scraper.js"
  //});
//});