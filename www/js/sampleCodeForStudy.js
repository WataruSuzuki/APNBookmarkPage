function dispAlert(){
    window.alert('アラートの表示');
}

function loadExternalWebsite(){
    var stupidExample = '<?xml version="1.0" encoding="utf-8"?><aTag>something</aTag>';
    window.open('data:Application/octet-stream,' + encodeURIComponent(stupidExample));
    //window.open('https://watarusuzuki.github.io/apn-profiles/resources/nodata.mobileconfig');
}
