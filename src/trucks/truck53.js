function truck53(truckid){

    trailerTextEdit.set({text: truckid, fontSize: 16, fontStyle: "normal", top: 23});

    canvas.remove(doorText1);
    canvas.remove(doorText2);
    canvas.remove(doorText3);
    canvas.remove(doorText4);
    canvas.remove(doorText5);
    canvas.remove(doorText6);



    if (truckid == "1001" || truckid == "1101" || truckid == "1401"){
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1103"){
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 52"D - 16\'W Offset';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 44"D - 16\'W Offset';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1605" || truckid == "1901"){
        door1 = '105"H - 52"D - 16\'W Offset';
        door2 = '105"H - 44"D - 16\'W Offset';
        door3 = '105"H - 52"D - 16\'W Offset';
        door4 = '105"H - 44"D - 16\'W Offset';
        door5 = '105"H - 52"D - 16\'W Offset';
        door6 = '105"H - 44"D - 16\'W Offset';
    } else if (truckid == "1202" || truckid == "1301" || truckid == "1302"){
        door1 = '105"H - 52"D - 16\'W Offset';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 44"D - 16\'W Offset';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    } else if (truckid == "1904" || truckid == "1905"){
        door1 = '105"H - 52"D - 20\'6"W Offset';
        door2 = '105"H - 44"D - 14\'6"W Offset';
        door3 = '105"H - 52"D - 16\'6"W Offset';
        door4 = '105"H - 44"D - 20\'6"W Offset';
        door5 = '106"H - 52"D - 14\'6"W Offset';
        door6 = '105"H - 44"D - 16\'6"W Offset';
    }
    else {
        door1 = '105"H - 48"D - 16\'W';
        door2 = '105"H - 48"D - 16\'W';
        door3 = '105"H - 48"D - 16\'W';
        door4 = '105"H - 48"D - 16\'W';
        door5 = '105"H - 48"D - 16\'W';
        door6 = '105"H - 48"D - 16\'W';
    }

    //Truck size info
    //Placement + 15 or - 35 below horizontal line, + 20 from Veritcal line
    doorText1 =new fabric.IText(door1, {
        top: 90,
        left: 68,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText1);
    doorText2 =new fabric.IText(door2, {
        top: 90,
        left: 452,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText2);
    doorText3 =new fabric.IText(door3, {
        top: 90,
        left: 836,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText3);
    doorText4 =new fabric.IText(door4, {
        top: 690,
        left: 68,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText4);
    doorText5 =new fabric.IText(door5, {
        top: 690,
        left: 452,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    })
    canvas.add(doorText5);
    doorText6 =new fabric.IText(door6, {
        top: 690,
        left: 836,
        textAlign: 'left', //added
        //originX: 'center', //added
        //stroke: "grey",
        fill: 'grey',
        hasControls: false,
        selectable: false,
        fontSize: 20
    });
    canvas.add(doorText6);



heightLines();

//border
    canvas.add(new fabric.Line([0, 15, 0, 925], { id: 'borderLeft', stroke: '#ccc', strokeWidth: 2, selectable: false, }));
    canvas.add(new fabric.Line([1200, 15, 1200, 925], { id: 'borderRight', stroke: '#ccc', strokeWidth: 2, selectable: false }));
    canvas.add(new fabric.Line([0, 15, 1200, 15], { id: 'borderTop', stroke: '#ccc', strokeWidth: 2, selectable: false }));
    canvas.add(new fabric.Line([0, 925, 1200, 925], { id: 'borderBottom', stroke: 'black', strokeWidth: 2, selectable: false }));

//canvas.add(new fabric.Line([0, 0, 1200, 0], {  stroke: 'black', selectable: false }));
    canvas.add(new fabric.Line([0, 15, 1200, 15], {  stroke: 'black', strokeWidth: 2, selectable: false }));
//top control line
    canvas.add(new fabric.Line([0, 45, 1200, 45], {  id: 'canvasTop', stroke: 'black', strokeWidth: 2, selectable: false }));
//top canvas line
    canvas.add(new fabric.Line([0, 75, 1200, 75], {  id: 'canvasTop', stroke: 'black', strokeWidth: 2, selectable: false }));
//middle canvas line
    midLine = new fabric.Line([0, 400, 1200, 400], {  id: "midLine", stroke: 'black', strokeWidth: 5, height: 7, intersects: true, selectable: false });
    canvas.add(midLine);
//bottom canvas line
    canvas.add(new fabric.Line([0, 725, 1200, 725], {  id: 'canvasBotton', stroke: 'black', strokeWidth: 2, selectable: false }));

    canvas.add(new fabric.Line([0, 725, 0, 925], {  stroke: 'black', strokeWidth: 2, selectable: false }));
//canvas.add(new fabric.Line([490, 730, 490, 950], {  stroke: 'black', selectable: false }));

//vertical lines
    vLine1 = new fabric.Line([0, 15, 0, 725], {  stroke: 'black', strokeWidth: 2, selectable: false });
    canvas.add(vLine1);
    if (truckid == "1904" || truckid == "1905"){
        vLine2 = new fabric.Line();
        vLine3 = new fabric.Line([240*2, 75, 240*2, 725], {  stroke: 'black', strokeWidth: 2, selectable: false })
        doorText1.set({left: 24});
        doorText2.set({left: 452+48});
        doorText4.set({left: 24});
        doorText5.set({left: 452+48});
    }else {
        vLine2 = new fabric.Line([24*2, 75, 24*2, 725], {  stroke: 'black', strokeWidth: 2, selectable: false });
        vLine3 = new fabric.Line([216*2, 75, 216*2, 725], {  stroke: 'black', strokeWidth: 2, selectable: false });
    }
    canvas.add(vLine2);
    canvas.add(vLine3);
    vLine4 = new fabric.Line([408*2, 75, 408*2, 725], {  stroke: 'black', strokeWidth: 2, selectable: false });
    canvas.add(vLine4);
    vLine5 = new fabric.Line([600*2, 15, 600*2, 725], {  stroke: 'black', strokeWidth: 2, selectable: false });
    canvas.add(vLine5);

//bottom vertical lines
//canvas.add(new fabric.Line([0, 425, 0, 725], {  stroke: 'black', selectable: false }));
//canvas.add(new fabric.Line([24*2, 425, 24*2, 725], {  stroke: 'black', selectable: false }));
//canvas.add(new fabric.Line([216*2, 425, 216*2, 725], {  stroke: 'black', selectable: false }));
//canvas.add(new fabric.Line([408*2, 425, 408*2, 725], {  stroke: 'black', selectable: false }));
    canvas.add(new fabric.Line([600*2, 725, 600*2, 925], {  stroke: 'black', strokeWidth: 2, selectable: false }));


    canvas.forEachObject(function (obj){
        if (obj.unit == true){
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