chrome.tabs.onUpdated.addListener (function (tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage (tabId, {
      message: 'TabUpdated',
      url: tab.url,
      changeInfo: changeInfo,
    });
  }
});

chrome.runtime.onInstalled.addListener (function (details) {
  if (details.reason === 'install') {
    chrome.tabs.create ({url: 'https://www.buymeacoffee.com/whatakuai'});
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.message == "getContentDocumentLinks") {

    chrome.cookies.get({url: request.sfHost, name: "sid", storeId: sender.tab.cookieStoreId}, cookie => {
        if (!cookie) {
          sendResponse(null);
          return;
        }
        let [orgId] = cookie.value.split("!");
        chrome.cookies.getAll({name: "sid", domain: "salesforce.com", secure: true, storeId: sender.tab.cookieStoreId}, async (cookies) => {
          let sessionCookie = cookies.find(c => c.value.startsWith(orgId + "!"));
          if (sessionCookie) {
            let selectedDocuments = '\''+request.selectedDocuments.join('\',\'')+'\'';
            request.linkedEntity = '\''+request.linkedEntity+'\'';
            try{
                let resp = await sfCallout('https://' + sessionCookie.domain + '/services/data/v51.0/query/?q=SELECT+Id,+ContentDocumentId+FROM+ContentDocumentLink+WHERE+ContentDocumentId+IN+('+selectedDocuments+')+AND+LinkedEntityId='+request.linkedEntity, 'GET', null, sessionCookie.value)
                sendResponse(resp);
            }catch(exception){
                console.log(exception)
                sendResponse(null)
            }
            
          }else{
            sendResponse(null)
          } 
        });
      });
      return true;
  }
})

async function sfCallout(url, method, body, sessionid) {
    try{
      let resp = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + sessionid,
          Accept: 'application/json'
        },
        method: method,
        body: body
      })
      resp = await resp.json();
      return(resp)
    }catch(exception){
      console.log(exception)
      return null
    }
  }
