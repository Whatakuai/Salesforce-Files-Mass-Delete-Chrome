chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated',
        url: tab.url,
        changeInfo: changeInfo
    });
    }
})
  


