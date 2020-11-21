/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

let canvas;
var grid = 24;
var rackCanvas;
var mouseDownEvent = false;
var pointerDrag;
var imageOffsetX, imageOffsetY;
var midLine;
var vLine1;
var vLine2;
var vLine3;
var vLine4;
var vLine5;
var doorText1 = new fabric.IText("");
var doorText2 = new fabric.IText("");
var doorText3 = new fabric.IText("");
var doorText4 = new fabric.IText("");
var doorText5 = new fabric.IText("");
var doorText6 = new fabric.IText("");
var door1 = "";
var door2 = "";
var door3 = "";
var door4 = "";
var door5 = "";
var door6 = "";
let topUnits;
let botUnits;

function initializeCounters() {
    topLines = new Array();
    botLines = new Array();
    top72Units = new Array();
    top120Units = new Array();
    top168Units = new Array();
    top216Units = new Array();
    top264Units = new Array();
    top312Units = new Array();
    top360Units = new Array();
    top408Units = new Array();
    top456Units = new Array();
    top504Units = new Array();
    top552Units = new Array();
    top600Units = new Array();
    top648Units = new Array();
    top696Units = new Array();
    top744Units = new Array();
    top792Units = new Array();
    top840Units = new Array();
    top888Units = new Array();
    top936Units = new Array();
    top984Units = new Array();
    top1032Units = new Array();
    top1080Units = new Array();
    top1128Units = new Array();
    top1176Units = new Array();
    bot72Units = new Array();
    bot120Units = new Array();
    bot168Units = new Array();
    bot216Units = new Array();
    bot264Units = new Array();
    bot312Units = new Array();
    bot360Units = new Array();
    bot408Units = new Array();
    bot456Units = new Array();
    bot504Units = new Array();
    bot552Units = new Array();
    bot600Units = new Array();
    bot648Units = new Array();
    bot696Units = new Array();
    bot744Units = new Array();
    bot792Units = new Array();
    bot840Units = new Array();
    bot888Units = new Array();
    bot936Units = new Array();
    bot984Units = new Array();
    bot1032Units = new Array();
    bot1080Units = new Array();
    bot1128Units = new Array();
    bot1176Units = new Array();

    topUnits = [top72Units, top120Units, top168Units, top216Units, top264Units, top312Units, top360Units, top408Units, top456Units,
        top504Units, top552Units, top600Units, top648Units, top696Units, top744Units, top792Units, top840Units, top888Units, top936Units, top984Units,
        top1032Units, top1080Units, top1128Units, top1176Units];
    botUnits = [bot72Units, bot120Units, bot168Units, bot216Units, bot264Units, bot312Units, bot360Units, bot408Units, bot456Units,
        bot504Units, bot552Units, bot600Units, bot648Units, bot696Units, bot744Units, bot792Units, bot840Units, bot888Units, bot936Units, bot984Units,
        bot1032Units, bot1080Units, bot1128Units, bot1176Units];
}

initializeCounters();

function updateHeightCount(target) {
    if (target != null) {
        if (target.unit == true || target.id == "rack") {
            var i = 0;
            while (i <= 11) {
                heightCount(target, topLines[i], topCounters[i], topUnits[i]);
                heightCount(target, botLines[i], botCounters[i], botUnits[i]);
                i++;
            }
        }
    }
}

function heightCount(target, line, lineCounter, lineUnits) {
    var counter = 0;
    if (intersects(target, line) && target.remove != true) {
        if (!lineUnits.includes(target)) {
            lineUnits.push(target);
        }
    } else {
        if (lineUnits.includes(target)) {
            lineUnits.splice(lineUnits.indexOf(target), 1);

        }
    }
    var lunits;
    for (lunits of lineUnits) {
        counter = counter + lunits.unitHeight;
    }
    lineCounter.text = counter.toString();
    if (counter == 0) {
        lineCounter.text = '';
    }
}

//returns true if both objects intersect
function intersects(obj, target) {
    if (obj.intersects == true) {
        if (obj != target) {
            if (obj.intersectsWithObject(target)
                || target.isContainedWithinObject(obj)
                || obj.isContainedWithinObject(target)) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}


function checkIfCustomerDropExists(cName, drop) {
    let getCust = getCustomer(cName);
    let text = '';
    if (getCust != null) {
        if (getCust.drop != drop) {
            text = "Customer " + cName + " already exists at drop " + getCust.drop + "\n";
        }
    }
    return text;
}

function Add(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas) {
    var custName = cName;
    var unitid = custName + AE;
    var addError = "";
    let getDCust = getDropCustomer(unitDrop);
    addError = addError + checkIfCustomerDropExists(cName, unitDrop);
    let dropError = updateDrop(cName);
    if (checkIfUnitIDExists(unitid)) {
        addError = addError + "Unit " + custName + " " + AE + " already exists" + "\n";
    }
    if (getDCust.name != custName && getDCust != 'none') {
        addError = addError + "Drop " + unitDrop + " is already assigned to " + getDCust.name + "\n";
        _drop.value = '';
    }
    if (dropError != '') {
        addError = addError + dropError;
    }
    //Check if tag is possible duplicate
    let duplicateUnit = getTagUnit(_tag.value);
    let response = true;
    if (duplicateUnit != null && duplicateUnit.id != unitid) {
        response = confirm("The tag " + _tag.value + " matches " + duplicateUnit.id + "\n Are you sure you want to add?");
    }
    if (addError == "" && response == true) {
        if (inCanvas) {
            createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, cName, AE);
            canvas.add(currentGroup);
            canvas.setActiveObject(currentGroup);
            addUnit(currentGroup);
            keepInBounds(currentGroup);
        } else {
            createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, cName, AE);
            addUnit(currentGroup);
        }
        midLine.bringToFront();
        vLine1.bringToFront();
        vLine2.bringToFront();
        vLine3.bringToFront();
        vLine4.bringToFront();
        vLine5.bringToFront();
    } else {
        if (addError != '') {
            alert(addError);
        }
    }
    if (response == false) {
        addError = addError + " Duplicate unit \n"
    }
    return addError;
}

function keepInBounds(object) {
    if (object != null) {
        var outBounds = outOfBounds(object);
        if (outBounds[0] == true) {
            object.set({
                left: Math.round(canvas.getWidth() * invertedWidthRatio - object.getScaledWidth() - 21)
            })
        }
        if (outBounds[1] == true) {
            object.set({
                top: Math.round((canvas.getHeight() * invertedWidthRatio - object.height))
            })
        }
        if (outBounds[2] == true) {
            object.set({
                left: 0
            })
        }
        if (outBounds[3] == true) {
            object.set({
                top: 0
            })
        }
        object.setCoords();
    }
}

function outOfBounds(object) {
    var right = false;
    var left = false;
    var top = false;
    var bottom = false;
    //if object is out of bounds return to original placement
    if (object != null) {
        if (Math.round(object.left + object.getScaledWidth()) > canvas.getWidth() * invertedWidthRatio - 21) {
            right = true;
        }
        if (Math.round(object.top + (object.height)) > canvas.getHeight() * invertedWidthRatio) {
            bottom = true;
        }
        if (object.left < 0) {
            left = true;
        }
        if (object.top < 0) {
            top = true;
        }
        return [right, bottom, left, top];
    }
}
//Creation of Canvas
function createCanvas() {
    canvas = new fabric.Canvas('c', {
        selection: false,
        imageSmoothingEnabled: false,
    });
    var canvasWrapper = document.getElementById('printableArea');

    //Fires when tab is pressed on canvas
    canvasWrapper.onkeypress = keyPress;
    function keyPress(key) {
        //Feature to be implemented in the future.
    }
    canvasWrapper.addEventListener("keydown", (event) => {
        //Feature to be implemented in the future.
    }, false);

    // snap to grid
    canvas.on('object:moving', function (options) {
        keepInBounds(options.target);
        if (options.target.isComment != true) {
            if ( _snapToggle.checked == true){
                options.target.set({
                    left: (Math.round(options.target.left / grid) * grid) + 2,
                });
                //Do when Objects collide during drag
                options.target.setCoords();
                var pointer = canvas.getPointer(event.e);
                objectIntersects(midLine, options.target);
                if (intersects(midLine, options.target) && options.target.line != true) {
                    if (pointer.y < midLine.top + midLine.strokeWidth / 2) {
                        options.target.set('top', (midLine.top - 1) - options.target.height);
                    } else {
                        options.target.set('top', (midLine.top + 1) + midLine.strokeWidth);
                    }
                    options.target.setCoords();
                }
                canvas.forEachObject(function (obj) {
                    if (obj.intersects == true) {
                        objectIntersects(obj, options.target);
                        options.target.set('opacity', 1);
                    }
                });
                if (rackCanvas != null) {
                    objectIntersects(rackCanvas, options.target)
                }
            }
            updateHeightCount(options.target);
        }
    });

    canvas.on('mouse:up', function (options) {
        var intersectedObjects = [];
        canvas.forEachObject(function (obj) {
            if (options.target != null) {
                if (intersects(obj, options.target)) {
                    intersectedObjects.push(obj);
                }
            }
            obj.set('opacity', 1);
        });
        //check if intersected bundle is above or below
        intersectedObjects.forEach(function (obj) {
            keepInBounds(obj);
            if (!intersects(obj, options.target)) {
                obj.set('opacity', 1);
            }
        });
    });

    //These fire when any object is selected, needs both
    canvas.on("selection:created", function (obj) {
        selectObject(obj);
    });
    canvas.on("selection:updated", function (obj) {
        selectObject(obj);
    });

    //Fires when no new object is selected after being selected
    canvas.on("selection:cleared", function (obj) {
        deselectObject(obj);
    });
    textLoad();
    rackLoad();
    canvas.hoverCursor = 'default';
}

function setUnitFields(unit) {
    _customer.value = unit.customer.toString();
    _drop.value = unit.drop;
    _height.value = unit.unitHeight;
    _width.value = unit.unitWidth;
    currentCustomerName = unit.customer.toString();
    currentDrop = unit.drop;
}

//Runs when objects are selected
function selectObject(obj) {
    document.getElementById("unitContainer").style.borderColor = "#ccc";
    document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
    let unit;
    if (obj.selected === undefined) {
        unit = obj;
    } else {
        unit = obj.selected[0];
    }
    if (unit.unit == true) {
        if (unitSelected == false) {
            unit.isSelected = true;
            selectCurrentCustomer = _customer.value;
            selectCurrentDrop = _drop.value;
            unitSelected = true;
        }
        setUnitFields(unit);
        setBundleCheck(currentCustomerName);
        listCustomer();
        updateListUnits(unit);
    }
}

//Runs when objects are deselected
function deselectObject(obj) {
    if (!(obj == null || obj.deselected === undefined)) {
        if (cListChoose == false) {
            obj.deselected[0].isSelected = false;
            _tag.value = "";
            _location.value = "";
            _customer.value = selectCurrentCustomer;
            _drop.value = selectCurrentDrop;
            currentCustomerName = selectCurrentCustomer;
            setBundleCheck(currentCustomerName);
            editing = false;
        }
        unitSelected = false;
        listCustomer();
        updateListUnits(obj.deselected[0]);
    }
}

//This function moves the active moving object top or bottom of the intersected object
function objectIntersects(obj, target) {
    if (obj != null) {
        if (intersects(obj, target)) {
            var pointer = canvas.getPointer(event.e);
            if (pointer.y < obj.top + obj.height / 2) {
                target.set('top', (obj.top - 1) - target.height);
            } else {
                target.set('top', (obj.top + 1) + obj.height);
            }
            obj.set('opacity', 0.5);
        } else {
            obj.set('opacity', 1);
        }
        target.setCoords();
    }
}

createCanvas();

$(document).ready(function () {
    _tag.value = "";
    _width.value = 96;
    _height.value = 10;

    window.topCounters = new Array();
    window.botCounters = new Array();

    //Drag and drop stuff
    var canvasContainer = document.getElementById("printableArea");
    canvasContainer.addEventListener('drop', handleDrop, false);

    fabric.Object.prototype.set({borderScaleFactor: 3,});
    fabric.Object.prototype.setControlsVisibility({
        tl: false, //top-left
        mt: false, // middle-top
        tr: false, //top-right
        ml: false, //middle-left
        mr: false, //middle-right
        bl: false, // bottom-left
        mb: false, //middle-bottom
        br: false, //bottom-right
        mtr: true //rotating-point
    });

    truckCustom();
    canvas.requestRenderAll();

    //Checks if previous session was saved, and if not asks to restore.
    loadFromBrowser();
});