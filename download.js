(function(){
    document.getElementById('btnDownload').addEventListener('click', function(){
        var a = document.createElement("a");
        a.setAttribute("href", "data:text/plain," + document.getElementById('outputTxt').value);
        a.setAttribute("download", "cracking.csv");
        a.click();
    });
})();