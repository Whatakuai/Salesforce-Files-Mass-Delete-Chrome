chrome.runtime.onMessage.addListener ((request, sender, sendResponse) => {
  var intervalId;
  var intfunc = () => {
    let elem = document.querySelectorAll ('.test-lvmForceActionsContainer')
      .length > 0
      ? document.querySelectorAll ('.test-lvmForceActionsContainer')[
          document.querySelectorAll ('.test-lvmForceActionsContainer').length -
            1
        ]
      : document.querySelectorAll ('.forceListViewManagerHeader').length > 0
          ? document.querySelectorAll ('.forceListViewManagerHeader')[
              document.querySelectorAll ('.forceListViewManagerHeader').length -
                1
            ]
          : null;
    if (
      document.getElementsByClassName ('custom-mass-delete').length === 0 &&
      elem
    ) {
      var btn = document.createElement ('li');
      btn.classList = 'slds-button slds-button--neutral custom-mass-delete';
      btn.innerText = 'Mass Delete';
      btn.style = 'z-index: 99999;float:right';
      btn.addEventListener ('click', this.showPrompt);
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
    request.url.match (
      '/r/AttachedContentDocument/[A-Z|a-z|0-9]{18}/related'
    ) ||
    request.url.match ('/[A-Z|a-z|0-9]{18}/related/CombinedAttachments/view') ||
    request.url.match (
      '/[A-Z|a-z|0-9]{18}/related/AttachedContentDocuments/view'
    )
  ) {
    intervalId = setInterval (intfunc, 1000);
  }
});

var showPrompt = () => {

  let elements = '<table>';
  document.querySelectorAll ('a.forceContentCompoundFieldsTitleRenderer').forEach (elem => {
    if (elem.href.match ('ContentDocument/[a-z|A-Z|0-9]{18}/view')) {
      elem.target = '_blank';
      elements += `<tr><td><input class="custom-delete-checkbox" type="checkbox" checked data-id="${elem.href.split ('/')[6]}"></td><td>${elem.outerHTML}</td></tr>`;
    }
  });
  elements += '</table>';
  let div = document.createElement ('div');
  div.className = 'custom-delete-modal';
  let prompt = `<section role="alertdialog" tabindex="0" aria-labelledby="prompt-heading-id" aria-describedby="prompt-message-wrapper" class="slds-modal slds-fade-in-open slds-modal_prompt" aria-modal="true">
    <div class="slds-modal__container">
      <header class="slds-modal__header slds-theme_error slds-theme_alert-texture">
        <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
          <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
          </svg>
          <span class="slds-assistive-text">Close</span>
        </button>
        <h2 class="slds-text-heading_medium" id="prompt-heading-id">DELETE ELEMENTS</h2>
      </header>
      
      <div class="slds-modal__content slds-p-around_medium" id="prompt-message-wrapper">
      <input type="checkbox" class="custom-delete-check-all" checked>&nbsp;Check/Uncheck All</input><hr style="margin:0.5rem 0">
        ${elements}
      </div>
      <footer class="slds-modal__footer slds-theme_default">
        <button class="custom-confirm-delete slds-button slds-button_brand">Delete Selected</button>
        <button class="custom-cancel-delete slds-button slds-button_neutral"">Cancel</button>
      </footer>
    </div>
  </section>
  <div class="slds-backdrop slds-backdrop_open"></div>`;
  div.innerHTML = prompt;
  document.body.appendChild (div);
  this.addEventListeners()
};

function addEventListeners(){
  document.querySelector('.custom-cancel-delete').addEventListener('click', cancel );
  document.querySelector('.custom-confirm-delete').addEventListener('click', deleteDocs );
  document.querySelector('.custom-delete-check-all').addEventListener('click', checkAll );
}


var cancel =  () => {
  document.querySelector('.custom-delete-modal').remove();
}

var deleteDocs = () => { 
  var elt = document.createElement ('script');
  elt.src = chrome.runtime.getURL ('mysrc.js');
  document.body.appendChild (elt);
}

var checkAll = (event) => {
  var checkboxes = document.querySelectorAll('.custom-delete-checkbox');
  if (event.target.checked) {
    checkboxes.forEach(checkbox => checkbox.checked = true);
  } else {
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }
}