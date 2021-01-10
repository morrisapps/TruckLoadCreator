/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

var verificationText;
var verificationLines;
var loadText;
var loadTextEdit;
var dropsText;
var dropsTextEdit;
var shipperText;
var shipperTextEdit;
var trailerText;
var trailerTextEdit;
var modeText;
var modeTextEdit;
var driverText;
var driverTextEdit;
var driverSide;
//Barcode variable for truckID
let loadBarcode = new fabric.Image();

/**
 * Generates a barcode image based on current load number to be added into canvas
 */
function createLoadBarcode(){
    canvas.remove(loadBarcode);
    if (loadTextEdit.text == 'Enter load' || loadTextEdit.text == ''){
        JsBarcode("#barcode", null, {height: 0, displayValue: false});
    }else {
        JsBarcode("#barcode", loadTextEdit.text, {height: 28, displayValue: false});
    }
    loadBarcode = new fabric.Image(document.getElementById('barcode'), {
        left: 144,
        top: 55,
        selectable: false,
        originX: 'center',
        originY: 'center',
    });
    //Dynamically scale X coords of loadBarcode to make it fit
    while (loadBarcode.width*loadBarcode.scaleX > 250){
        loadBarcode.set('scaleX',loadBarcode.scaleX - 0.01);
        if (loadBarcode.scaleX <= 0){break;}
     }
    canvas.add(loadBarcode);
    loadBarcode.sendToBack();
    canvas.requestRenderAll();
}

/**
 * Generates fabric.iText objects for text information or edit fields in canvas. Also sets handlers for edit fields.
 */
function textLoad(){
    //remove old texts if they exist
    if (driverSide != null){canvas.remove(driverSide)}
    if (driverText != null){canvas.remove(driverText)}
    if (driverTextEdit != null){canvas.remove(driverTextEdit)}
    if (modeText != null){canvas.remove(modeText)}
    if (modeTextEdit != null){canvas.remove(modeTextEdit)}
    if (trailerText != null){canvas.remove(trailerText)}
    if (trailerTextEdit != null){canvas.remove(trailerTextEdit)}
    if (shipperText != null){canvas.remove(shipperText)}
    if (shipperTextEdit != null){canvas.remove(shipperTextEdit)}
    if (dropsText != null){canvas.remove(dropsText)}
    if (dropsTextEdit != null){canvas.remove(dropsTextEdit)}
    if (loadText != null){canvas.remove(loadText)}
    if (loadTextEdit != null){canvas.remove(loadTextEdit)}
    if (verificationText != null){canvas.remove(verificationText)}
    if (verificationLines != null){canvas.remove(verificationLines)}

    verificationText = new fabric.IText(' Lift Truck Driver(s) verifies no visible damage: ' +
        '\n' +
        '\n' +
        '\n Shunter verifies no visible damage and load is secure:' +
        '\n' +
        '\n' +
        '\n Shipper verifies overall stability of the load & all material accounted for:' +
        '\n' +
        '\n', {
        width: 1000,
        height: 500,
        top: 750,
        left: 780,
        stroke: "black",
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 14,
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    verificationLines = new fabric.IText('      _______________________         _______________________ ' +
        '\n' +
        '\n' +
        '\n      __________________________________' +
        '\n' +
        '\n' +
        '\n      __________________________________' +
        '\n' +
        '\n', {
        width: 1000,
        height: 500,
        top: 775,
        left: 800,
        stroke: "black",
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 14,
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    loadText = new fabric.IText('Load Number:', {
        width: 1000,
        height: 500,
        top: 23,
        left: 25,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    loadTextEdit = new fabric.IText('Enter load', {
        width: 1000,
        height: 500,
        top: 25,
        left: 145,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    shipperText = new fabric.IText('Shipper:', {
        width: 1000,
        height: 500,
        top: 53,
        left: 570,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    shipperTextEdit = new fabric.IText('Enter shipper', {
        width: 1000,
        height: 500,
        top: 55,
        left: 695+5,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    trailerText = new fabric.IText('Trailer Number:', {
        width: 1000,
        height: 500,
        top: 23,
        left: 295,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    trailerTextEdit = new fabric.IText('Enter trailer', {
        width: 1000,
        height: 500,
        top: 25,
        left: 410+5,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    modeText = new fabric.IText('Mode of Delivery:', {
        width: 1000,
        height: 500,
        top: 23,
        left: 570,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    modeTextEdit = new fabric.IText('Enter mode', {
        width: 1000,
        height: 500,
        top: 25,
        left: 695+5,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    dropsText = new fabric.IText('Number of Drops:', {
        width: 1000,
        height: 500,
        top: 23,
        left: 815,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    dropsTextEdit = new fabric.IText('Enter drops', {
        width: 1000,
        height: 500,
        top: 25,
        left: 948,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    driverText = new fabric.IText('Driver:', {
        width: 1000,
        height: 500,
        top: 53,
        left: 295,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    driverTextEdit = new fabric.IText('Enter driver', {
        width: 1000,
        height: 500,
        top: 55,
        left: 410+5,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 15,
        fontStyle: 'italic',
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    driverSide = new fabric.IText('Driver Side', {
        width: 1000,
        height: 500,
        top: 53,
        left: 1000,
        stroke: "black",
        fontWeight: 'bold',
        strokeWidth: 0,
        hasControls: false,
        selectable: false,
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

    loadTextEdit.on('selected', function (options) {
        loadTextEdit.set({fontSize: 16, fontStyle: "normal", top: 23});
        if (loadTextEdit.text == "Enter load"){
            loadTextEdit.text = '';
        }
        loadTextEdit.enterEditing();
    });

    loadTextEdit.on('deselected', function (options) {
        if (loadTextEdit.text == "Enter load" || loadTextEdit.text == ''){
            loadTextEdit.text = "Enter load";
            loadTextEdit.set({fontSize: 15, fontStyle: "italic", top: 25});
        }
        saveToBrowser();
    });

    loadTextEdit.on('changed', function (options) {
        loadTextEdit.set('text', loadTextEdit.text.slice(0, 12));
        createLoadBarcode();
    });

    trailerTextEdit.on('selected', function (options) {
        trailerTextEdit.set({fontSize: 16, fontStyle: "normal", top: 23});
        if (trailerTextEdit.text == "Enter trailer"){
            trailerTextEdit.text = '';
        }
        trailerTextEdit.enterEditing();
    });

    trailerTextEdit.on('deselected', function (options) {
        if (trailerTextEdit.text == "Enter trailer" || trailerTextEdit.text == ''){
            trailerTextEdit.text = "Enter trailer";
            trailerTextEdit.set({fontSize: 15, fontStyle: "italic", top: 25});
        }
        trailerTextEdit.text = trailerTextEdit.text.slice(0, 15);
        saveToBrowser();
    });

    modeTextEdit.on('selected', function (options) {
        modeTextEdit.set({fontSize: 16, fontStyle: "normal", top: 23});
        if (modeTextEdit.text == "Enter mode"){
            modeTextEdit.text = '';
        }
        modeTextEdit.enterEditing();
    });

    modeTextEdit.on('deselected', function (options) {
        if (modeTextEdit.text == "Enter mode" || modeTextEdit.text == ''){
            modeTextEdit.text = "Enter mode";
            modeTextEdit.set({fontSize: 15, fontStyle: "italic", top: 25});
        }
        modeTextEdit.text = modeTextEdit.text.slice(0, 12);
        saveToBrowser();

    });
    dropsTextEdit.on('selected', function (options) {
        dropsTextEdit.set({fontSize: 16, fontStyle: "normal", top: 23});
        if (dropsTextEdit.text == "Enter drops"){
            dropsTextEdit.text = '';
        }
        dropsTextEdit.enterEditing();
    });

    dropsTextEdit.on('deselected', function (options) {
        if (dropsTextEdit.text == "Enter drops" || dropsTextEdit.text == ''){
            dropsTextEdit.text = "Enter drops";
            dropsTextEdit.set({fontSize: 15, fontStyle: "italic", top: 25});
        }
        dropsTextEdit.text = dropsTextEdit.text.slice(0, 12);
        saveToBrowser();
    });

    shipperTextEdit.on('selected', function (options) {
        shipperTextEdit.set({fontSize: 16, fontStyle: "normal", top: 53});
        if (shipperTextEdit.text == "Enter shipper"){
            shipperTextEdit.text = '';
        }
        shipperTextEdit.enterEditing();
    });

    shipperTextEdit.on('deselected', function (options) {
        if (shipperTextEdit.text == "Enter shipper" || shipperTextEdit.text == ''){
            shipperTextEdit.text = "Enter shipper";
            shipperTextEdit.set({fontSize: 15, fontStyle: "italic", top: 55});
        }
        shipperTextEdit.text = shipperTextEdit.text.slice(0, 20);
        saveToBrowser();
    });

    driverTextEdit.on('selected', function (options) {
        driverTextEdit.set({fontSize: 16, fontStyle: "normal", top: 53});
        if (driverTextEdit.text == "Enter driver"){
            driverTextEdit.text = '';
        }
        driverTextEdit.enterEditing();
    });

    driverTextEdit.on('deselected', function (options) {
        if (driverTextEdit.text == "Enter driver" || driverTextEdit.text == ''){
            driverTextEdit.text = "Enter driver";
            driverTextEdit.set({fontSize: 15, fontStyle: "italic", top: 55});
        }
        driverTextEdit.text = driverTextEdit.text.slice(0, 12);
        saveToBrowser();
    });

    //Hover cursor
    driverTextEdit.hoverCursor = 'text';
    modeTextEdit.hoverCursor = 'text';
    trailerTextEdit.hoverCursor = 'text';
    shipperTextEdit.hoverCursor = 'text';
    dropsTextEdit.hoverCursor = 'text';
    loadTextEdit.hoverCursor = 'text';

    canvas.add(driverSide);
    canvas.add(driverText);
    canvas.add(driverTextEdit);
    canvas.add(modeText);
    canvas.add(modeTextEdit);
    canvas.add(trailerText);
    canvas.add(trailerTextEdit);
    canvas.add(shipperText);
    canvas.add(shipperTextEdit);
    canvas.add(dropsText);
    canvas.add(dropsTextEdit);
    canvas.add(loadText);
    canvas.add(loadTextEdit);
    canvas.add(verificationText);
    canvas.add(verificationLines);
}


