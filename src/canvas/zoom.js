/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//canvas width 1229
//canvas height 933
//Sidebar 16.25rem - If root font is 16 then 260 px

let screenWidthRatio = (window.screen.width - 280) / canvas.width;
let screenHeightRatio = window.screen.availHeight / canvas.height;
let invertedHeightRatio = 1;

//Sets inverted ratio used for placing units on mouse drop
invertedWidthRatio = 1 / screenWidthRatio;
if (screenHeightRatio > 1) {
    invertedHeightRatio = 1 / screenHeightRatio;
}

setZoom();

/**
 * Changes the size of canvas to match the screen dimensions
 */
function setZoom() {
    canvas.setWidth(canvas.width * screenWidthRatio);
    canvas.setHeight(canvas.height * screenWidthRatio);
    canvas.setZoom(screenWidthRatio);
    canvas.requestRenderAll();
}
