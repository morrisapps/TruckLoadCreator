/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
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

    truckid = id;
    if (id == '' || id == null || id == 'start'){trailerTextEdit.set({text: "Enter trailer", fontSize: 15, fontStyle: "italic", top: 25});}
    else {trailerTextEdit.set({text: truckid, fontSize: 16, fontStyle: "normal", top: 23});}

    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);

    if (truckid == "1001" || truckid == "1101" || truckid == "1401" || truckid == "1103" || truckid == "1605" || truckid == "1901" || truckid == "1202" || truckid == "1301" || truckid == "1302" || truckid == "1904" || truckid == "1905") {
        truck53(truckid);
    } else if (truckid == "1201" || truckid == "1501" || truckid == "9802" || truckid == "9903" || truckid == "9904" || truckid == "9905" || truckid == "1102" || truckid == "1601" || truckid == "1602" || truckid == "1604" || truckid == "1902") {
        truck48(truckid);
    } else if (truckid == "9001" || truckid == "8103" || truckid == "9803" || truckid == "9902" || truckid == "9801" || truckid == "9901") {
        truck45(truckid);
    } else if (truckid == "9002" || truckid == "1303" || truckid == "1603") {
        truck35(truckid);
    } else if (truckid == "1903" || truckid == 'Custom Flatbed' || truckid == '46 Flatbed' || truckid == '48 Flatbed' || truckid == "110" || truckid == "801" || truckid == "802" || truckid == "RWW114") {
        truckCurtain(truckid);
    } else {
        trucks();
    }
    canvas.forEachObject(function (obj) {
        if (obj.unit == true) {
            updateCount(obj);
            obj.bringToFront();
        }
    });

    midLine.bringToFront();
    vLine1.bringToFront();
    vLine2.bringToFront();
    vLine3.bringToFront();
    vLine4.bringToFront();
    vLine5.bringToFront();

    if (id != 'start') {saveToBrowser();}
}

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

    //Weight text
    topLeftWeightText = new fabric.IText('', {
        id: 'topLeftWeightText',
        top: 90,
        left: 248,
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
        originX: 'center',
        isCounter: true
    });
    topMiddleWeightText = new fabric.IText('', {
        id: 'topMiddleWeightText',
        width: 1000,
        height: 500,
        top: 90,
        left: 626,
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
        originX: 'center',
        isCounter: true
    });
    topRightWeightText = new fabric.IText('', {
        id: 'topRightWeightText',
        width: 1000,
        height: 500,
        top: 90,
        left: 1010,
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
        originX: 'center',
        isCounter: true
    });
    botLeftWeightText = new fabric.IText('', {
        id: 'botLeftWeightText',
        width: 1000,
        height: 500,
        top: 690,
        left: 248,
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
        originX: 'center',
        isCounter: true
    });
    botMiddleWeightText = new fabric.IText('', {
        id: 'botMiddleWeightText',
        width: 1000,
        height: 500,
        top: 690,
        left: 626,
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
        originX: 'center',
        isCounter: true
    });
    botRightWeightText = new fabric.IText('', {
        id: 'botRightWeightText',
        width: 1000,
        height: 500,
        top: 690,
        left: 1010,
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
        originX: 'center',
        isCounter: true
    });
    weightTexts = [topLeftWeightText, topMiddleWeightText, topRightWeightText, botLeftWeightText, botMiddleWeightText, botRightWeightText];
    //Add Weight Regions and counters
    canvas.add(topLeftWeightRegion,topMiddleWeightRegion,topRightWeightRegion,botLeftWeightRegion,botMiddleWeightRegion,botRightWeightRegion);
    canvas.add(topLeftWeightText,topMiddleWeightText,topRightWeightText,botLeftWeightText,botMiddleWeightText,botRightWeightText);
}

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
    canvas.add(new fabric.Line([0, 45, 1200, 45], {
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

function trucks() {
    //Creates lines, sets weight and region locations for truck custom

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

function truckCurtain(truckid) {
    //door2 to door6 are not used for curtains
    door2 = '';
    door3 = '';
    door4 = '';
    door5 = '';
    door6 = '';

    if (truckid == "1903") {
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
        door1 = '90"H - 90"D (Full flatbed) - 47\'6"W';
    } else if (truckid == 'Custom Flatbed') {
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
        door1 = '';
    } else if (truckid == '46 Flatbed') {
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
        door1 = '90"H - 90"D (Full flatbed) - 46\'"W';
    } else if (truckid == '48 Flatbed') {
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
        door1 = '90"H - 90"D (Full flatbed) - 48\'W';
    } else if (truckid == "110" || truckid == "801" || truckid == "802") {
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
        door1 = '95"H - 90"D (Full flatbed) - 3x16\'W';
    } else if (truckid == "RWW114") {
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
        door1 = '90"H - 90"D (Full flatbed) - 44\'W';
    }

    //top right corner
    canvas.add(new fabric.Line([600 * 2, 15, 600 * 2, 75], {stroke: 'black', strokeWidth: 2, selectable: false}));
    //top left corner
    canvas.add(new fabric.Line([0, 15, 0, 75], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //vertical lines
    vLine1 = new fabric.Line();
    canvas.add(vLine1);
    if (truckid == "46 Flatbed") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 48, 75, 600 * 2 - 48, 725], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: false
        });
        midLine.set({x1: 24*2, y1: 400, x2: 1200 - 48, y2: 400,});
    } else if (truckid == "Custom Flatbed") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: true,
            lockMovementY: true,
            line: true
        });
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: true,
            lockMovementY: true,
            line: true
        });
        midLine.set({x1: 24*2, y1: 400, x2: 1200, y2: 400});
    } else if (truckid == "1903" || truckid == "48 Flatbed") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        midLine.set({x1: 24 * 2, y1: 400, x2: 1200, y2: 400});
    } else if (truckid == "RWW114") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 96, 75, 600 * 2 - 96, 725], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: false
        });
        midLine.set( {x1: 24*2, y1: 400, x2: 1200-96, y2: 400,});
    } else {
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});
    }
    canvas.add(vLine2);
    vLine3 = new fabric.Line();
    canvas.add(vLine3);
    vLine4 = new fabric.Line();
    canvas.add(vLine4);

    canvas.add(vLine5);

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
}

function truck53(truckid) {

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

    if (truckid == "1001" || truckid == "1101" || truckid == "1401") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1103") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 52"D - 16\'W Offset';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 44"D - 16\'W Offset';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1605" || truckid == "1901") {
        door1 = '105"H - 52"D - 16\'W Offset';
        door2 = '105"H - 44"D - 16\'W Offset';
        door3 = '105"H - 52"D - 16\'W Offset';
        door4 = '105"H - 44"D - 16\'W Offset';
        door5 = '105"H - 52"D - 16\'W Offset';
        door6 = '105"H - 44"D - 16\'W Offset';
    } else if (truckid == "1202" || truckid == "1301" || truckid == "1302") {
        door1 = '105"H - 52"D - 16\'W Offset';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 44"D - 16\'W Offset';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1904" || truckid == "1905") {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 240 * 2, height: 162 * 2,}).setCoords();
        topMiddleWeightRegion.set({left: 650, top: 239, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        topRightWeightRegion.set({left: 1010, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
        botLeftWeightRegion.set({left: 242, top: 565, width: 240 * 2, height: 162 * 2,}).setCoords();
        botMiddleWeightRegion.set({left: 650, top: 565, width: 168 * 2-4, height: 162 * 2,}).setCoords();
        botRightWeightRegion.set({left: 1010, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

        door1 = '105"H - 52"D - 20\'6"W Offset';
        door2 = '105"H - 44"D - 14\'6"W Offset';
        door3 = '105"H - 52"D - 16\'6"W Offset';
        door4 = '105"H - 44"D - 20\'6"W Offset';
        door5 = '106"H - 52"D - 14\'6"W Offset';
        door6 = '105"H - 44"D - 16\'6"W Offset';
    } else {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
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
    midLine = new fabric.Line({x1: 0, y1: 400, x2: 1200, y2: 400});
    canvas.add(midLine);

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

    if (truckid == "1201" || truckid == "1501") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 13\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 13\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "9802" || truckid == "9903" || truckid == "9904" || truckid == "9905") {
        door1 = '95"H - 48"D - 16\'W';
        door2 = '95"H - 48"D - 12\'W';
        door3 = '95"H - 48"D - 16\'W';
        door4 = '95"H - 48"D - 16\'W';
        door5 = '95"H - 48"D - 12\'W';
        door6 = '95"H - 48"D - 16\'W';
    } else if (truckid == "1102") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 52"D - 13\'W Offset';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 44"D - 13\'W Offset';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1601") {
        door1 = '105"H - 44"D - 16\'W Offset';
        door2 = '105"H - 52"D - 13\'W Offset';
        door3 = '105"H - 44"D - 16\'W Offset';
        door4 = '105"H - 52"D - 16\'W Offset';
        door5 = '105"H - 44"D - 13\'W Offset';
        door6 = '105"H - 52"D - 16\'W Offset';
    } else if (truckid == "1602" || truckid == "1604" || truckid == "1902") {
        door1 = '105"H - 52"D - 16\'W Offset';
        door2 = '105"H - 44"D - 13\'W Offset';
        door3 = '105"H - 52"D - 16\'W Offset';
        door4 = '105"H - 44"D - 16\'W Offset';
        door5 = '105"H - 52"D - 13\'W Offset';
        door6 = '105"H - 44"D - 16\'W Offset';
    } else {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    }
//middle canvas line
    midLine.set({x1: 0, y1: 400, x2: 1200, y2: 400});
    canvas.add(midLine);

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

    if (truckid == "9001" || truckid == "8103" || truckid == "9803" || truckid == "9902" || truckid == "9801" || truckid == "9901") {
        door1 = '95"H - 48"D - 16\'W';
        door2 = '95"H - 48"D - 8\'W';
        door3 = '95"H - 48"D - 16\'W';
        door4 = '95"H - 48"D - 16\'W';
        door5 = '95"H - 48"D - 8\'W';
        door6 = '95"H - 48"D - 16\'W';
    } else {
        door1 = '95"H - 48"D - 16\'W';
        door2 = '95"H - 48"D - 8\'W';
        door3 = '95"H - 48"D - 16\'W';
        door4 = '95"H - 48"D - 16\'W';
        door5 = '95"H - 48"D - 8\'W';
        door6 = '95"H - 48"D - 16\'W';
    }

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

function truck35(truckid) {

    //set weight text location
    topLeftWeightText.set('left', 434).setCoords();
    topMiddleWeightText.set({left: 0, top: 0, text: ''}).setCoords();
    topRightWeightText.set('left', 818).setCoords();
    botLeftWeightText.set('left', 434).setCoords();
    botMiddleWeightText.set({left: 0, top: 0, text: ''}).setCoords();
    botRightWeightText.set('left', 818).setCoords();
    //Set region's size and location
    topLeftWeightRegion.set({left: 434, top: 239, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    topMiddleWeightRegion.set({left: 0, top: 0, width: 0, height: 0,}).setCoords();
    topRightWeightRegion.set({left: 818, top: 239, width: 192 * 2, height: 162 * 2,}).setCoords();
    botLeftWeightRegion.set({left: 434, top: 565, width: 192 * 2-4, height: 162 * 2,}).setCoords();
    botMiddleWeightRegion.set({left: 0, top: 0, width: 0, height: 0,}).setCoords();
    botRightWeightRegion.set({left: 818, top: 565, width: 192 * 2, height: 162 * 2,}).setCoords();

    if (truckid == "9002" || truckid == "1303") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1603") {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 52"D - 16\'W Offset';
        door3 = '105"H - 44"D - 16\'W Offset';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 44"D - 16\'W Offset';
        door6 = '105"H - 52"D - 16\'W Offset';
    } else {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    }

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