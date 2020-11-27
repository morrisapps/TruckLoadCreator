/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

function truckCurtain(truckid) {
    weightInit();

    trailerTextEdit.set({text: truckid, fontSize: 16, fontStyle: "normal", top: 23});

    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);


    if (truckid == "1903") {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 625, top: 239, width: 192 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 1009, top: 239, width: 192 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 242, top: 566, width: 192 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 625, top: 566, width: 192 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 1009, top: 566, width: 192 * 2, height: 162 * 2,});
        door1 = '90"H - 90"D (Full flatbed) - 47\'6"W';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    } else if (truckid == 'Custom Flatbed') {
        //Set region's size and location
        topLeftWeightRegion.set({left: 206, top: 239, width: 204 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 601, top: 239, width: 192 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 997, top: 239, width: 204 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 206, top: 566, width: 204 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 601, top: 566, width: 192 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 997, top: 566, width: 204 * 2, height: 162 * 2,});
        door1 = '';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    } else if (truckid == '46 Flatbed') {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 601, top: 239, width: 168 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 961, top: 239, width: 192 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 242, top: 566, width: 192 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 601, top: 566, width: 168 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 961, top: 566, width: 192 * 2, height: 162 * 2,});
        door1 = '90"H - 90"D (Full flatbed) - 46\'"W';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    } else if (truckid == '48 Flatbed') {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 625, top: 239, width: 192 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 1009, top: 239, width: 192 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 242, top: 566, width: 192 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 625, top: 566, width: 192 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 1009, top: 566, width: 192 * 2, height: 162 * 2,});
        door1 = '90"H - 90"D (Full flatbed) - 48\'W';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    } else if (truckid == "110" || truckid == "801" || truckid == "802") {
        //Set region's size and location
        topLeftWeightRegion.set({left: 206, top: 239, width: 204 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 601, top: 239, width: 192 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 997, top: 239, width: 204 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 206, top: 566, width: 204 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 601, top: 566, width: 192 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 997, top: 566, width: 204 * 2, height: 162 * 2,});
        door1 = '95"H - 90"D (Full flatbed) - 3x16\'W';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    } else if (truckid == "RWW114") {
        //Set region's size and location
        topLeftWeightRegion.set({left: 242, top: 239, width: 192 * 2, height: 162 * 2,});
        topMiddleWeightRegion.set({left: 577, top: 239, width: 144 * 2, height: 162 * 2,});
        topRightWeightRegion.set({left: 913, top: 239, width: 192 * 2, height: 162 * 2,});
        botLeftWeightRegion.set({left: 242, top: 566, width: 192 * 2, height: 162 * 2,});
        botMiddleWeightRegion.set({left: 577, top: 566, width: 144 * 2, height: 162 * 2,});
        botRightWeightRegion.set({left: 913, top: 566, width: 192 * 2, height: 162 * 2,});
        door1 = '90"H - 90"D (Full flatbed) - 44\'W';
        door2 = '';
        door3 = '';
        door4 = '';
        door5 = '';
        door6 = '';
    }


    heightLines();

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

    //bottom canvas line
    canvas.add(new fabric.Line([0, 725, 1200, 725], {
        id: 'canvasBotton',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false
    }));

    canvas.add(new fabric.Line([0, 725, 0, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));
    canvas.add(new fabric.Line([600 * 2, 15, 600 * 2, 75], {stroke: 'black', strokeWidth: 2, selectable: false}));
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
        midLine = new fabric.Line([24 * 2, 400, 1200 - 48, 400], {
            id: "midLine",
            stroke: 'black',
            strokeWidth: 5,
            height: 7,
            intersects: true,
            selectable: false
        });
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
        midLine = new fabric.Line([24 * 2, 400, 1200, 400], {
            id: "midLine",
            stroke: 'black',
            strokeWidth: 5,
            height: 7,
            intersects: true,
            selectable: false
        });
    } else if (truckid == "1903" || truckid == "48 Flatbed") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        midLine = new fabric.Line([24 * 2, 400, 1200, 400], {
            id: "midLine",
            stroke: 'black',
            strokeWidth: 5,
            height: 7,
            intersects: true,
            selectable: false
        });
    } else if (truckid == "RWW114") {
        vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2 - 96, 75, 600 * 2 - 96, 725], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: false
        });
        midLine = new fabric.Line([24 * 2, 400, 1200 - 96, 400], {
            id: "midLine",
            stroke: 'black',
            strokeWidth: 5,
            height: 7,
            intersects: true,
            selectable: false
        });
    } else {
        vLine2 = new fabric.Line([0, 75, 0, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        vLine5 = new fabric.Line([600 * 2, 75, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
        midLine = new fabric.Line([0, 400, 1200, 400], {
            id: "midLine",
            stroke: 'black',
            strokeWidth: 5,
            height: 7,
            intersects: true,
            selectable: false
        });
    }

    canvas.add(midLine);
    canvas.add(vLine2);
    vLine3 = new fabric.Line();
    canvas.add(vLine3);
    vLine4 = new fabric.Line();
    canvas.add(vLine4);

    canvas.add(vLine5);
    canvas.add(new fabric.Line([600 * 2, 725, 600 * 2, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));

    //Truck size info
    //Placement + 15 or - 35 below horizontal line, + 20 from Veritcal line
    doorText1 = new fabric.IText(door1, {
        top: 90,
        left: 68 + 12,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText1);
    doorText2 = new fabric.IText(door2, {
        top: 90,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 90,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText3);
    doorText4 = new fabric.IText(door4, {
        top: 690,
        left: 68,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText4);
    doorText5 = new fabric.IText(door5, {
        top: 690,
        left: 452,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 690,
        left: (408 * 2 - 96) + 20,
        textAlign: 'left',
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText6);

    canvas.forEachObject(function (obj) {
        if (obj.unit == true) {
            updateHeightCount(obj);
            obj.bringToFront();
        }
    });

    midLine.bringToFront();
    vLine1.bringToFront();
    vLine2.bringToFront();
    vLine3.bringToFront();
    vLine4.bringToFront();
    vLine5.bringToFront();

}