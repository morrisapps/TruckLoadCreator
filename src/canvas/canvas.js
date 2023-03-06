/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2023 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

let canvas;
var grid = 12;
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
    canvas.add(fullWeightRegion);
    canvas.add(topLeftWeightText, topMiddleWeightText, topRightWeightText, botLeftWeightText, botMiddleWeightText, botRightWeightText);

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
}

/**
 * Updates height and weight counters with the given target
 * @param target - Object that has height and/or weight in canvas
 */
function updateCount(target) {
    if (target != null) {
        //Update Height
        if (target.unit || target.isRack || target.isDash) {
            //Reset all counters to 0
            topCounters.forEach(function (counter) {
                counter.counter = 0
            })
            botCounters.forEach(function (counter) {
                counter.counter = 0
            })
            //Update all counters utilizing each topLines, botLines and the units that intersect within.
            var i = 0;
            while (i <= 23) {
                lineHeightCount(target, topLines[i]);
                lineHeightCount(target, botLines[i]);
                i++;
            }
        }
        //Update weight count of each region
        weightRegionCount(target, weightRegions);
        weightRegionCount(target, sideRegions);
        //Set all weight texts
        setWeightText();
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
            if (overlapTotal != 0){
                overlapAreas.forEach(function (area) {
                    if (target.remove != true) {
                        regions[area[0]].units.add([target, (area[1] / overlapTotal) * 100])
                    }
                })
            }
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
 * Formats the given textObj with the given weight text by substring if over 10 characters.
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
 * Sets all weight texts, weight colors, and warning overlays based on maximum truck weight and total region weights.
 */
function setWeightText(){
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
        let truckWeight = 0;
        if (_halfWeightToggle.checked == true && truck.getHalfWeight() != "?"){
            truckWeight = truck.getHalfWeight();
            //Set middle total weight text to say Half load
            midGroup.item(2).startText = "Half Load Total:"
        } else {
            truckWeight = truck.getWeight();
            midGroup.item(2).startText = "Total:"
        }
        //Total weight
        midGroup.item(2).weight = (sideRegions[0].weight + sideRegions[1].weight + sideRegions[2].weight + sideRegions[3].weight);
        weightTextFormat(midGroup.item(2), midGroup.item(2).weight.toString())
        if (truckWeight > 0 && truckWeight != "?"){
            if (midGroup.item(2).weight >= truckWeight){midGroup.item(2).set({fill: "red"});  midGroup.item(2).text += " !Overweight!";}
            else if(midGroup.item(2).weight >= truckWeight*.9){midGroup.item(2).set({fill: '#d35400'});}
            else {midGroup.item(2).set({fill: "black"});}
        }
        //Back weight
        midGroup.item(1).weight = sideRegions[0].weight + sideRegions[2].weight
        weightTextFormat(midGroup.item(1), midGroup.item(1).weight.toString())
        if (truck.getBackWeightPercent() > 0 && truckWeight != "?"){
            if (midGroup.item(1).weight >= truck.getBackWeightPercent()*truckWeight){midGroup.item(1).set({fill: "red"});  midGroup.item(1).text += " !Overweight!";}
            else if (midGroup.item(1).weight >= truck.getBackWeightPercent()*truckWeight*.9){midGroup.item(1).set({fill: '#d35400'});}
            else {midGroup.item(1).set({fill: "black"});}
        }
        //Front weight
        midGroup.item(3).weight = sideRegions[1].weight + sideRegions[3].weight
        weightTextFormat(midGroup.item(3), midGroup.item(3).weight.toString())
        if (truck.getFrontWeightPercent() > 0 && truckWeight != "?"){
            if (midGroup.item(3).weight >= truck.getFrontWeightPercent()*truckWeight){midGroup.item(3).set({fill: "red"}); midGroup.item(3).text += " !Overweight!";}
            else if (midGroup.item(3).weight >= truck.getFrontWeightPercent()*truckWeight*.9){midGroup.item(3).set({fill: '#d35400'});}
            else {midGroup.item(3).set({fill: "black"});}
        }
        //Display weight warning overlays
        if (midGroup.item(2).fill == "red"){
            fullWeightRegion.set("opacity", 0.45);
        } else {
            fullWeightRegion.set("opacity", 0);
        }
        if (midGroup.item(2).fill != "red" && midGroup.item(1).fill == "red"){
            topBackWeightRegion.set("opacity", 0.45);
            botBackWeightRegion.set("opacity", 0.45);
        }else {
            topBackWeightRegion.set("opacity", 0);
            botBackWeightRegion.set("opacity", 0);
        }
        if (midGroup.item(2).fill != "red" && midGroup.item(3).fill == "red"){
            topFrontWeightRegion.set("opacity", 0.45);
            botFrontWeightRegion.set("opacity", 0.45);
        }else {
            topFrontWeightRegion.set("opacity", 0);
            botFrontWeightRegion.set("opacity", 0);
        }
    }
}

/**
 * Counts the height of the target intersecting the line with all other units in lineUnits and displays the total height in a counter
 * Displays warnings based on if height exceeds total truck height or height is too great without a belly strap on flatbed or similar trucks.
 * @param target - The object that will have it's height counted
 * @param line - The fabric.Line that the object is intersecting
 */
function lineHeightCount(target, line) {
    if (!line.disabled){
        var counter = 0;
        let dashCounter = 0
        let lineCounter = line.counter
        let lineUnits = line.units
        const strapIndicator = 73
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
            var countFlag = true
            if (lunits.isIntersected){
                lunits.heightCounted = true
            } else {
                lunits.heightCounted = false
            }
            for (lunits2 of lineUnits){
                if (intersects(lunits, lunits2)){
                    if (!(lunits.unitHeight >= lunits2.unitHeight)){
                        countFlag = false
                    }
                }
            }
            if (countFlag && !lunits.heightCounted){
                counter = counter + Math.floor(lunits.unitHeight);
            }


            // Gets the highest dash height within strapIndicator height. Used to determine if strap indicator is shown.
            if (lunits.isDash){
                let dashHeight = getUnitHeightCount(lunits, lineUnits)
                // Highest dash object that is within the strapIndicator height
                if (dashHeight > dashCounter && dashHeight < strapIndicator){
                    dashCounter = dashHeight
                }
            }
        }

        if (lineCounter.counter > counter){
            counter = lineCounter.counter
        } else {
            lineCounter.counter = counter
        }

        lineCounter.text = counter.toString() + '\"';
        if (counter == 0) {
            lineCounter.text = '';
        }

        let counterMessage = ''
        let counterFill = ''

        // Set height indicator of the counter text
        if (truck.getHeight() > 0 && counter > truck.getHeight() && counter <= truck.getHeight()+5){
            counterFill = '#d35400'
        } else if (truck.getHeight() > 0 && counter > truck.getHeight()+5){
            if (counterMessage == '') {counterMessage = ' !Height!'}
            counterFill = 'red'
        } else {
            counterFill = '#4c4c4c'
        }

        // Set straps indicator of counter text
        if (truck.getHeight() > 0 && truck.getType() != 0 && counter >= strapIndicator && (dashCounter == 0 || dashCounter > strapIndicator)){
            if (counterMessage == '') {counterMessage = ' !Straps!'}
            counterFill = 'red'
        }

        lineCounter.fill = counterFill
        lineCounter.text += counterMessage
    }
}

/**
 * Gets the height of the unit from the floor of the truck by counting the height of the units below it.
 * @param obj - The object that will have it's height from the floor counted.
 * @param lineUnits - The array that contains units intersecting the line the be counted from.
 * @returns {int} - The number that represents the total height from the floor of the unit. Includes the unit's own height.
 *                  0 means no height was counted or the obj doesn't exist in lineUnits.
 */
function getUnitHeightCount(obj, lineUnits){
    let counter = 0;
    if (lineUnits.includes(obj)) {
        lineUnits.forEach(function (unit){
            if (obj !== unit){
                if (intersects(obj, unit)){
                    //counter += unit.unitHeight
                } else if (obj.top < midGroup.top){ // Units are in the driver side
                    if ((obj.top + obj.height) < (unit.top + unit.height)){
                        counter += unit.unitHeight
                    }
                } else { // Units are in the passenger side
                    if (obj.top > unit.top){
                        counter += unit.unitHeight
                    }
                }
            }
        });
        counter += obj.unitHeight
    }
    return counter
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
            checkIntersect(currentGroup);
        } else {
            createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, cName, AE, weight, striped);
            addUnit(currentGroup);
        }
    } else {
        if (addError != '') {
            alert(addError);
        }
    }
    if (response == false) {
        addError = addError + " Duplicate unit \n"
    }
    //After potentially adding unit, calls keepObjectsOnTop to make sure objects that should always be visible stay visible.
    keepObjectsOnTop()

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

    //Check for object intersection. If intersected, snap to units that are intersecting.
    canvas.on('object:moving', function (options) {
        let target = options.target;
        let currentLeft = target.left
        let currentTop = target.top

        //Make sure unit stays on canvas
        keepInBounds(target);

        if (target.isComment != true && target !== midGroup) {
            if ( _snapToggle.checked == true){
                //Do intersections with vLines first. This makes the units behave better within each section.
                vLines = [vLine1,vLine2,vLine3,vLine4,vLine5]
                vLines.forEach(vLine => {
                    objectIntersects(vLine, target);
                });
                //Find the intersected unit with the greatest area (the most intersected)
                greatestInter = {area: 0, obj: null}
                canvas.forEachObject(function (obj) {

                    if (obj.intersects == true && !obj.vLine && intersects(target, obj)) {
                        let xa1 = obj.oCoords.tl.x
                        let ya1 = obj.oCoords.tl.y
                        let xa2 = obj.oCoords.tr.x
                        let ya2 = obj.oCoords.bl.y
                        let xb1 = target.oCoords.tl.x
                        let yb1 = target.oCoords.tl.y
                        let xb2 = target.oCoords.tr.x
                        let yb2 = target.oCoords.bl.y

                        let left = Math.max(xa1, xb1)
                        let right = Math.min(xa2, xb2)
                        let top = Math.max(ya1, yb1)
                        let bot = Math.min(ya2, yb2)

                        let area = Math.abs((right-left) * (top-bot))
                        if (area > greatestInter.area){
                            greatestInter.area = Math.abs((right-left) * (top-bot))
                            greatestInter.obj = obj
                        }
                    }
                })
                //Uses the greatest intersected object to initially align the moving unit.
                //This helps avoid wrong movement intersecting with multiple units (E.G. two units along same x-axis)
                if (greatestInter.obj !== null){
                    objectIntersects(greatestInter.obj, target);
                }
                //Checks all objects if they intersect
                canvas.forEachObject(function (obj) {
                    if (obj.intersects == true) {
                        objectIntersects(obj, target);
                        //target.set('opacity', 1);
                    }
                });

                //If target still intersects after processing new coords, then revert back
                target.setCoords();
                let intersectedFlag = false
                canvas.forEachObject(function (obj2) {
                    if (obj2.unit || obj2.isDash || obj2.isRack){
                        if (intersects(obj2, target)){
                            intersectedFlag = true
                        }
                    }
                })
                if (intersectedFlag){
                    target.left = currentLeft
                    target.top = currentTop
                    target.setCoords();
                }

                //Do intersections with keepInBounds and vLines again. This reinforces that units are within vLines.
                keepInBounds(target);
                vLines = [vLine1,vLine2,vLine3,vLine4,vLine5]
                vLines.forEach(vLine => {
                    objectIntersects(vLine, target);
                });

                //Check if object intersects with middle group. Move obj if it does.
                var pointer = canvas.getPointer(event.e);
                if (intersects(midGroup, target) && target.line != true) {
                    if (pointer.y < midGroup.top + midGroup.strokeWidth / 2) {
                        target.set('top', midGroup.top - target.height - 1);
                    } else {
                        target.set('top', midGroup.top + midGroup.height + midGroup.strokeWidth + 1);
                    }
                    target.setCoords();
                }
            }

            checkIntersect(target)

            updateCount(target);
        }
    });


    canvas.on('mouse:up', function (options) {
        if (!options.target.isDash && !options.target.isRegion){
            checkIntersect(options.target)
            options.target.set('opacity', 1)
            if (options.target.isIntersected){
                if (typeof options.target.item(0) !== 'undefined') {
                    options.target.item(0).set('fill', 'rgba(255,0,0,0.2)');
                }
                if (typeof options.target.item(1) !== 'undefined') {
                    options.target.item(1).set('textBackgroundColor', 'rgba(192, 70, 70, 0)');
                }
            }
        }
        updateCount(options.target);
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
 * Determines if target or any other object is intersected.
 * Then change fill to either white (not intersected) or red (intersected).
 * @param target The object that will be checked for intersections.
 */
function checkIntersect(target) {
    if (target !== midGroup && !target.vLine && !target.isRegion ){
        var intersectedObjects = [];
        canvas.forEachObject(function (obj) {
            if (target.intersects && obj.intersects && obj != null && obj !== midGroup && !obj.vLine && !obj.isRegion) {
                if (intersects(obj, target)) {
                    intersectedObjects.push(obj);
                }
            }
            if (obj.isRegion != true){
                //obj.set('opacity', 1);
                if (obj.intersects && obj != null && obj !== midGroup && !obj.vLine && (obj.unit || obj.isRack)){
                    if (obj == target){
                        target.set('opacity', 1)
                    }
                    if (typeof obj.item(0) !== 'undefined') {
                        if (obj.striped) {
                            obj.item(0).set('fill', stripePattern);
                        } else {
                            obj.item(0).set('fill', 'white');
                        }
                    }
                    if (typeof obj.item(0) !== 'undefined') {
                        obj.item(1).set('textBackgroundColor', 'rgba(255,255,255,0.8)');
                    }
                }

                obj.isIntersected = false;
            };
        });
        //check if intersected bundle is above or below
        intersectedObjects.forEach(function (obj) {
            if (obj !== midGroup){
                keepInBounds(obj);
                if (!intersects(obj, target)) {
                    if (obj.isRegion != true){
                        if (obj == target){
                            target.set('opacity', 1)
                        }
                        if (typeof obj.item(0) !== 'undefined') {
                            if (obj.striped) {
                                obj.item(0).set('fill', stripePattern);
                            } else {
                                obj.item(0).set('fill', 'white');
                            }
                        }
                        if (typeof obj.item(0) !== 'undefined') {
                            obj.item(1).set('textBackgroundColor', 'rgba(255,255,255,0.8)');
                        }
                        obj.isIntersected = false;
                    };
                }
            }
        });
    }
    //Checks if any objects still intersect
    canvas.forEachObject(function(obj1){
        if (obj1.intersects && obj1 !== midGroup && !obj1.vLine && !obj1.isRegion){
            canvas.forEachObject(function(obj2){
                if (obj2.intersects && obj2 !== midGroup && !obj2.vLine && !obj2.isRegion && obj1 !== obj2){
                    if (intersects(obj1, obj2)) {
                        if (!obj1.isDash){
                            if (typeof obj1.item(0) !== 'undefined') {
                                if (obj1 == target){
                                    obj1.item(0).set('fill', 'rgba(255,0,0,0.5)');
                                } else {
                                    obj1.item(0).set('fill', 'rgba(255,0,0,0.2)');
                                }
                            }
                            if (typeof obj1.item(1) !== 'undefined') {
                                obj1.item(1).set('textBackgroundColor', 'rgba(192, 70, 70, 0)');
                            }
                        }
                        obj1.isIntersected = true;
                        if (!obj2.isDash){
                            if (typeof obj2.item(0) !== 'undefined') {
                                if (obj2 == target){
                                    obj2.item(0).set('fill', 'rgba(255,0,0,0.5)');
                                } else {
                                    obj2.item(0).set('fill', 'rgba(255,0,0,0.2)');
                                }
                            }
                            if (typeof obj2.item(1) !== 'undefined') {
                                obj2.item(1).set('textBackgroundColor', 'rgba(192, 70, 70, 0)');
                            }
                        }
                        obj2.isIntersected = true;
                    }
                }
            });
        }
    });
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
 * Checks if target object should be moved then moves the target object to snap to the intersected object in canvas.
 * @param obj - The object that is being intersected
 * @param target - The object that will be moved top or bottom based on the intersected object
 */
function objectIntersects(obj, target) {
    if (obj != null && obj != midGroup) {

        //Initial check
        let isHandled = false
        if (intersects(obj, target)) {
            moveObject(obj, target)
            isHandled = true
        }

        //All sides are checked below with plus or negative 2. This removes jittering with units bouncing back too much after intersection.
        let checkSides = [['left', 2], ['left', -2], ['top', 2], ['top', -2]]
        checkSides.forEach(side => {
            if (!isHandled) {
                target[side[0]] += side[1]
                target.setCoords()
                if (intersects(obj, target)) {
                    target[side[0]] -= side[1]
                    target.setCoords()
                    moveObject(obj, target)
                    isHandled = true
                } else {
                    target[side[0]] -= side[1]
                    target.setCoords()
                }
            }
        })
    }

    //Check if object intersects with middle group. Move obj if it does.
    let pointer = canvas.getPointer(event.e);
    if (intersects(midGroup, target) && target.line !== true) {
        if (pointer.y < midGroup.top + (midGroup.height / 2)) {
            target.set('top', midGroup.top - target.height - 1);
        } else {
            target.set('top', midGroup.top + midGroup.height + midGroup.strokeWidth + 1);
        }
    }

    target.setCoords();
}

/**
 * Moves the target object to snap to the intersected object in canvas
 * @param obj - The object that is being intersected
 * @param target - The object that will be moved top or bottom based on the intersected object
 */
function moveObject(obj, target){
    //moveOffset is to reduce units moving between vLines
    let moveOffsetPlus = 1
    let moveOffsetNeg = 1
    //edge is the amount to allow snapping. The greater the number, the more snap it'll try to do.
    let edgeSnap = 30
    //If intersecting with vLine, change moveOffset to reduce unit movement
    if (obj.vLine){
        moveOffsetPlus = 1
        moveOffsetNeg = 0
    } else {
        //Set edgeSnap to minSize is unit's width or height is less than edgeSnap.
        //Helps small units to not overly snap.
        let minSize = Math.min(obj.getScaledWidth(), obj.height, target.getScaledWidth(), target.height) / 2
        if (edgeSnap > minSize / 2 && !obj.isDash && !target.isDash){
            edgeSnap = minSize
        }
    }

    let returned = false

    //Calculations for which side should be used to snap to.
    if (Math.abs(target.oCoords.tr.x - obj.oCoords.tl.x) < edgeSnap) {
        target.left = obj.left - target.getScaledWidth() - moveOffsetNeg
        returned = true
    }
    else if (Math.abs(target.oCoords.tl.x - obj.oCoords.tr.x) < edgeSnap) {
        target.left = obj.left + obj.getScaledWidth() + moveOffsetPlus
        returned = true
    }
    else if (Math.abs(target.oCoords.br.y - obj.oCoords.tr.y) < edgeSnap) {
        target.top = obj.top - target.height - 1
        returned = true
    }
    else if (Math.abs(obj.oCoords.br.y - target.oCoords.tr.y) < edgeSnap) {
        target.top = obj.top + obj.height + 1
        returned = true
    }

    return returned
}

/**
 * Brings various objects in canvas to the top layer in order to keep them visible.
 * Useful after adding new objects to canvas.
 */
function keepObjectsOnTop(){
    //Make sure the separator lines are shown
    vLine1.bringToFront();
    vLine2.bringToFront();
    vLine3.bringToFront();
    vLine4.bringToFront();
    vLine5.bringToFront();

    //Height counters on top of all lines
    topCounters.forEach(function(counter){counter.bringToFront();});
    botCounters.forEach(function(counter){counter.bringToFront();});

    //Make fullWeightRegion on top to act as a overweight warning overlay for total weight
    fullWeightRegion.bringToFront();
    //Bring all side regions on top, they will be used as a overweight warning overlay and need to be on top of the units.
    sideRegions.forEach(function(region){region.bringToFront();});

    //Makes the middle separator shown
    midGroup.bringToFront();
}
