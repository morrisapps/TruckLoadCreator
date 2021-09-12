/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * Loads all truck related objects on canvas based on the appropriate trailer with the given ID
 * @param id - The id number of the trailer that will be loaded.
 */
function truckLoad(id) {
    //Remove all drawn truck lines
    canvas.forEachObject(function (obj) {
        if (obj instanceof fabric.Line && obj.tool != true) {
            canvas.remove(obj);
        }
    });
    createCounters();
    truckTemplate();

    truckID = id;
    truck = getTruckByID(id);
    //If id starts with underscore _ then do not display it in Trailer Number it as it's a generic truck ID
    if (id == '' || id == null || id == 'start' || id == 'Custom Flatbed' || id.charAt(0) == "_" ){trailerTextEdit.set({text: "Enter trailer", fontSize: 15, fontStyle: "italic", top: 25});}
    else {trailerTextEdit.set({text: truckID, fontSize: 16, fontStyle: "normal", top: 23});}

    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);

    door1 = truck.getDoorText1();
    door2 = truck.getDoorText2();
    door3 = truck.getDoorText3();
    door4 = truck.getDoorText4();
    door5 = truck.getDoorText5();
    door6 = truck.getDoorText6();


    if (truck.getLength() == 53 && truck.getType() == 0) {
        truck53(truckID);
    } else if ((truck.getLength() == 48 || truck.getLength() == 47) && truck.getType() == 0) {
        truck48(truckID);
    } else if (truck.getLength() == 35 && truck.getType() == 0) {
        truck35(truckID);
    } else if (truck.getType() != 0) {
        truckCurtain(truckID);
    } else {
        truckCustom();
    }
    canvas.forEachObject(function (obj) {
        if (obj.unit == true || obj.tool == true) {
            updateCount(obj);
            obj.bringToFront();
        }
    });

    _mWeight.innerText = truck.getWeight();
    _hWeight.innerText = truck.getHalfWeight();
    truckWeightUpdate();

    vLine1.bringToFront();
    vLine2.bringToFront();
    vLine3.bringToFront();
    vLine4.bringToFront();
    vLine5.bringToFront();
    midGroup.bringToFront();

    if (id != 'start') {saveToBrowser();}
}

/**
 * Initializes/reinitializes height and weight counters, canvas lines, and weight unit containers
 * Counters are fabric.Itext objects on canvas
 * Lines are fabric.Lines objects used for intersection checking with units on canvas
 * Weight unit containers used to store which units are in which region for counting weight
 */
function createCounters() {
    canvas.forEachObject(function (obj) {
        if (obj.isCounter == true) {
            canvas.remove(obj);
        }
    });

    //Height Counters
    var i = 0;
    while (i <= 11) {

        topCounters[i] = new fabric.IText('', {
            id: (i * 96) + (75 - 2),
            width: 1000,
            height: 500,
            top: 75,
            left: (i * 96) + (75 - 2),
            stroke: '#4c4c4c',
            fill: '#4c4c4c',
            strokeWidth: 0,
            hasControls: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            hasBorders: false,
            editable: false,
            fontSize: 14,
            fixedWidth: 150,
            fixedHeight: 300,
            fixedFontSize: 12,
            isCounter: true
        });

        canvas.add(topCounters[i]);

        botCounters[i] = new fabric.IText('', {
            id: (i * 96) + (75 - 2),
            width: 1000,
            height: 500,
            top: 710,
            left: (i * 96) + (75 - 2),
            stroke: '#4c4c4c',
            fill: '#4c4c4c',
            strokeWidth: 0,
            hasControls: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            hasBorders: false,
            editable: false,
            fontSize: 14,
            fixedWidth: 150,
            fixedHeight: 300,
            fixedFontSize: 12,
            isCounter: true
        });

        canvas.add(botCounters[i]);

        topLines[i] = new fabric.Line([(i * 96) + (75 - 2), 75, (i * 96) + (75 - 2), 395], {
            id: 'top' + ((i * 96) + (75 - 2)).toString(),
            opacity: 0,
            selectable: false,
            isCounter: true
        });
        botLines[i] = new fabric.Line([(i * 96) + (75 - 2), 405, (i * 96) + (75 - 2), 725], {
            id: 'bot' + ((i * 96) + (75 - 2)).toString(),
            opacity: 0,
            selectable: false,
            isCounter: true
        });
        canvas.add(topLines[i]);
        canvas.add(botLines[i]);
        i++;
    }
}

/**
 * Creates several fabric.Line that all trailers will use, such as the canvas and text input borders
 */
function truckTemplate(){
    //Create universal lines on canvas

    //border
    canvas.add(new fabric.Line([0, 15, 0, 925], {
        id: 'borderLeft',
        stroke: '#ccc',
        strokeWidth: 2,
        selectable: false,
    }));
    canvas.add(new fabric.Line([1200, 15, 1200, 925], {
        id: 'borderRight',
        stroke: '#ccc',
        strokeWidth: 2,
        selectable: false
    }));
    canvas.add(new fabric.Line([0, 15, 1200, 15], {
        id: 'borderTop',
        stroke: '#ccc',
        strokeWidth: 2,
        selectable: false
    }));
    canvas.add(new fabric.Line([0, 925, 1200, 925], {
        id: 'borderBottom',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));
    //Canvas bottom
    canvas.add(new fabric.Line([0, 15, 1200, 15], {stroke: 'black', strokeWidth: 2, selectable: false}));
    //top control line
    canvas.add(new fabric.Line([285, 45, 1200, 45], {
        id: 'canvasTop',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));
    //Load number divider
    canvas.add(new fabric.Line([285, 15, 285, 75], {
        id: 'canvasTop',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));
    //top canvas line
    canvas.add(new fabric.Line([0, 75, 1200, 75], {
        id: 'canvasTop',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));

    createMidGroup(1200, 0);
    //bottom canvas line
    canvas.add(new fabric.Line([0, 725, 1200, 725], {
        id: 'canvasBotton',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));
    //bottom left lower corner
    canvas.add(new fabric.Line([0, 725, 0, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));
    //bottom right lower corner
    canvas.add(new fabric.Line([600 * 2, 725, 600 * 2, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));
}

/**
 * Creates a fabric.Group representing the middle separator/divider
 * @param width The width of the entire group
 * @param left The left position in pixels of the group
 */
function createMidGroup(width, left){
    //Removes old Mid group
    canvas.remove(midGroup);

    //Corrects left position due to setting the group to originX: center
    left += width/2 + 1

    //Represents the middle separator
    let midRect = new fabric.Rect({
        width: width,
        height: 19,
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
        intersects: true,
        selectable: false,
    });

    let backWeight = new fabric.IText("Back Weight: ",{
        top: 10,
        left: width/8,
        textAlign: 'left',
        fill: 'black',
        hasControls: false,
        selectable: false,
        fontSize: 14,
        originX: 'center',
        originY: 'center',
        weight: 0,
        startText: "Back Weight: "
    });

    let totalWeight = new fabric.IText("Total: ",{
        top: 10,
        left: width/2,
        textAlign: 'left',
        fill: 'black',
        hasControls: false,
        selectable: false,
        fontSize: 14,
        originX: 'center',
        originY: 'center',
        weight: 0,
        startText: "Total: "
    });

    let frontWeight = new fabric.IText("Front Weight: ",{
        top: 10,
        left: width/1.135,
        textAlign: 'left',
        fill: 'black',
        hasControls: false,
        selectable: false,
        fontSize: 14,
        originX: 'center',
        originY: 'center',
        weight: 0,
        startText: "Front Weight: "
    });

    //midGroup is the group that holds all text and objects for the middle divider.
    midGroup = new fabric.Group([midRect, backWeight, totalWeight, frontWeight], {
        left: left,
        top: 392,
        intersects: true,
        selectable: false,
        remove: false,
        originX: 'center',
    });
    canvas.add(midGroup);
}

/**
 * Creates lines, sets weight and region locations for truck custom
 */
function truckCustom() {
    //Default empty truck template using 53'

    //set weight text location
    topLeftWeightText.set('left', 248).setCoords();
    topRightWeightText.set('left', 1010).setCoords();
    botLeftWeightText.set('left', 248).setCoords();
    botRightWeightText.set('left', 1010).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 300, top: 239, width: 600, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 902, top: 239, width: 600, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 300, top: 565, width: 600, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 902, top: 565, width: 600, height: 162 * 2,}).setCoords();


    //vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine2);
    vLine3 = new fabric.Line([216 * 2, 75, 216 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false})
    canvas.add(vLine3);
    vLine4 = new fabric.Line([408 * 2, 75, 408 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine5);
}
/**
 * Creates lines, sets weight and region locations for curtain trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truckCurtain(truckid) {
    if (truckid == 'Custom Flatbed') {door1 = '';}
    //door2 to door6 are not used for curtains
    door2 = '';
    door3 = '';
    door4 = '';
    door5 = '';
    door6 = '';

    //Truck size info
    doorText1 = new fabric.IText(door1, {
        top: 105,
        left: 68 + 12,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText1);
    doorText2 = new fabric.IText(door2, {
        top: 105,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 105,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText3);
    doorText4 = new fabric.IText(door4, {
        top: 675,
        left: 68,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText4);
    doorText5 = new fabric.IText(door5, {
        top: 675,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 675,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText6);

    if (truckid == "WFB" || truckid == "3cobra7" || truckid == "YFB" || truckid == "YFB2") {
        //26' Flatbed trailers

        //Set door text location
        doorText1.set("left", 350).setCoords();

        //Disable lines outside of truck template
        topLines[0] = new fabric.Line();
        topLines[1] = new fabric.Line();
        topLines[2] = new fabric.Line();
        topLines[10] = new fabric.Line();
        topLines[11] = new fabric.Line();
        botLines[0] = new fabric.Line();
        botLines[1] = new fabric.Line();
        botLines[2] = new fabric.Line();
        botLines[10] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 493).setCoords();
        topRightWeightText.set('left', 807).setCoords();
        botLeftWeightText.set('left', 493).setCoords();
        botRightWeightText.set('left', 807).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 494-1, top: 239, width: 104 * 3, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 806+1, top: 239, width: 104 * 3, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 494-1, top: 565, width: 104 * 3, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 806+1, top: 565, width: 104 * 3, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 14, 75, 24 * 14, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 240, 75, 600 * 2 - 240, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    }   else if (truckid == "933" || truckid == "Hotshot-32-72-96") {
        //32' Flatbed trailers

        //Set door text location
        doorText1.set("left", 275).setCoords();

        //Disable lines outside of truck template
        topLines[0] = new fabric.Line();
        topLines[1] = new fabric.Line();
        topLines[10] = new fabric.Line();
        topLines[11] = new fabric.Line();
        botLines[0] = new fabric.Line();
        botLines[1] = new fabric.Line();
        botLines[10] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 433).setCoords();
        topRightWeightText.set('left', 817).setCoords();
        botLeftWeightText.set('left', 433).setCoords();
        botRightWeightText.set('left', 817).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 433, top: 239, width: 128 * 3, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 817, top: 239, width: 128 * 3, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 433, top: 565, width: 128 * 3, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 817, top: 565, width: 128 * 3, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 10, 75, 24 * 10, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 192, 75, 600 * 2 - 192, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    }   else if (truckid == "3601" || truckid == "3602" || truckid == "3603" || truckid == "3604") {
        //36' Flatbed trailers

        //Set door text location
        doorText1.set("left", 160).setCoords();

        //Disable lines outside of truck template
        topLines[0] = new fabric.Line();
        topLines[10] = new fabric.Line();
        topLines[11] = new fabric.Line();
        botLines[0] = new fabric.Line();
        botLines[10] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 361).setCoords();
        topRightWeightText.set('left', 795).setCoords();
        botLeftWeightText.set('left', 361).setCoords();
        botRightWeightText.set('left', 795).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 361, top: 239, width: 144 * 3, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 793, top: 239, width: 144 * 3, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 361, top: 565, width: 144 * 3, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 793, top: 565, width: 144 * 3, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 6, 75, 24 * 6, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 192, 75, 600 * 2 - 192, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    }   else if (truckid == "Hotshot-40-72-96") {
        //40' Flatbed trailers

        //Set door text location
        doorText1.set("left", 160).setCoords();

        //Disable lines outside of truck template
        topLines[0] = new fabric.Line();
        topLines[11] = new fabric.Line();
        botLines[0] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 361).setCoords();
        topRightWeightText.set('left', 841).setCoords();
        botLeftWeightText.set('left', 361).setCoords();
        botRightWeightText.set('left', 841).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 361, top: 239, width: 168 * 2 + 142, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 841, top: 239, width: 168 * 2 + 142, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 361, top: 565, width: 168 * 2 + 142, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 841, top: 565, width: 168 * 2 + 142, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 5, 75, 24 * 5, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 120, 75, 600 * 2 - 120, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    } else if (truckid == "M42") {
        //42' Flatbed trailers

        //Set door text location
        doorText1.set("left", 120).setCoords();

        //Disable lines outside of truck template
        topLines[11] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 301).setCoords();
        topRightWeightText.set('left', 805).setCoords();
        botLeftWeightText.set('left', 301).setCoords();
        botRightWeightText.set('left', 805).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 301, top: 239, width: 168 * 3, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 805, top: 239, width: 168 * 3, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 301, top: 565, width: 168 * 3, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 805, top: 565, width: 168 * 3, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 144, 75, 600 * 2 - 144, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    }   else if (truckid == "RWW114") {
        //44' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 312).setCoords();
        topRightWeightText.set('left', 842).setCoords();
        botLeftWeightText.set('left', 312).setCoords();
        botRightWeightText.set('left', 842).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 312, top: 239, width: 192 * 3-48, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 842, top: 239, width: 192 * 3-48, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 312, top: 565, width: 192 * 3-48, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 842, top: 565, width: 192 * 3-48, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 96, 75, 600 * 2 - 96, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left);

    } else if (truckid == '46 Flatbed' || truckid == '1903') {
        //46' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 326).setCoords();
        topRightWeightText.set('left', 876).setCoords();
        botLeftWeightText.set('left', 326).setCoords();
        botRightWeightText.set('left', 876).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 326, top: 239, width: 192 * 3-26, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 876, top: 239, width: 192 * 3-26, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 326, top: 565, width: 192 * 3-26, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 876, top: 565, width: 192 * 3-26, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 48, 75, 600 * 2 - 48, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)
    } else if (truckid == '48 Flatbed' || truckid == 300 || truckid == 'Carrier-48-72-100' || truckid == 'Carrier-48-90-100' || truckid == "_MWRED48" || truckid == "_MWCONE48") {
        //48' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 337).setCoords();
        topRightWeightText.set('left', 913).setCoords();
        botLeftWeightText.set('left', 337).setCoords();
        botRightWeightText.set('left', 913).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 337, top: 239, width: 192 * 3-2, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 913, top: 239, width: 192 * 3-2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 337, top: 565, width: 192 * 3-2, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 913, top: 565, width: 192 * 3-2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    } else if (truckid == "0110" || truckid == "0801" || truckid == "0802" || truckid == '2003' || truckid == '2004' || truckid == '2005' || truckid == '2006' || truckid == '2007' || truckid == '2008' || truckid == "Custom Flatbed"
        || truckid == "611" || truckid == "NE101" || truckid == "NE102" || truckid == "NE103" || truckid == "NE104" || truckid == "NE105" || truckid == "NE106" || truckid == "NE107" || truckid == "NE108" || truckid == "NE109" || truckid == "NE110"
        || truckid == "TC2" || truckid == "131" || truckid == "132" || truckid == "133" || truckid == "135" || truckid == "150" || truckid == "161" || truckid == "162" || truckid == "164" || truckid == "168" || truckid == "171" || truckid == "172"
        || truckid == "173" || truckid == "177" || truckid == "189" || truckid == "193" || truckid == "201" || truckid == "224" || truckid == "Carrier-53-72-100" || truckid == "Carrier-53-90-100"
        || truckid == "2101" || truckid == "2102" || truckid == "2103" || truckid == "2104" || truckid == "2105" || truckid == "2106" || truckid == "_MWRED53" || truckid == "_MWCONE53") {
        //53' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 301).setCoords();
        topRightWeightText.set('left', 901).setCoords();
        botLeftWeightText.set('left', 301).setCoords();
        botRightWeightText.set('left', 901).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 301, top: 239, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 901, top: 239, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 301, top: 565, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 901, top: 565, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid group to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)
    } else {
        //set weight text location
        topLeftWeightText.set('left', 301).setCoords();
        topRightWeightText.set('left', 901).setCoords();
        botLeftWeightText.set('left', 301).setCoords();
        botRightWeightText.set('left', 901).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 301, top: 239, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 901, top: 239, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 301, top: 565, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 901, top: 565, width: 204 * 2 + 189, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});

        //Set mid groups to match left and right border
        createMidGroup(vLine5.left - vLine2.left, vLine2.left)

        door1 = '';
    }
    canvas.add(vLine2);
    canvas.add(vLine5);

    //top right corner
    canvas.add(new fabric.Line([600 * 2, 15, 600 * 2, 75], {stroke: 'black', strokeWidth: 2, selectable: false}));
    //top left corner
    canvas.add(new fabric.Line([0, 15, 0, 75], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //vertical lines - Reset so they don't show in flatbed templates
    vLine1 = new fabric.Line();
    canvas.add(vLine1);
    vLine3 = new fabric.Line();
    canvas.add(vLine3);
    vLine4 = new fabric.Line();
    canvas.add(vLine4);
}

/**
 * Creates lines, sets weight and region locations for 53' trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truck53(truckid) {
    //53' trailers

    //set weight text location
    topLeftWeightText.set('left', 248).setCoords();
    topRightWeightText.set('left', 1010).setCoords();
    botLeftWeightText.set('left', 248).setCoords();
    botRightWeightText.set('left', 1010).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 300, top: 239, width: 600, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 902, top: 239, width: 600, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 300, top: 565, width: 600, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 902, top: 565, width: 600, height: 162 * 2,}).setCoords();

    //Truck size info
    doorText1 = new fabric.IText(door1, {
        top: 105,
        left: 68,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText1);
    doorText2 = new fabric.IText(door2, {
        top: 105,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 105,
        left: 836,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText3);
    doorText4 = new fabric.IText(door4, {
        top: 675,
        left: 68,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText4);
    doorText5 = new fabric.IText(door5, {
        top: 675,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 675,
        left: 836,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText6);

//vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    if (truckid == "1904" || truckid == "1905" || truckid == "2107" || truckid == "2108") {
        vLine2 = new fabric.Line();
        vLine3 = new fabric.Line([240 * 2, 75, 240 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false})
        doorText1.set({left: 24});
        doorText2.set({left: 452 + 48});
        doorText4.set({left: 24});
        doorText5.set({left: 452 + 48});
    } else {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine3 = new fabric.Line([216 * 2, 75, 216 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    }
    canvas.add(vLine2);
    canvas.add(vLine3);
    vLine4 = new fabric.Line([408 * 2, 75, 408 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine5);

//Middle separator
    createMidGroup(vLine5.left - vLine1.left, vLine1.left)
}

/**
 * Creates lines, sets weight and region locations for 48' trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truck48(truckid) {
    //set weight text location
    topLeftWeightText.set('left', 242).setCoords();
    topRightWeightText.set('left', 915).setCoords();
    botLeftWeightText.set('left', 242).setCoords();
    botRightWeightText.set('left', 915).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 313, top: 239, width: 192 * 2 + 142, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 841, top: 239, width: 192 * 2 + 142, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 313, top: 565, width: 192 * 2 + 142, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 841, top: 565, width: 192 * 2 + 142, height: 162 * 2,}).setCoords();

//vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine2);
    vLine3 = new fabric.Line([216 * 2, 75, 216 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false})
    canvas.add(vLine3);
    vLine4 = new fabric.Line([408 * 2 - 96, 75, 408 * 2 - 96, 725], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    });
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600 * 2 - 96, 75, 600 * 2 - 96, 725], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    });
    canvas.add(vLine5);

    //right Border
    canvas.add(new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //Middle separator
    createMidGroup(vLine5.left - vLine2.left, vLine2.left)

    //middle canvas line
    canvas.add(new fabric.Line([0, 400, 1200, 400], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //Truck size info
    doorText1 = new fabric.IText(door1, {
        top: 105,
        left: 68,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText1);
    doorText2 = new fabric.IText(door2, {
        top: 105,
        left: 452,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 105,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText3);
    doorText4 = new fabric.IText(door4, {
        top: 675,
        left: 68,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText4);
    doorText5 = new fabric.IText(door5, {
        top: 675,
        left: 452,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 675,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText6);

    //diagonal lines
    canvas.add(new fabric.Line([0, 75, 24 * 2, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([24 * 2, 75, 0, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([0, 400, 24 * 2, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([24 * 2, 400, 0, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2 - 96, 75, 600 * 2, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2, 75, 600 * 2 - 96, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2 - 96, 400, 600 * 2, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2, 400, 600 * 2 - 96, 725], {stroke: 'black', selectable: false}));
}

/**
 * Creates lines, sets weight and region locations for 35' trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truck35(truckid) {
    //set weight text location
    topLeftWeightText.set('left', 434).setCoords();
    topRightWeightText.set('left', 818).setCoords();
    botLeftWeightText.set('left', 434).setCoords();
    botRightWeightText.set('left', 818).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 434, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 818, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 434, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 818, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

    //vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    vLine2 = new fabric.Line([120 * 2, 75, 120 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine2);
    vLine3 = new fabric.Line([312 * 2, 75, 312 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false})
    canvas.add(vLine3);
    vLine4 = new fabric.Line([504 * 2, 75, 504 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine5);

    //right Border
    canvas.add(new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //Middle separator
    createMidGroup(vLine4.left - vLine2.left, vLine2.left)

    //middle canvas line
    canvas.add(new fabric.Line([0, 400, 1200, 400], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //diagonal lines
    canvas.add(new fabric.Line([0, 75, 120 * 2, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([240, 75, 0, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([0, 400, 120 * 2, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([240, 400, 0, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([504 * 2, 75, 600 * 2, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2, 75, 504 * 2, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([504 * 2, 400, 600 * 2, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([600 * 2, 400, 504 * 2, 725], {stroke: 'black', selectable: false}));

    //Truck size info
    doorText1 = new fabric.IText('', {});
    doorText4 = new fabric.IText('', {});
    doorText2 = new fabric.IText(door2, {
        top: 105,
        left: 260,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 105,
        left: 644,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText3);
    doorText5 = new fabric.IText(door5, {
        top: 675,
        left: 260,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 675,
        left: 644,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 16
    });
    canvas.add(doorText6);
}

/**
 * Updates which trailers appear in truck list based on location
 * @param location - The location number that signals which trucks to be available
 */
function truckListUpdate(location){
    let brand = document.getElementById("brandText");
    let truck_1 = document.getElementById("Trucks_1");
    let truck_3 = document.getElementById("Trucks_3");
    let truck_4 = document.getElementById("Trucks_4");

    truck_1.style.display = "none";
    truck_3.style.display = "none";

    switch(location) {
        case '1': //AlexEast
            brand.innerText = "AlexEast"
            truck_1.style.display = "block";
            break;
        case '2': //AlexWest
            brand.innerText = "AlexWest"
            break;
        case '3': //Penneast
            brand.innerText = "PennEast"
            truck_3.style.display = "block";
            break;
        case '4': //Midwest
            brand.innerText = "MidWest"
            truck_4.style.display = "block";
            break;
        case '5': //RWW
            brand.innerText = "RWW"
            break;
        default: //Default AlexEast
            brand.innerText = "AlexEast"
            truck_1.style.display = "block";
    }
}
/**
 * Updates the total weight of the truck's contents
 */
function truckWeightUpdate(){
    try{
        let wCount = 0
        let objList = new Set()
        //Retrieves every rack or unit currently in canvas
        canvas.forEachObject(function (obj) {
            if (obj.isRack || obj.unit){objList.add(obj)}
        });
        //Retrieves every unit that is not in the canvas
        units.forEach(function (unit){objList.add(unit)})

        //Counts all obj's weight
        objList.forEach(function (obj){wCount += obj.weight;})

        let weightText = wCount.toString()
        if (weightText.length > 10){
            weightText = weightText.substring(0, 10) + "..."
        }

        _tWeight.innerText = weightText;

        if (truck.getWeight() > 0 && truck.getWeight() != "?" && (wCount > truck.getWeight())){_tWeight.style.color="red";} else {_tWeight.style.color="black";}
    }catch (e){
        if ( e instanceof ReferenceError ) {
            //Do nothing
        } else {
            console.log(e)
        }
    }
}