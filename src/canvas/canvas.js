/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

let canvas;
var grid = 24;
var rackCanvas;
var midGroup;
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

//Initialization
initializeCounters();
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

    createCounters();

    //Add weight regions and text
    weightRegions.forEach(function (region){canvas.add(region);});
    sideRegions.forEach(function (region){canvas.add(region);});
    canvas.add(topLeftWeightText,topRightWeightText,botLeftWeightText,botRightWeightText);

    canvas.requestRenderAll();

    //Stripe background image
    fabric.Image.fromURL('./src/resources/img/stripe.png', function(img) {
        img.scaleToHeight(151.5); // Fix stripes not repeating seamlessly
        var patternSourceCanvas = new fabric.StaticCanvas();
        patternSourceCanvas.add(img);
        patternSourceCanvas.renderAll();

        stripePattern = new fabric.Pattern({
            source: patternSourceCanvas.getElement(),
            repeat: 'repeat'
        })
        //If not load from save
        if (!loadFromBrowser()){
            truckLoad('start');
            timeText.text = new Date().toDateString().slice(4);
        }
        truckListUpdate(URLlocation);
    });
});

/**
 * Initializes height counters
 */
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

/**
 * Updates height and weight counters with the given target
 * @param target - Object that has height and/or weight in canvas
 */
function updateCount(target) {
    if (target != null) {

        //Update Height
        if (target.unit || target.isRack) {
            var i = 0;
            while (i <= 11) {
                heightCount(target, topLines[i], topCounters[i], topUnits[i]);
                heightCount(target, botLines[i], botCounters[i], botUnits[i]);
                i++;
            }
        }
        weightRegionCount(target, weightRegions);
        weightRegionCount(target, sideRegions);

        //Set weight texts
        for (let i = 0; i < weightRegions.length; i++) {
            if (weightRegions[i].weight > 0){
                weightTexts[i].text = weightRegions[i].weight.toString() + ' lb';
            }else {
                weightTexts[i].text = '';
            }
        };
        //Set Back, Front, and Total weight in canvas
        if (midGroup !== undefined){
            //Total weight
            midGroup.item(2).weight = (sideRegions[0].weight + sideRegions[1].weight + sideRegions[2].weight + sideRegions[3].weight);
            weightTextFormat(midGroup.item(2), midGroup.item(2).weight.toString())
            if (truck.getWeight() > 0 && truck.getWeight() != "?"){
                if (midGroup.item(2).weight >= truck.getWeight()){midGroup.item(2).set({fill: "red"});  midGroup.item(2).text += " !Overweight!";}
                else if(midGroup.item(2).weight >= truck.getWeight()*.9){midGroup.item(2).set({fill: '#d35400'});}
                else {midGroup.item(2).set({fill: "black"});}
            }
            //Back weight
            midGroup.item(1).weight = sideRegions[0].weight + sideRegions[2].weight
            weightTextFormat(midGroup.item(1), midGroup.item(1).weight.toString())
            if (truck.getBackWeightPercent() > 0 && truck.getWeight() != "?"){
                if (midGroup.item(1).weight >= truck.getBackWeightPercent()*truck.getWeight()){midGroup.item(1).set({fill: "red"});  midGroup.item(1).text += " !Overweight!";}
                else if (midGroup.item(1).weight >= truck.getBackWeightPercent()*truck.getWeight()*.9){midGroup.item(1).set({fill: '#d35400'});}
                else {midGroup.item(1).set({fill: "black"});}
            }
            //Front weight
            midGroup.item(3).weight = sideRegions[1].weight + sideRegions[3].weight
            weightTextFormat(midGroup.item(3), midGroup.item(3).weight.toString())
            if (truck.getFrontWeightPercent() > 0 && truck.getWeight() != "?"){
                if (midGroup.item(3).weight >= truck.getFrontWeightPercent()*truck.getWeight()){midGroup.item(3).set({fill: "red"}); midGroup.item(3).text += " !Overweight!";}
                else if (midGroup.item(3).weight >= truck.getFrontWeightPercent()*truck.getWeight()*.9){midGroup.item(3).set({fill: '#d35400'});}
                else {midGroup.item(3).set({fill: "black"});}
            }
        }
    }
}

/**
 * Checks if target intersects with regions and then calculates total weight of each region.
 * @param target The object in canvas that is to be checked if it intersects with any regions.
 * @param regions The regions array that contains each region that will be checked if they intersect with the target. Then totals weight in the region.
 */
function weightRegionCount(target,regions){
    //Update weight regions
    if (target.weight > 0) {
        //intersectedIndex is used to count the # of intersections.
        let intersectedIndex = []
        //Checks if weight Regions intersect object
        for (let i = 0; i < regions.length; i++) {
            //Removes object if already added to ensure duplication doesn't occur
            for (const unit of regions[i].units) {
                if (unit[0].id === target.id) {
                    regions[i].units.delete(unit);
                }
            }
            //Checks if unit intersects with a region. Adds index to be used later.
            if (intersects(target,regions[i])) {
                intersectedIndex.push(i);
            }
        }
        if (intersectedIndex.length == 1) {
            //if only one intersection, then 100% of weight should still be in this region.
            if (target.remove != true) {
                regions[intersectedIndex[0]].units.add([target, 100])
            }
        } else {
            let overlapAreas = []
            let overlapTotal = 0
            //Loops through all intersected regions
            //Splits weight to each intersected region based on how much of the target unit is in each region
            intersectedIndex.forEach(function (i) {
                let d1x = regions[i].left - regions[i].width / 2
                let d1y = regions[i].top - regions[i].height / 2
                let d1xMax = d1x + regions[i].width
                let d1yMax = d1y + regions[i].height
                let d2x = target.left
                let d2y = target.top
                let d2xMax = target.left + target.width
                let d2yMax = target.top + target.height

                let x_overlap = Math.max(0, Math.min(d1xMax, d2xMax) - Math.max(d1x, d2x))
                let y_overlap = Math.max(0, Math.min(d1yMax, d2yMax) - Math.max(d1y, d2y));

                overlapAreas.push([i, x_overlap * y_overlap])
                overlapTotal += x_overlap * y_overlap
            })
            //Iterates over each overlap area against total overlap
            //This ensures the total percent of the weight distribution is 100%
            overlapAreas.forEach(function (area) {
                if (target.remove != true) {
                    regions[area[0]].units.add([target, (area[1] / overlapTotal) * 100])
                }
            })
        }
        //Updates all weight region texts with all the updated weightUnits array
        //Also updates total weight in canvas
        //This Loops through each weightRegion again to ensure weight counting will be accurate after intersection
        let roundHalf = false;
        for (let i = 0; i < regions.length; i++) {
            let weight = 0;
            //Adds each Unit's weight for each index
            regions[i].units.forEach(function (unit) {
                let unitRegionWeight = unit[0].weight * (unit[1] / 100)
                //Checks if unitRegionWeight decimal is .5
                //This makes it so a remainder of .5 won't be rounded up twice. If .5 twice then simply minus 1 from second round
                if (unitRegionWeight % 1 == 0.5) {
                    if (roundHalf == false) {
                        roundHalf = true
                    } else {
                        unitRegionWeight = unitRegionWeight - 1
                        roundHalf = false
                    }
                }
                weight = weight + Math.round(unitRegionWeight);
            });
            regions[i].weight = weight;
        }
    }
}

/**
 * Formats the given textObj with the given weight text by substring if over 10 characters
 * @param textObj Text object from middle separator in canvas
 * @param text The text that will be formatted with substring
 */
function weightTextFormat(textObj, text){
    let formattedText = text
    if (text.length > 10){
        formattedText = text.substring(0, 10) + "..."
    }
    textObj.set({text: textObj.startText + formattedText + " lb"});
}

/**
 * Counts the height of the target intersecting the line with all other units in lineUnits and displays the total height in a counter
 * @param target - The object that will have it's height counted
 * @param line - The fabric.Line that the object is intersecting
 * @param lineCounter - The fabric.Itext that is associated with line
 * @param lineUnits - The array that contains units intersecting line
 */
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
        counter = counter + Math.floor(lunits.unitHeight);
    }
    lineCounter.text = counter.toString() + '\"';
    if (counter == 0) {
        lineCounter.text = '';
    }
    if (truck.getHeight() > 0 && counter > truck.getHeight() && counter <= truck.getHeight()+5){
        lineCounter.set({fill: '#d35400'});
    } else if (truck.getHeight() > 0 && counter > truck.getHeight()+5){
        lineCounter.set({fill: 'red'});
    } else {
        lineCounter.set({fill: '#4c4c4c'});
    }
}


/**
 * Determines if the given objects intersect with each other
 * @param obj - The first object to test
 * @param target - The second object to test
 * @returns {boolean} - True if both objects intersect, false if not
 */
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

/**
 * Checks the given customer and the given drop if they exist
 * @param cName - The customer to check
 * @param drop - The customer drop to check
 * @returns {string} text - An error message is returned if exists, else returned blank
 */
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

/**
 * Creates and adds a unit to the canvas
 * @param width - The width of the unit
 * @param height - The height of the unit
 * @param cName - The customer name of the unit
 * @param AE - The tag of the unit
 * @param color - The border color of the unit
 * @param fill - The background color of the unit
 * @param left - The left (X) position of the unit
 * @param top - The top (Y) position of the unit
 * @param unitDrop - The customer's drop of the unit
 * @param location - The physical location of the unit
 * @param {boolean} inCanvas - Set true if unit is in canvas
 * @param weight - The weight of the unit
 * @param {boolean} check - True to check if customer exists, false to not check
 * @param {boolean} striped - Flag to signal if unit background is striped in unit
 * @returns {string} addError - The error message if the add does not succeed, blank if succeeded
 */
function Add(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, weight, check, striped) {
    var custName = cName;
    var unitid = custName + AE;
    var addError = "";
    let getDCust = getDropCustomer(unitDrop);
    addError = addError + checkIfCustomerDropExists(cName, unitDrop);
    let dropError = '';
    let duplicateUnit = getTagUnit(_tag.value);

    if (check){
        dropError = updateDrop(cName);
    }
    if (checkIfUnitIDExists(unitid)) {
        let existsResponse = confirm("Unit " + custName + " " + AE + " already exists. Do you still want to add?");
        if (existsResponse){
           duplicateUnit = null;
        }else {
            addError = addError + "Unit " + custName + " " + AE + " already exists" + "\n";
        }
    }
    if (check && getDCust.name != custName && getDCust != 'none') {
        addError = addError + "Drop " + unitDrop + " is already assigned to " + getDCust.name + "\n";
        _drop.value = '';
    }
    if (Math.sign(_weight.value) == -1){
        addError = addError + 'Weight cannot be a negative number';
        _weight.value = '';
    }
    if (dropError != '') {
        addError = addError + dropError;
    }
    //Check if tag is possible duplicate
    let response = true;
    if (duplicateUnit != null && duplicateUnit.id != unitid) {
        response = confirm("The tag " + _tag.value + " matches " + duplicateUnit.id + "\n Are you sure you want to add?");
    }
    if (addError == "" && response == true) {
        if (inCanvas) {
            createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, cName, AE, weight, striped);
            canvas.add(currentGroup);
            canvas.setActiveObject(currentGroup);
            addUnit(currentGroup);
            keepInBounds(currentGroup);
        } else {
            createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, cName, AE, weight, striped);
            addUnit(currentGroup);
        }
        vLine1.bringToFront();
        vLine2.bringToFront();
        vLine3.bringToFront();
        vLine4.bringToFront();
        vLine5.bringToFront();
        midGroup.bringToFront();
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

/**
 * Keep the dragging object within the bounds of the canvas
 * @param object - The object to be contained within the canvas
 */
function keepInBounds(object) {
    if (object != null) {
        var outBounds = outOfBounds(object);
        if (outBounds[0] == true) {
            object.set({
                left: Math.round(canvas.getWidth() * invertedWidthRatio - (object.getScaledWidth() + 24))
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

/**
 * Determines if any of the object's four sides are out of bounds
 * @param object - The object to be tested
 * @returns {boolean[]} - A boolean array of the four sides (right, left, top, bottom). Booleans are set to true if they are outside of bounds
 */
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

/**
 * Creation of fabric canvas.
 * Sets up canvas related object handlers.
 */
function createCanvas() {
    canvas = new fabric.Canvas('c', {
        selection: false,
        imageSmoothingEnabled: false,
        backgroundColor: "white"
    });

    // snap to grid & check for object intersection. If intersected, snap off of unit
    canvas.on('object:moving', function (options) {
        let target = options.target;
        keepInBounds(target);
        if (target.isComment != true && target !== midGroup) {
            if ( _snapToggle.checked == true){
                //Snap to horizontal grid
                target.set({left: (Math.round(target.left / grid) * grid) + 2});
                //Do when Objects collide during drag
                target.setCoords();
                var pointer = canvas.getPointer(event.e);
                //Checks all objects if they intersect
                canvas.forEachObject(function (obj) {
                    if (obj.intersects == true) {
                        objectIntersects(obj, target);
                        //target.set('opacity', 1);
                        if (obj.opacity == 1){
                            //Checks if any objs are still intersected
                            canvas.forEachObject(function (obj2) {
                                if (obj2.intersects && !obj.isDash && !obj2.isDash && obj2 !== midGroup && obj !== obj2){
                                    if (intersects(obj, obj2)) {
                                        obj.set('opacity', .5);
                                        obj.isIntersected = true;
                                        obj2.set('opacity', .5);
                                        obj2.isIntersected = true;
                                    }
                                }
                            });
                        }
                    }
                });
                //Check if object intersects with middle group. Move obj if it does.
                if (intersects(midGroup, target) && target.line != true) {
                    if (pointer.y < midGroup.top + midGroup.strokeWidth / 2) {
                        target.set('top', midGroup.top - target.height - 1);
                    } else {
                        target.set('top', midGroup.top + midGroup.height + midGroup.strokeWidth + 1);
                    }
                    target.setCoords();
                }
            }
            updateCount(target);
        }
    });
    canvas.on('mouse:up', function (options) {
        if (options.target !== midGroup){
            var intersectedObjects = [];
            canvas.forEachObject(function (obj) {
                if (options.target != null) {
                    if (intersects(obj, options.target)) {
                        intersectedObjects.push(obj);
                    }
                }
                if (obj.isRegion != true){obj.set('opacity', 1);obj.isIntersected = false;};
            });
            //check if intersected bundle is above or below
            intersectedObjects.forEach(function (obj) {
                if (obj !== midGroup){
                    keepInBounds(obj);
                    if (!intersects(obj, options.target)) {
                        if (obj.isRegion != true){obj.set('opacity', 1);obj.isIntersected = false;};
                    }
                }
            });
        }
        //Checks if any objects still intersect
        canvas.forEachObject(function(obj1){
           if (obj1.intersects && obj1 !== midGroup){
                canvas.forEachObject(function(obj2){
                   if (obj2.intersects && !obj1.isDash && !obj2.isDash && obj2 !== midGroup && obj1 !== obj2){
                       if (intersects(obj1, obj2)) {
                           obj1.set('opacity', .5);
                           obj1.isIntersected = true;
                           obj2.set('opacity', .5);
                           obj2.isIntersected = true;
                       }
                   }
               });
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

    //Fires when object has been added
    canvas.on("object:added", function (obj) {
        truckWeightUpdate();
    });
    //Fires when object has been removed
    canvas.on("object:removed", function (obj) {
        truckWeightUpdate();
    });

    textLoad();
    rackLoad();
    canvas.hoverCursor = 'default';
}

/**
 * Sets side bar fields with information from given unit
 * @param unit - The unit which will contain the information for related side bar fields
 */
function setUnitFields(unit) {
    _customer.value = unit.customerText.toString();
    _drop.value = unit.drop;
    _height.value = unit.unitHeight;
    _width.value = unit.unitWidth;
    _weight.value = unit.weight;
    currentCustomerName = unit.customer.toString();
    currentDrop = unit.drop;
    _striped.checked = unit.striped;
}

/**
 * Triggered when objects in canvas is selected.
 * Determines if unit and if so then sets the appropriate unit fields/variables
 * @param obj - The object that is selected on canvas
 */
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

/**
 * Triggered when objects are deselected
 * Removes/defaults sidebar fields
 * @param obj - The object that is deselected
 */
function deselectObject(obj) {
    if (!(obj == null || obj.deselected === undefined)) {
        if (cListChoose == false) {
            obj.deselected[0].isSelected = false;
            _tag.value = "";
            _location.value = "";
            _weight.value = "";
            _customer.value = selectCurrentCustomer;
            _drop.value = selectCurrentDrop;
            currentCustomerName = selectCurrentCustomer;
            setBundleCheck(currentCustomerName);
            editing = false;
            _striped.checked = false;
        }
        unitSelected = false;
        listCustomer();
        updateListUnits(obj.deselected[0]);
    }
}

/**
 * Moves the target object top or bottom of the intersected object in canvas
 * @param obj - The object that is being intersected
 * @param target - The object that will be moved top or bottom based on the intersected object
 */
function objectIntersects(obj, target) {
    if (obj != null) {
        if (intersects(obj, target)) {
            var pointer = canvas.getPointer(event.e);
            if (pointer.y < obj.top + obj.height / 2) {
                target.set('top', (obj.top - 1) - target.height);
            } else {
                target.set('top', (obj.top + 1) + obj.height);
            }
            if (obj !== midGroup){
                obj.set('opacity', 0.5);
            }
        } else {
            obj.set('opacity', 1);
            obj.isIntersected = false;
        }
        target.setCoords();
    }
}

