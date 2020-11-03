/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

function truckLoad(id) {
    truckid = id;
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
        truckCustom();
    }
}


function heightLines() {
    canvas.forEachObject(function (obj) {
        if (obj instanceof fabric.Line && obj.tool != true) {
            canvas.remove(obj);
        } else if (obj.isCounter == true) {
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
            stroke: "grey",
            fill: 'grey',
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
            stroke: "grey",
            fill: 'grey',
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

function truckCustom() {
    trailerTextEdit.set({text: "Enter trailer", fontSize: 15, fontStyle: "italic", top: 25});
    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);

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
    vLine2 = new fabric.Line([24 * 2, 75, 24 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine2);
    vLine3 = new fabric.Line([216 * 2, 75, 216 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false})
    canvas.add(vLine3);
    vLine4 = new fabric.Line([408 * 2, 75, 408 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600 * 2, 15, 600 * 2, 725], {stroke: 'black', strokeWidth: 2, selectable: false});
    canvas.add(vLine5);
    canvas.add(new fabric.Line([600 * 2, 725, 600 * 2, 925], {stroke: 'black', strokeWidth: 2, selectable: false}));

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