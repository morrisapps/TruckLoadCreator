/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

function truck35(truckid) {

    trailerTextEdit.set({text: truckid, fontSize: 16, fontStyle: "normal", top: 23});


    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);


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

    canvas.add(new fabric.Line([0, 725, 0, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));

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

    canvas.add(new fabric.Line([600 * 2, 725, 600 * 2, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));

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
    //Placement + 15 or - 35 below horizontal line, + 20 from Veritcal line
    doorText1 = new fabric.IText('', {});
    doorText4 = new fabric.IText('', {});
    doorText2 = new fabric.IText(door2, {
        top: 90,
        left: 260,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText2);
    doorText3 = new fabric.IText(door3, {
        top: 90,
        left: 644,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText3);
    doorText5 = new fabric.IText(door5, {
        top: 690,
        left: 260,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText5);
    doorText6 = new fabric.IText(door6, {
        top: 690,
        left: 644,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
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