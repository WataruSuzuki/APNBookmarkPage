function dispAlert(){
    window.alert('アラートの表示');
}

function loadExternalWebsite(){
    var stupidExample = '<?xml version="1.0" encoding="utf-8"?><aTag>something</aTag>';
    window.open('data:Application/octet-stream,' + encodeURIComponent(stupidExample));
    //window.open('https://watarusuzuki.github.io/apn-profiles/resources/nodata.mobileconfig');
}

function writeToLocal(filename, content) {
    var filename = "hoge.txt";
    var content = "foo\n";

    // chrome以外は弾く
    // var ua = navigator.userAgent.toLowerCase();
    // if (ua.indexOf('chrome') == -1) {
    //     alert("This Page is Google Chrome only!");
    // }

    function errorCallback(e) {
        alert("Error: " + e.name);
    }

    function fsCallback(fs) {
        fs.root.getFile(filename, {create: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {

                fileWriter.onwriteend = function(e) {
                    alert("Success! : " + fileEntry.fullPath);
                };

                fileWriter.onerror = function(e) {
                    alert("Failed: " + e);
                };

                var output = new Blob([content], {type: "text/plain"});
                fileWriter.write(output);
            }, errorCallback);
        }, errorCallback);
    }
    // クオータを要求する。PERSISTENTでなくTEMPORARYの場合は
    // 直接 webkitRequestFileSystem を呼んでよい
    webkitStorageInfo.requestQuota(TEMPORARY, 1024,
        webkitRequestFileSystem(TEMPORARY, 1024, fsCallback, errorCallback),
    errorCallback);
}
