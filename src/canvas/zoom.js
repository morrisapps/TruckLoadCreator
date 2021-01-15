/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//canvas width 1229
//canvas height 933
//Sidebar 16.25rem - If root font is 16 then 260 px

let screenWidthRatio = (window.screen.width - 270) / canvas.width;

setZoom();

/**
 * Changes the size of canvas to match the screen dimensions
 */
function setZoom() {
    canvas.setWidth((canvas.width - 15 )* screenWidthRatio);
    canvas.setHeight((canvas.height ) * screenWidthRatio);
    canvas.setZoom(screenWidthRatio);
    canvas.requestRenderAll();
}