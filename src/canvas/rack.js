/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

var rackBox;
var rackText;
var rackCustomers1;
var rackCustomers2;
var rackCustomers3;
var rackCustomers4;

function rackLoad() {
    rackBox = new fabric.Rect({
        width: 740,
        height: 170,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        top: 700,
        left: 20,
        rx: 10,
        ry: 10
    });
    rackText = new fabric.IText(' Rack ', {
        width: 1000,
        height: 500,
        top: 691,
        left: 40,
        stroke: "black",
        strokeWidth: 0,
        hasControls: true,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 16,
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });
    rackCustomers1 = new fabric.IText('', {
        width: 3,
        height: 170,
        stroke: 'black',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        textBackgroundColor: 'white',
        //backgroundColor: "white",
        //charSpacing: -20,
        //splitByGrapheme: true,
        fontSize: 14,
        top: 695,
        left: 30,
        rx: 10,
        ry: 10
    });
    rackCustomers2 = new fabric.IText('', {
        width: 510,
        height: 170,
        stroke: 'black',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        //backgroundColor: "white",
        textBackgroundColor: 'white',
        fontSize: 14,
        top: 695,
        left: 215,
        rx: 10,
        ry: 10
    });
    rackCustomers3 = new fabric.Textbox('', {
        width: 510,
        height: 170,
        stroke: 'black',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        textBackgroundColor: 'white',
        fontSize: 14,
        top: 695,
        left: 400,
        rx: 10,
        ry: 10
    });
    rackCustomers4 = new fabric.Textbox('', {
        width: 510,
        height: 170,
        stroke: 'black',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        textBackgroundColor: 'white',
        fontSize: 14,
        top: 695,
        left: 585,
        rx: 10,
        ry: 10
    });
    window.rack = new fabric.Group([rackBox, rackText, rackCustomers1, rackCustomers2, rackCustomers3, rackCustomers4], {
        top: 734,
        left: 20,
        hasControls: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        id: 'rack'
    });
    canvas.add(rack);
}

