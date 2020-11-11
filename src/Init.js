/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Place all global variables here

//Version number
let version = "0.14";

//TruckID used for loading the appropriate size truck
let truckid = '';

//These variables are used for line counting
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

//Variables representing unit/customer input fields
let _width = document.getElementById('width');
let _height = document.getElementById('height');
let _customer = document.getElementById('name');
let _drop = document.getElementById('drop');
let _tag = document.getElementById('tag');
let _rack = document.getElementById('hasBundle');
let _location = document.getElementById('location');


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

//Reset options to default
_tagBrackets.checked = false;
_snapToggle.checked = true;
_custInUnits.checked = true;


//Creates Change Log dialog
$(function() {
    $("#changeLog").dialog({
        autoOpen: false,
        show: 'fold',
        hide: "blind",
        width: 400,
        height: 500,
    });
});
//Displays Change log
function changeLog(){
    $(function() {
        $( "#changeLog" ).dialog( "open" );
    });
}

//Set version number on bar
document.getElementById("version").innerText = "v"+version.toString();