/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * Prepares and prints the canvas, reverts the canvas to previous state after print
 */
function printPageArea() {
    //Checks if any units are not yet in the the truck from unit list
    let unitsNotInResponse = true;
    let weightZeroResponse = true;
    let weightZeroUnits = [];
    let weightZeroText = '';
    if (unitsNotInCanvas > 0){
        unitsNotInResponse = confirm("There are " + unitsNotInCanvas.toString() + " unit(s) from unit list not in the truck. \n\nContinue with print?");
    }
    units.forEach(function (unit){
        if (unit.inCanvas && unit.weight <= 2){
            weightZeroUnits.push(unit);
            weightZeroText = weightZeroText + unit.item(1).text + '\n';
        }
    })
    if (weightZeroUnits.length > 0){
        weightZeroResponse = confirm(weightZeroUnits.length.toString() + ' units with zero weight. \n Truck weight might be inaccurate. \n\nContinue with print?\n\n' + weightZeroText);
        //Remove weight from print since not all weight units are counted for
        weightTexts.forEach(function (text){text.opacity = 0;});
    }
    if (unitsNotInResponse && weightZeroResponse){
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

        //Uses promise for document write to fix chrome not displaying barcode on print
        let printPromise = new Promise((finished) => {
            //Calls print
            finished(WinPrint.document.write("<style>@page {   size: Letter landscape; margin: 3mm;  }</style>  " + canvas.toSVG() + " " ) );
        });
        printPromise.then(v => {
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
            weightTexts.forEach(function (text){text.opacity = 1;});

            //Closes open print window
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();

            saveToBrowser();
            //Delay confirm dialog to fix chrome not closing winPrint before confirm pop up
            setTimeout(function() {
                if (confirm('Would you like to save?')){
                    save();
                }}, 200);
        });
    }
}