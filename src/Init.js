/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//***********Global variables***********

//Version number
let version = "1.2";

//truck is an instance of Truck class that represents the current truck template
let truck = new Truck("start",105,65000,45000,53,48,48,48,48,48,48,16,16,16,16,16,16,0);

//truck array of all instances of the truck class
let truckList = [];

//TruckID used for loading the appropriate size truck
let truckID = '';

//LoadID is set after importing and forces only this load id to be used.
let loadID = '';

//loading is used to flag if loading a truck is currently in process.
let loading = false;

//Customer variables
var customers = [];
var customerIndex;

//Unit variables
var units = [];
var unitIndex;

//Sidebar variables
var canvasSide = new fabric.Canvas('d', {selection: false, height: 126, width: 251});

//Current unit variables
var currentGroup = 'white';
var currentColor = 'black';
var currentFill;
var currentCustomerName;
var currentDrop;

//Stripe unit background
let stripePattern = 'white';

//These variables are used for height line counting
var topLines;
var botLines;
var top72Units;
var top120Units;
var top168Units;
var top216Units;
var top264Units;
var top312Units;
var top360Units;
var top408Units;
var top456Units;
var top504Units;
var top552Units;
var top600Units;
var top648Units;
var top696Units;
var top744Units;
var top792Units;
var top840Units;
var top888Units;
var top936Units;
var top984Units;
var top1032Units;
var top1080Units;
var top1128Units;
var top1176Units;
var bot72Units;
var bot120Units;
var bot168Units;
var bot216Units;
var bot264Units;
var bot312Units;
var bot360Units;
var bot408Units;
var bot456Units;
var bot504Units;
var bot552Units;
var bot600Units;
var bot648Units;
var bot696Units;
var bot744Units;
var bot792Units;
var bot840Units;
var bot888Units;
var bot936Units;
var bot984Units;
var bot1032Units;
var bot1080Units;
var bot1128Units;
var bot1176Units;

//Variables used for counting weight
//Weight Region
let topBackWeightRegion = new fabric.Rect({
    left: 300,
    top: 239,
    width: 600,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    isSide: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let topFrontWeightRegion = new fabric.Rect({
    left: 902,
    top: 239,
    width: 600,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    isSide: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let botBackWeightRegion = new fabric.Rect({
    left: 300,
    top: 566,
    width: 600,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    isSide: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let botFrontWeightRegion = new fabric.Rect({
    left: 902,
    top: 566,
    width: 600,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    isSide: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let sideRegions = [topBackWeightRegion, topFrontWeightRegion, botBackWeightRegion, botFrontWeightRegion]

let topLeftWeightRegion = new fabric.Rect({
    left: 218,
    top: 239,
    width: 216 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let topMiddleWeightRegion = new fabric.Rect({
    left: 625,
    top: 239,
    width: 192 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let topRightWeightRegion = new fabric.Rect({
    left: 1009,
    top: 239,
    width: 192 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let botLeftWeightRegion = new fabric.Rect({
    left: 218,
    top: 566,
    width: 216 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let botMiddleWeightRegion = new fabric.Rect({
    left: 625,
    top: 566,
    width: 192 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let botRightWeightRegion = new fabric.Rect({
    left: 1009,
    top: 566,
    width: 192 * 2,
    height: 162 * 2,
    fill: "grey",
    stroke: 'green',
    strokeWidth: 2,
    originX: 'center',
    originY: 'center',
    selectable: false,
    isRegion: true,
    opacity: 0,
    weight: 0,
    units: new Set()
});
let weightRegions = [topLeftWeightRegion, topMiddleWeightRegion, topRightWeightRegion, botLeftWeightRegion, botMiddleWeightRegion, botRightWeightRegion];

//Weight text
let topLeftWeightText = new fabric.IText('', {
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
});
let topMiddleWeightText = new fabric.IText('', {
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
});
let topRightWeightText = new fabric.IText('', {
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
});
let botLeftWeightText = new fabric.IText('', {
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
});
let botMiddleWeightText = new fabric.IText('', {
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
});
let botRightWeightText = new fabric.IText('', {
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
});
let weightTexts = [topLeftWeightText, topMiddleWeightText, topRightWeightText, botLeftWeightText, botMiddleWeightText, botRightWeightText];

//Total Weight and maximum of truck
let weightCount = 0;
let _tWeight = document.getElementById('tWeight');
let _mWeight = document.getElementById('mWeight');
let _hWeight = document.getElementById('hWeight');

//Variables representing unit/customer input fields
let _width = document.getElementById('width');
let _height = document.getElementById('height');
let _customer = document.getElementById('name');
let _drop = document.getElementById('drop');
let _tag = document.getElementById('tag');
let _rack = document.getElementById('hasBundle');
let _location = document.getElementById('location');
let _weight = document.getElementById('weight');
let _striped = document.getElementById('isStriped');

//Side bar unit preview
let _sideUnit = document.getElementById('sideUnit');

//These variables are used for selecting objects and deselecting
let selectCurrentCustomer = '';
let selectCurrentDrop = '';
//if editing mode is active
let editing = false;
let unitSelected = false;


//Confirmation close window dialog
window.onbeforeunload = function() {
    return false;
};

//Used for the unit being edited
let editingUnit;

//Option variables
let _tagBrackets = document.getElementById('unitBrackets');
let _snapToggle = document.getElementById('snapToggle');
let _custInUnits = document.getElementById('custInUnits');
let _locToggle = document.getElementById('locToggle');

//Reset options to default
_tagBrackets.checked = false;
_snapToggle.checked = true;
_custInUnits.checked = true;

//Data that is returned from DB
let _returnedData = null;
let _errorDB = '';

//GET location and backtrack variables
let URLlocation = new URL(window.location.href).searchParams.get("location");
let URLbacktrack = new URL(window.location.href).searchParams.get("backtrack");
let _backtrack = document.getElementById('backtrack');
let backtrackToggle;
//Set previous or go back to current version link
if (URLbacktrack == '1'){
    backtrackToggle = "0";
    _backtrack.innerText = "Back to current version";
    _backtrack.href = "http://am-ax2012-web1:88/?location="+URLlocation+"&backtrack="+backtrackToggle
}else{
    _backtrack.innerText = "Previous version";
    backtrackToggle = "1"
    _backtrack.href = "http://am-ax2012-web1:86/?location="+URLlocation+"&backtrack="+backtrackToggle
}

/**
 * Creates change log dialog
 */
$(function() {
    $("#changeLog").dialog({
        autoOpen: false,
        show: 'fold',
        hide: "blind",
        width: 400,
        height: 500,
    });
});

/**
 * Displays change log
 */
function changeLog(){
    $(function() {
        $( "#changeLog" ).dialog( "open" );
    });
}

//Set version number on bar
document.getElementById("version").innerText = "v"+version.toString();