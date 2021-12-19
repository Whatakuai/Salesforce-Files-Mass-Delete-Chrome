chrome.runtime.onMessage.addListener ((request, sender, sendResponse) => {
  var intervalId;
  var intfunc = () => {
    let elem = document.querySelectorAll('.test-lvmForceActionsContainer').length > 0 ? document.querySelectorAll('.test-lvmForceActionsContainer')[document.querySelectorAll('.test-lvmForceActionsContainer').length - 1] : document.querySelectorAll('.forceListViewManagerHeader').length > 0 ? document.querySelectorAll('.forceListViewManagerHeader')[document.querySelectorAll('.forceListViewManagerHeader').length - 1]  : null;
    if (
      document.getElementsByClassName ('custom-mass-delete').length === 0 &&
      elem
    ) {
      var btn = document.createElement ('li');
      btn.classList = 'slds-button slds-button--neutral custom-mass-delete';
      btn.innerText = 'Mass Delete';
      btn.style = 'z-index: 99999;float:right';
      btn.addEventListener ('click', this.deleteRecords);
      elem.prepend (btn);
      clearInterval (intervalId);
    } else if (
      document.getElementsByClassName ('custom-mass-delete').length > 0 
    ) {
      clearInterval (intervalId);
    }
  };
  // listen for messages sent from background.js
  if (
    (request.message === 'TabUpdated' &&
      request.url &&
      request.url.match ('/r/CombinedAttachment/[A-Z|a-z|0-9]{18}/related')) ||
    request.url.match ('/r/AttachedContentDocument/[A-Z|a-z|0-9]{18}/related') || 
    request.url.match ('/[A-Z|a-z|0-9]{18}/related/CombinedAttachments/view') ||
    request.url.match ('/[A-Z|a-z|0-9]{18}/related/AttachedContentDocuments/view')
  ) {
    intervalId = setInterval (intfunc, 1000);
  }
});

var deleteRecords = async () => {
  if (!confirm ('Are you sure you want to delete all files in the list?')) return;
  var elt = document.createElement ('script');
  elt.src = chrome.runtime.getURL ('mysrc.js');
  document.body.appendChild (elt);
};
