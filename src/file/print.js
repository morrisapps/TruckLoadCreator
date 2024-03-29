/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2023 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * Prepares and prints the canvas, reverts the canvas to previous state after print
 */
function printPageArea() {
    //Checks if any units are not yet in the the truck from unit list
    let unitsNotInResponse = true;
    let weightZeroResponse = true;
    let heightCheckResponse = true;
    let strapCheckResponse = true;
    let weightCheckResponse = true;
    let intersectedResponse = true;
    let intersected = 0
    let weightZeroUnits = [];
    let weightZeroText = '';
    let heightCheck = true;
    let strapCheck = true;
    if (unitsNotInCanvas > 0){
        unitsNotInResponse = confirm("There are " + unitsNotInCanvas.toString() + " unit(s) from unit list not in the truck. \n\nContinue with print?");
    }
    //Checks if any units have a zero weight
    units.forEach(function (unit){
        if (unit.inCanvas && unit.weight <= 2){
            weightZeroUnits.push(unit);
            weightZeroText = weightZeroText + unit.item(1).text + '\n';
        }
    })
    if (weightZeroUnits.length > 0){
        weightZeroResponse = confirm(weightZeroUnits.length.toString() + ' units with zero weight. \n Truck weight might be inaccurate. \n\nContinue with print?\n\n' + weightZeroText);
    }
    //Checks if any height counters are too high.
    topCounters.forEach(function (lineText){if (lineText.text.includes('Height')){heightCheck = false;}});
    botCounters.forEach(function (lineText){if (lineText.text.includes('Height')){heightCheck = false;}});
    if (!heightCheck){heightCheckResponse = confirm('Some height counter(s) exceed the height of '+ (truck.getHeight()+5) + '\n\nContinue with print?\n\n');}

    //Checks if any height counters need belly straps.
    topCounters.forEach(function (lineText){if (lineText.text.includes('Straps')){strapCheck = false;}});
    botCounters.forEach(function (lineText){if (lineText.text.includes('Straps')){strapCheck = false;}});
    if (!strapCheck){strapCheckResponse = confirm('Belly straps are required for some sections of the truck.\n\nContinue with print?\n\n');}

    //Check if any weight counters are red/overweight
    if (midGroup.item(2).fill == "red"){weightCheckResponse = confirm('Total weight exceeds maximum of '+ (truck.getWeight()) + '\n\nContinue with print?\n\n');}
    if (weightCheckResponse && midGroup.item(1).fill == "red"){weightCheckResponse = confirm('Back weight exceeds maximum of '+ (truck.getBackWeightPercent()*truck.getWeight()) + '\n\nContinue with print?\n\n');}
    if (weightCheckResponse && midGroup.item(3).fill == "red"){weightCheckResponse = confirm('Front weight exceeds maximum of '+ (truck.getFrontWeightPercent()*truck.getWeight()) + '\n\nContinue with print?\n\n');}
    //if (_tWeight.style.color == "red"){weightCheckResponse = confirm('Total weight exceeds maximum of '+ (truck.getWeight()) + '\n\nContinue with print?\n\n');}

    //Check if any units are still intersected

    canvas.forEachObject(function (obj) {
        if (obj.isIntersected){intersected++}
    });
    if (intersected > 0){intersectedResponse = confirm('There are still '+ intersected +' intersected units in the truck ' + '\n\nContinue with print?\n\n');}

    //If all response is true, continue with print
    if (unitsNotInResponse && weightZeroResponse && heightCheckResponse && strapCheckResponse && weightCheckResponse && intersectedResponse){
        //Remove Height Lines from print
        var i = 0;
        while (i <= 23) {
            topLines[i].opacity = 0;
            botLines[i].opacity = 0;
            i++;
        }

        //Set all height counters to grey
        topCounters.forEach(function (line){line.set({restorefill: line.fill}); line.set({fill: '#4c4c4c'});});
        botCounters.forEach(function (line){line.set({restorefill: line.fill}); line.set({fill: '#4c4c4c'});});

        //Set all height counters to no extra warning texts
        topCounters.forEach(function (line){line.set({restoreText: line.text}); line.set({text: ((line.text).split(' !'))[0]});});
        botCounters.forEach(function (line){line.set({restoreText: line.text}); line.set({text: ((line.text).split(' !'))[0]});});

        //Set all weight counters to black
        midGroup.item(2).set({restorefill: midGroup.item(2).fill, fill: "black"});
        midGroup.item(1).set({restorefill: midGroup.item(1).fill, fill: "black"});
        midGroup.item(3).set({restorefill: midGroup.item(3).fill, fill: "black"});

        //Set all weight regions opacity to 0
        sideRegions.forEach(function(region){region.set({restoreOpacity: region.opacity, opacity: 0})});
        fullWeightRegion.set({restoreOpacity: fullWeightRegion.opacity, opacity: 0});

        //Set all fill of intersected units to default
        canvas.forEachObject(function (obj) {
            if (obj.isIntersected){
                if (typeof obj.item(0) !== 'undefined') {
                    obj.item(0).set('fill', 'white');
                }
                if (typeof obj.item(1) !== 'undefined') {
                    obj.item(1).set('textBackgroundColor', 'rgba(255,255,255,0.8)');
                }
            }
        });

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

            //Restore height counter colors
            topCounters.forEach(function (line){line.set("fill", line.restorefill);});
            botCounters.forEach(function (line){line.set("fill", line.restorefill);});

            //Restore height counter text
            topCounters.forEach(function (line){line.text = line.restoreText;});
            botCounters.forEach(function (line){line.text = line.restoreText;});

            //Restore fill of intersected units
            canvas.forEachObject(function (obj) {
                if (obj.isIntersected){
                    if (typeof obj.item(0) !== 'undefined') {
                        obj.item(0).set('fill', 'rgba(255,0,0,0.2)');
                    }
                    if (typeof obj.item(1) !== 'undefined') {
                        obj.item(1).set('textBackgroundColor', 'rgba(192, 70, 70, 0)');
                    }
                }
            });

            //Restore weight counter colors
            midGroup.item(2).set({fill: midGroup.item(2).restorefill});
            midGroup.item(1).set({fill: midGroup.item(1).restorefill});
            midGroup.item(3).set({fill: midGroup.item(3).restorefill});

            //Restore all weight regions opacity
            sideRegions.forEach(function(region){region.set({opacity: region.restoreOpacity})});
            fullWeightRegion.set({opacity: fullWeightRegion.restoreOpacity});

            //Un-select active object so that PDF does not show it with it's controls.
            deselectObject(canvas.getActiveObject())
            canvas.discardActiveObject();

            canvas.renderAll();

            if (!loading){saveToBrowser();}
            //Delay confirm dialog to fix chrome not closing winPrint before confirm pop up
            setTimeout(function() {
                if (confirm('Would you like to save?')){
                    save();
                }
                if (URLlocation === null || URLlocation == 1){
                    saveAsPDF();
                }}, 200);

        });
    }
}