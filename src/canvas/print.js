/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

function printPageArea() {
    //Checks if any units are not yet in the the truck from unit list
    let response = true;
    if (unitsNotInCanvas > 0){
        response = confirm("There are " + unitsNotInCanvas.toString() + " unit(s) from unit list not in the truck. \n\nContinue with print?");
    }
    if (response){
        //Remove Height Lines from print
        var i = 0;
        while (i <= 11) {
            topLines[i].opacity = 0;
            botLines[i].opacity = 0;
            i++;
        }

        //Hide Door Text
        doorText1.opacity = 0;
        doorText2.opacity = 0;
        doorText3.opacity = 0;
        doorText4.opacity = 0;
        doorText5.opacity = 0;
        doorText6.opacity = 0;

        //Save current zoom and set zoom to 1
        let tempZoom = canvas.getZoom();
        //save CanvasWidth and CanvasHeight
        let tempCanvasWidth = canvas.getWidth();
        let tempCanvasHeight = canvas.getHeight();
        canvas.setZoom(1);
        canvas.setWidth(1229);
        canvas.setHeight(933);
        canvas.requestRenderAll();

        //Opens window of print content
        var WinPrint = window.open('', '');

        //Calls print
        WinPrint.document.write("<style>@page {   size: Letter landscape; margin: 3mm;  }</style>  " + canvas.toSVG() + " ");

        //Restore zoom
        canvas.setZoom(tempZoom);
        canvas.setWidth(tempCanvasWidth);
        canvas.setHeight(tempCanvasHeight);
        canvas.requestRenderAll();

        //Restore Door Text
        doorText1.opacity = 1;
        doorText2.opacity = 1;
        doorText3.opacity = 1;
        doorText4.opacity = 1;
        doorText5.opacity = 1;
        doorText6.opacity = 1;

        //Closes open print window
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();

        saveToBrowser();
        if (confirm('Would you like to save?')){
            save();
        }
    }
}