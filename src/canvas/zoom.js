//console.log("Available width " + window.screen.availWidth);
//console.log("width " +window.screen.width);
//canvas width 1229
//canvas height 933
//Sidebar 16.25rem - If root font is 16 then 260 px

let screenWidthRatio = (window.screen.availWidth  - 280) /canvas.width;
let screenHeightRatio = window.screen.availHeight / canvas.height;
let invertedWidthRatio = 1;
let invertedHeightRatio = 1;


if (true){
    invertedWidthRatio =  1/screenWidthRatio;
    if (screenHeightRatio > 1){
        invertedHeightRatio = 1/screenHeightRatio;
    }
}

setZoom();

function setZoom() {
    if (true) {
        //canvas.width = canvas.width*screenRatio;
        //document.getElementById('c').width = canvas.width;
        //document.getElementById("c").style.width = window.screen.availWidth;
        //document.getElementById('c').width = window.screen.availWidth;
        canvas.setWidth(canvas.width * screenWidthRatio);
        canvas.setHeight(canvas.height * screenWidthRatio);
        canvas.setZoom(screenWidthRatio);
        canvas.requestRenderAll();
        //console.log(canvas.width);
    } else {
        canvas.setZoom(screenWidthRatio);
    }
}

