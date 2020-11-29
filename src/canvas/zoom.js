/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//canvas width 1229
//canvas height 933
//Sidebar 16.25rem - If root font is 16 then 260 px

let screenWidthRatio = (window.screen.availWidth - 280) / canvas.width;
let screenHeightRatio = window.screen.availHeight / canvas.height;
let invertedWidthRatio = 1;
let invertedHeightRatio = 1;


invertedWidthRatio = 1 / screenWidthRatio;
if (screenHeightRatio > 1) {
    invertedHeightRatio = 1 / screenHeightRatio;
}

setZoom();

function setZoom() {
    canvas.setWidth(canvas.width * screenWidthRatio);
    canvas.setHeight(canvas.height * screenWidthRatio);
    canvas.setZoom(screenWidthRatio);
    canvas.requestRenderAll();
}

