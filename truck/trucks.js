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

    if (id == '' || id == null || id == 'start' || id == 'Custom Flatbed'){trailerTextEdit.set({text: "Enter trailer", fontSize: 15, fontStyle: "italic", top: 25});}
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
    } else if (truck.getLength() == 45  && truck.getType() == 0) {
        truck45(truckID);
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
    truckWeightUpdate(0);

    midLine.bringToFront();
    vLine1.bringToFront();
    vLine2.bringToFront();
    vLine3.bringToFront();
    vLine4.bringToFront();
    vLine5.bringToFront();

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

    //Weight unit containers
    topLeftWeightUnits = new Set();
    topMiddleWeightUnits = new Set();
    topRightWeightUnits = new Set();
    botLeftWeightUnits = new Set();
    botMiddleWeightUnits = new Set();
    botRightWeightUnits = new Set();
    weightUnits = [topLeftWeightUnits,topMiddleWeightUnits,topRightWeightUnits,botLeftWeightUnits,botMiddleWeightUnits,botRightWeightUnits];
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
    //middle canvas line
    midLine = new fabric.Line([0, 400, 1200, 400], {
        id: "midLine",
        stroke: 'black',
        strokeWidth: 5,
        height: 7,
        intersects: true,
        selectable: false
    });
    canvas.add(midLine);
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
 * Creates lines, sets weight and region locations for truck custom
 */
function truckCustom() {
    //set weight text location
    topLeftWeightText.set('left', 248).setCoords();
    topMiddleWeightText.set('left', 626).setCoords();
    topRightWeightText.set('left', 1010).setCoords();
    botLeftWeightText.set('left', 248).setCoords();
    botMiddleWeightText.set('left', 626).setCoords();
    botRightWeightText.set('left', 1010).setCoords();

    //Set region's size and location
    topLeftWeightRegion.set({left: 218, top: 239, width: 216 * 2, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 626, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 1010, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 218, top: 565, width: 216 * 2, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 626, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 1010, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

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
        topLeftWeightText.set('left', 442).setCoords();
        topMiddleWeightText.set('left', 650).setCoords();
        topRightWeightText.set('left', 858).setCoords();
        botLeftWeightText.set('left', 442).setCoords();
        botMiddleWeightText.set('left', 660).setCoords();
        botRightWeightText.set('left', 858).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 442, top: 239, width: 104 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 650, top: 239, width: 104 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 858, top: 239, width: 104 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 442, top: 565, width: 104 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 650, top: 565, width: 104 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 858, top: 565, width: 104 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 14, 75, 24 * 14, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 240, 75, 600 * 2 - 240, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*14, y1: 400, x2: 1200-240, y2: 400,});

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
        topLeftWeightText.set('left', 370).setCoords();
        topMiddleWeightText.set('left', 626).setCoords();
        topRightWeightText.set('left', 882).setCoords();
        botLeftWeightText.set('left', 370).setCoords();
        botMiddleWeightText.set('left', 626).setCoords();
        botRightWeightText.set('left', 882).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 370, top: 239, width: 128 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 626, top: 239, width: 128 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 882, top: 239, width: 128 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 370, top: 565, width: 128 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 626, top: 565, width: 128 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 882, top: 565, width: 128 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 10, 75, 24 * 10, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 192, 75, 600 * 2 - 192, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*10, y1: 400, x2: 1200-192, y2: 400,});

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
        topLeftWeightText.set('left', 290).setCoords();
        topMiddleWeightText.set('left', 578).setCoords();
        topRightWeightText.set('left', 866).setCoords();
        botLeftWeightText.set('left', 290).setCoords();
        botMiddleWeightText.set('left', 578).setCoords();
        botRightWeightText.set('left', 866).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 290, top: 239, width: 144 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 578, top: 239, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 866, top: 239, width: 144 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 290, top: 565, width: 144 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 578, top: 565, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 866, top: 565, width: 144 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 6, 75, 24 * 6, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 192, 75, 600 * 2 - 192, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*6, y1: 400, x2: 1200-192, y2: 400,});

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
        topLeftWeightText.set('left', 290).setCoords();
        topMiddleWeightText.set('left', 602).setCoords();
        topRightWeightText.set('left', 914).setCoords();
        botLeftWeightText.set('left', 290).setCoords();
        botMiddleWeightText.set('left', 602).setCoords();
        botRightWeightText.set('left', 914).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 290, top: 239, width: 168 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 602, top: 239, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 914, top: 239, width: 168 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 290, top: 565, width: 168 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 602, top: 565, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 914, top: 565, width: 168 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 5, 75, 24 * 5, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 120, 75, 600 * 2 - 120, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*5, y1: 400, x2: 1200-120, y2: 400,});

    } else if (truckid == "M42") {
        //42' Flatbed trailers

        //Set door text location
        doorText1.set("left", 120).setCoords();

        //Disable lines outside of truck template
        topLines[11] = new fabric.Line();
        botLines[11] = new fabric.Line();

        //set weight text location
        topLeftWeightText.set('left', 218).setCoords();
        topMiddleWeightText.set('left', 554).setCoords();
        topRightWeightText.set('left', 890).setCoords();
        botLeftWeightText.set('left', 218).setCoords();
        botMiddleWeightText.set('left', 554).setCoords();
        botRightWeightText.set('left', 890).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 218, top: 239, width: 168 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 554, top: 239, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 890, top: 239, width: 168 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 218, top: 565, width: 168 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 554, top: 565, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 890, top: 565, width: 168 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 144, 75, 600 * 2 - 144, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*2, y1: 400, x2: 1200-144, y2: 400,});

    }   else if (truckid == "RWW114") {
        //44' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 242).setCoords();
        topMiddleWeightText.set('left', 578).setCoords();
        topRightWeightText.set('left', 914).setCoords();
        botLeftWeightText.set('left', 242).setCoords();
        botMiddleWeightText.set('left', 578).setCoords();
        botRightWeightText.set('left', 914).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 578, top: 239, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 914, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 242, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 578, top: 565, width: 144 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 914, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 96, 75, 600 * 2 - 96, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set( {x1: 24*2, y1: 400, x2: 1200-96, y2: 400,});

    } else if (truckid == '46 Flatbed' || truckid == '1903') {
        //46' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 242).setCoords();
        topMiddleWeightText.set('left', 602).setCoords();
        topRightWeightText.set('left', 962).setCoords();
        botLeftWeightText.set('left', 242).setCoords();
        botMiddleWeightText.set('left', 602).setCoords();
        botRightWeightText.set('left', 962).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 602, top: 239, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 962, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 242, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 602, top: 565, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 962, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 48, 75, 600 * 2 - 48, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set({x1: 24*2, y1: 400, x2: 1200 - 48, y2: 400,});
    } else if (truckid == '48 Flatbed' || truckid == 300 || truckid == 'Carrier-48-72-100' || truckid == 'Carrier-48-90-100') {
        //48' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 242).setCoords();
        topMiddleWeightText.set('left', 626).setCoords();
        topRightWeightText.set('left', 1010).setCoords();
        botLeftWeightText.set('left', 242).setCoords();
        botMiddleWeightText.set('left', 626).setCoords();
        botRightWeightText.set('left', 1010).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 626, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 1010, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 242, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 626, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 1010, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set({x1: 24 * 2, y1: 400, x2: 1200, y2: 400});

    } else if (truckid == "0110" || truckid == "0801" || truckid == "0802" || truckid == '2003' || truckid == '2004' || truckid == '2005' || truckid == '2006' || truckid == '2007' || truckid == '2008' || truckid == "Custom Flatbed"
        || truckid == "611" || truckid == "NE101" || truckid == "NE102" || truckid == "NE103" || truckid == "NE104" || truckid == "NE105" || truckid == "NE106" || truckid == "NE107" || truckid == "NE108" || truckid == "NE109" || truckid == "NE110"
        || truckid == "TC2" || truckid == "131" || truckid == "132" || truckid == "133" || truckid == "135" || truckid == "150" || truckid == "161" || truckid == "162" || truckid == "164" || truckid == "168" || truckid == "171" || truckid == "172"
        || truckid == "173" || truckid == "177" || truckid == "189" || truckid == "193" || truckid == "201" || truckid == "224" || truckid == "Carrier-53-72-100" || truckid == "Carrier-53-90-100"
        || truckid == "2101" || truckid == "2102" || truckid == "2103" || truckid == "2104" || truckid == "2105" || truckid == "2106") {
        //53' Flatbed trailers
        //set weight text location
        topLeftWeightText.set('left', 206).setCoords();
        topMiddleWeightText.set('left', 602).setCoords();
        topRightWeightText.set('left', 998).setCoords();
        botLeftWeightText.set('left', 206).setCoords();
        botMiddleWeightText.set('left', 602).setCoords();
        botRightWeightText.set('left', 998).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 206, top: 239, width: 204 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 602, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 998, top: 239, width: 204 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 206, top: 565, width: 204 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 602, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 998, top: 565, width: 204 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});

    } else {
        //set weight text location
        topLeftWeightText.set('left', 206).setCoords();
        topMiddleWeightText.set('left', 601).setCoords();
        topRightWeightText.set('left', 997).setCoords();
        botLeftWeightText.set('left', 206).setCoords();
        botMiddleWeightText.set('left', 602).setCoords();
        botRightWeightText.set('left', 997).setCoords();
        //Set region's size and location
        topLeftWeightRegion.set({left: 206, top: 239, width: 204 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 601, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 997, top: 239, width: 204 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 206, top: 565, width: 204 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 601, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 997, top: 565, width: 204 * 2, height: 162 * 2,}).setCoords();

        //Set left and right borders
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        //Set mid line to match left and right border
        midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});

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
    topMiddleWeightText.set('left', 626).setCoords();
    topRightWeightText.set('left', 1010).setCoords();
    botLeftWeightText.set('left', 248).setCoords();
    botMiddleWeightText.set('left', 626).setCoords();
    botRightWeightText.set('left', 1010).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 218, top: 239, width: 216 * 2, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 626, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 1010, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 218, top: 565, width: 216 * 2, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 626, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 1010, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

    if (truckid == "1904" || truckid == "1905") {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 240 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 650, top: 239, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 1010, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 242, top: 565, width: 240 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 650, top: 565, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 1010, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
    }

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

//middle canvas line
    midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});

//vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    if (truckid == "1904" || truckid == "1905") {
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
}

/**
 * Creates lines, sets weight and region locations for 48' trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truck48(truckid) {
    //set weight text location
    topLeftWeightText.set('left', 242).setCoords();
    topMiddleWeightText.set('left', 578).setCoords();
    topRightWeightText.set('left', 915).setCoords();
    botLeftWeightText.set('left', 242).setCoords();
    botMiddleWeightText.set('left', 578).setCoords();
    botRightWeightText.set('left', 915).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 578, top: 239, width: 144 * 2-4, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 915, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 242, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 578, top: 565, width: 144 * 2-4, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 915, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

//middle canvas line
    midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});

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
 * Creates lines, sets weight and region locations for 45' trucks.
 * Uses truckid to determine where lines, counter text, and weight regions should be placed
 * @param truckid - The trailer number
 */
function truck45(truckid) {
    //set weight text location
    topLeftWeightText.set('left', 290).setCoords();
    topMiddleWeightText.set('left', 602).setCoords();
    topRightWeightText.set('left', 914).setCoords();
    botLeftWeightText.set('left', 290).setCoords();
    botMiddleWeightText.set('left', 602).setCoords();
    botRightWeightText.set('left', 914).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 290, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 602, top: 239, width: 120 * 2-4, height: 162 * 2,}).setCoords();
    topRightWeightRegion.set({left: 914, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 290, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 602, top: 565, width: 120 * 2-4, height: 162 * 2,}).setCoords();
    botRightWeightRegion.set({left: 914, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

//vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine1);
    vLine2 = new fabric.Line([24 * 2 + 48, 75, 24 * 2 + 48, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine2);
    vLine3 = new fabric.Line([216 * 2 + 48, 75, 216 * 2 + 48, 725], {
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    })
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

    //Truck size info
    doorText1 = new fabric.IText(door1, {
        top: 105,
        left: 68 + 48,
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
        left: 452 + 48,
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
        left: 68 + 48,
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
        left: 452 + 48,
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
    canvas.add(new fabric.Line([0, 75, 24 * 2 + 48, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([24 * 2 + 48, 75, 0, 400], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([0, 400, 24 * 2 + 48, 725], {stroke: 'black', selectable: false}));
    canvas.add(new fabric.Line([24 * 2 + 48, 400, 0, 725], {stroke: 'black', selectable: false}));
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
    topMiddleWeightText.set({left: 0, text: ''}).setCoords();
    topRightWeightText.set('left', 818).setCoords();
    botLeftWeightText.set('left', 434).setCoords();
    botMiddleWeightText.set({left: 0, text: ''}).setCoords();
    botRightWeightText.set('left', 818).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 434, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 0, top: 0, width: 0, height: 0,}).setCoords();
    topRightWeightRegion.set({left: 818, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 434, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 0, top: 0, width: 0, height: 0,}).setCoords();
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
    //let t35_1 = document.getElementById('35Trucks_1');
    //let t47_1 = document.getElementById('47Trucks_1');
    //let t48_1 = document.getElementById('48Trucks_1');
    //let t53_1 = document.getElementById('53Trucks_1');
    //let flat_1 = document.getElementById('flatbedTrucks_1');
    //let flat_3 = document.getElementById('flatbedTrucks_3');
    //let cur_3 = document.getElementById('curtainTrucks_3');
    //let con_3 = document.getElementById('conestogaTrucks_3');
    //let cus_a = document.getElementById('customTruck_a');

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
 * @param {int} weightChange - The weight amount that will be added or subtracted.
 */
function truckWeightUpdate(weightChange){
    if (!isNaN(weightChange)){
        weightCount = weightCount + (weightChange);
    }
    _tWeight.innerText = weightCount;
    if (truck.getWeight() > 0 && truck.getWeight() != "?" && (weightCount > truck.getWeight())){_tWeight.style.color="red";} else {_tWeight.style.color="black";}
}