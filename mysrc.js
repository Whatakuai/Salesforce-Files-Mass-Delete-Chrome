(async function deleteDocs () {
  var elt = document.createElement ('div');
  elt.className = 'loader';
  document.body.appendChild (elt);

  var shadow = document.createElement ('div');
  shadow.className = 'shadow';
  document.body.appendChild (shadow);

  var css = document.createElement ('style');
  css.innerHTML = `.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: fixed;
    top: 30%;
    left:45%;
    z-index: 99999;
  }

  .shadow {
    position:absolute;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 99998;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
  document.head.appendChild (css);
  await Promise.all (
    Array.from (document.querySelectorAll ('a')).map (async elem => {
      if (elem.href.match ('ContentDocument/[a-z|A-Z|0-9]{18}/view')) {
        let id = elem.href.split ('/')[6];
        try {
          let respt = await fetch (
            'https://' +
              location.hostname +
              '/aura?r=63&ui-force-components-controllers-recordGlobalValueProvider.RecordGvp.deleteRecord=1&ui-force-components-controllers-recordGlobalValueProvider.RecordGvp.getRecord=1',
            {
              headers: {
                accept: '*/*',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              referrer: location.href,
              referrerPolicy: 'origin-when-cross-origin',
              body: 'message=%7B%22actions%22%3A%5B%7B%22id%22%3A%222716%3Ba%22%2C%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.force.components.controllers.recordGlobalValueProvider.RecordGvpController%2FACTION%24getRecord%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22recordDescriptor%22%3A%22' +
                id +
                '.undefined.null.null.null.Id.VIEW.true.null.ContentUrl%2CExternalDataSourceName%2CParentId%2CLastModifiedDate%2CIsAssetEnabled%2CCreatedBy%3B2LastModifiedById%2CTitle%2CContentSize%2CCreatedBy%3B2CreatedDate%2CCreatedBy%3B2Id%2CRecordType%2CExternalDataSourceType%2CCreatedBy%3B2LastModifiedDate%2CFileType%2CCreatedBy%3B2SystemModstamp%2CFileExtension%2CCreatedBy%3B2Name%2CCreatedDate%2CId%2CLastModifiedById%2CCreatedById.null%22%7D%7D%2C%7B%22id%22%3A%222721%3Ba%22%2C%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.force.components.controllers.recordGlobalValueProvider.RecordGvpController%2FACTION%24deleteRecord%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22recordId%22%3A%22' +
                id +
                '%22%7D%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%227FPkrq_-upw5gdD4giTZpg%22%2C%22app%22%3A%22one%3Aone%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fone%3Aone%22%3A%22B6g-nHwJlr4SfU5_IGg6Ug%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%22density%22%3A%22VIEW_ONE%22%2C%22appContextId%22%3A%2206m090000025AqPAAU%22%7D%2C%22uad%22%3Atrue%7D&aura.pageURI=%2F' +
                location.pathname +
                '&aura.token=' +
                encodeURI (window.Aura.initConfig.token),
              method: 'POST',
            }
          );
        } catch (exception) {
          console.log (exception);
          console.log ('Cannot delete content documents');
        }
      }
    })
  );
  //location.reload ();
  try{
    fetch("https://" + location.hostname + "/aura?r=66&ui-force-components-controllers-lists-listViewManagerGrid.ListViewManagerGrid.getRecordLayoutComponent=1&ui-force-components-controllers-relatedList.RelatedListViewDataManager.getItems=1", {
        headers: {
            accept: '*/*',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          referrer: location.href,
          referrerPolicy: 'origin-when-cross-origin',
        body: "message=%7B%22actions%22%3A%5B%7B%22id%22%3A%222886%3Ba%22%2C%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.force.components.controllers.lists.listViewManagerGrid.ListViewManagerGridController%2FACTION%24getRecordLayoutComponent%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22listReference%22%3A%7B%22listViewIdOrName%22%3A%22CombinedAttachments%22%2C%22inContextOfRecordId%22%3A%2200109000009fx22AAA%22%2C%22isMRU%22%3Afalse%2C%22isSearch%22%3Afalse%7D%2C%22layoutType%22%3A%22RELATED_LIST%22%2C%22layoutMode%22%3A%22VIEW%22%2C%22inContextOfComponent%22%3A%22force%3AlistViewManagerGrid%22%2C%22enableMassActions%22%3Atrue%2C%22enableRowErrors%22%3Atrue%2C%22useHoversForLookup%22%3Afalse%7D%7D%2C%7B%22id%22%3A%222889%3Ba%22%2C%22descriptor%22%3A%22serviceComponent%3A%2F%2Fui.force.components.controllers.relatedList.RelatedListViewDataManagerController%2FACTION%24getItems%22%2C%22callingDescriptor%22%3A%22UNKNOWN%22%2C%22params%22%3A%7B%22filterName%22%3A%22CombinedAttachments%22%2C%22pageSize%22%3A50%2C%22sortBy%22%3A%22%22%2C%22limit%22%3A1000%2C%22useTimeout%22%3Afalse%2C%22queryLocator%22%3Anull%2C%22parentRecordId%22%3A%2200109000009fx22AAA%22%2C%22getCount%22%3Afalse%2C%22isPreview%22%3Afalse%2C%22enableRowActions%22%3Afalse%2C%22offset%22%3A0%7D%2C%22storable%22%3Atrue%7D%5D%7D&aura.context=%7B%22mode%22%3A%22PROD%22%2C%22fwuid%22%3A%227FPkrq_-upw5gdD4giTZpg%22%2C%22app%22%3A%22one%3Aone%22%2C%22loaded%22%3A%7B%22APPLICATION%40markup%3A%2F%2Fone%3Aone%22%3A%22CH-V0kZ54c2UDU8-tYTXdA%22%7D%2C%22dn%22%3A%5B%5D%2C%22globals%22%3A%7B%22density%22%3A%22VIEW_ONE%22%2C%22appContextId%22%3A%2206m090000025AqPAAU%22%7D%2C%22uad%22%3Atrue%7D&aura.pageURI=%2Flightning%2Fr%2FCombinedAttachment%2F00109000009fx22AAA%2Frelated%2FCombinedAttachments%2Fview&aura.token=eyJub25jZSI6Inp2UFdRcHctTlVjZWJqRnQ1dHREZzZnNFozVkJXcUhtN0FJTUU3d0xIM0FcdTAwM2QiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IntcInRcIjpcIjAwRDA5MDAwMDAwR3lYWVwiLFwidlwiOlwiMDJHMDkwMDAwMDAwWXFYXCIsXCJhXCI6XCJjYWltYW5zaWduZXJcIn0iLCJjcml0IjpbImlhdCJdLCJpYXQiOjE2Mzk3NTA5MDk0MTcsImV4cCI6MH0%3D..bLmwqOUfBqVrVmX68WVMaXD-yEV1QQzT0gAAXPyvvGQ%3D",
        method: "POST"
      });
  } catch (exception) {
    location.reload()
  }
}) ();
