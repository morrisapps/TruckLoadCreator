/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Adding side unit preview on first launch
AddSide(+_width.value, +_height.value, _customer.value, _tag.value, currentColor, currentFill, _drop.value, _location.value);
_sideUnit.src = currentGroup.toDataURL();
_sideUnit.height = +_height.value;
_sideUnit.width = +_width.value;

/**
 * Shortens the text given utilizing slice(start, end)
 * @param text - The text to be cut
 * @param start - The index to start the cut
 * @param end - The index to stop the cut
 * @returns {string} text - The text is returned as either cut or full
 */
function cutText(text, start, end) {
    if (text.length <= end) {
        return text;
    } else {
        return text.slice(start, end);
    }
}

/**
 * Called when input fields are clicked and de-selects the active unit
 */
//Called when input fields are clicked
function inputFieldsSelected(){
    if (editing != true) {
        //Gather current relevant field values
        let tempCust = _customer.value;
        let tempDrop = _drop.value;
        let tempRack = _rack.value;
        canvas.discardActiveObject().requestRenderAll();
        //Restore field values
        _customer.value = tempCust;
        _drop.value = tempDrop;
        _rack.value = tempRack;
    }
}

/**
 * Called from options toggling, updates units and saves to browser
 */
function optionsUpdate() {
    updateUnits(units);
    canvas.requestRenderAll();
    saveToBrowser();
}

/**
 * Formats the text displayed in the unit
 * @param cName - The customer name
 * @param width - The width of the unit
 * @param height - The height of the unit
 * @param unitDrop - The drop number of the customer of the unit
 * @param AE - The tag of the unit
 * @param text - The fabric.Itext object of the unit
 * @param rect - The fabric.Rect object of the unit
 * @param loc - The physical location of the unit
 */
function unitText(cName, width, height, unitDrop, AE, text, rect, loc) {

    if (_custInUnits.checked != true){
        cName = '';
    }

    let custName = cName;
    let textAE = AE;
    let rectWidth = rect.width;
    if (_tagBrackets.checked == true) {
        textAE = "(" + AE + ")";
    }

    let location = '';
    if (loc.length > 0) {
        location = '-' + loc;
    }

    //Rotate text if height is greater than width
    if (rect.height - 2 > rect.width) {
        text.set('rotated', true);
        rectWidth = rect.height;
        text.rotate(90);
    } else {
        rectWidth = rect.width;
        text.rotate(0);
    }

    text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + textAE + " " + location);
    while (text.width + 8 > rectWidth || custName == '') {
        custName = cutText(custName, 0, custName.length - 1);
        text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + textAE + " " + location);
        if (custName.length <= 2) {
            custName = '';
            text.set('text', ' (' + unitDrop + ') ' + height + "\" " + textAE + " " + location);
            break;
        }
    }

    //Set location to bottom if text is still too large
    if (location.length > 0) {
        if (text.width + 8 > rectWidth) {
            custName = cName;
            text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + textAE + "\n" + loc);
            while (text.width + 8 > rectWidth || custName == '') {
                custName = cutText(custName, 0, custName.length - 1);
                text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + textAE + "\n" + loc);
                if (custName.length <= 2) {
                    custName = '';
                    text.set('text', ' (' + unitDrop + ') ' + height + "\" " + textAE + "\n" + loc);
                    break;
                }
            }
            text.set('locationUnder', true);
        }
    } else {
        text.set('locationUnder', false);
    }
    //Set tag to bottom if text is still too large
    if (text.width + 8 > rectWidth) {
        custName = cName;
        text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + "\n" + textAE + "\n" + loc);
        while (text.width + 8 > rectWidth || custName == '') {
            custName = cutText(custName, 0, custName.length - 1);
            text.set('text', ' (' + unitDrop + ') ' + custName + " " + height + "\" " + "\n" + textAE + "\n" + loc);
            if (custName.length <= 2) {
                custName = '';
                text.set('text', ' (' + unitDrop + ') ' + height + "\" " + "\n" + textAE + "\n" + loc);
                break;
            }
        }
        text.set('tagUnder', true);
    } else {
        text.set('tagUnder', false);
    }

    //Styles need to be initialized before looping through
    text.set("styles", {
        0: {
            0: {fontSize: 15},
            1: {fontSize: 15},
            2: {fontSize: 15},
            3: {fontSize: 15},
            4: {fontSize: 15},
            5: {fontSize: 15},
            6: {fontSize: 15},
            7: {fontSize: 15},
            8: {fontSize: 15},
            9: {fontSize: 15},
            10: {fontSize: 15},
            11: {fontSize: 15},
            12: {fontSize: 15},
            13: {fontSize: 15},
            14: {fontSize: 15},
            15: {fontSize: 15},
            16: {fontSize: 15},
            17: {fontSize: 15},
            18: {fontSize: 15},
            19: {fontSize: 15},
            20: {fontSize: 15},
            21: {fontSize: 15},
            22: {fontSize: 15},
            23: {fontSize: 15},
            24: {fontSize: 15},
            25: {fontSize: 15},
            26: {fontSize: 15},
            27: {fontSize: 15},
            28: {fontSize: 15},
            29: {fontSize: 15},
            30: {fontSize: 15},
            31: {fontSize: 15},
            32: {fontSize: 15},
            33: {fontSize: 15},
            34: {fontSize: 15},
            35: {fontSize: 15},
            36: {fontSize: 15},
            37: {fontSize: 15},
            38: {fontSize: 15},
            39: {fontSize: 15},
            40: {fontSize: 15},
            41: {fontSize: 15},
            42: {fontSize: 15},
            43: {fontSize: 15},
            44: {fontSize: 15},
            45: {fontSize: 15},
            46: {fontSize: 15},
            47: {fontSize: 15},
            48: {fontSize: 15},
            49: {fontSize: 15},
            50: {fontSize: 15},
            51: {fontSize: 15},
            52: {fontSize: 15},
            53: {fontSize: 15},
            54: {fontSize: 15},
            55: {fontSize: 15},
            56: {fontSize: 15},
            57: {fontSize: 15},
            58: {fontSize: 15},
            59: {fontSize: 15},
            60: {fontSize: 15},
            61: {fontSize: 15},
            62: {fontSize: 15},
            63: {fontSize: 15},
            64: {fontSize: 15},
            65: {fontSize: 15},
            66: {fontSize: 15},
            67: {fontSize: 15},
            68: {fontSize: 15},
            69: {fontSize: 15},
            70: {fontSize: 15},
            71: {fontSize: 15},
            72: {fontSize: 15},
            73: {fontSize: 15},
            74: {fontSize: 15},
            75: {fontSize: 15},
            76: {fontSize: 15},
            77: {fontSize: 15},
            78: {fontSize: 15},
            79: {fontSize: 15},
            80: {fontSize: 15},
            81: {fontSize: 15},
            82: {fontSize: 15},
            83: {fontSize: 15},
            84: {fontSize: 15},
            85: {fontSize: 15},
            86: {fontSize: 15},
            87: {fontSize: 15},
            88: {fontSize: 15},
            89: {fontSize: 15},
            90: {fontSize: 15},
            91: {fontSize: 15},
            92: {fontSize: 15},
            93: {fontSize: 15},
            94: {fontSize: 15},
            95: {fontSize: 15},
            96: {fontSize: 15},
            97: {fontSize: 15},
            98: {fontSize: 15},
            99: {fontSize: 15},
        },
        1: {
            0: {fontSize: 15},
            1: {fontSize: 15},
            2: {fontSize: 15},
            3: {fontSize: 15},
            4: {fontSize: 15},
            5: {fontSize: 15},
            6: {fontSize: 15},
            7: {fontSize: 15},
            8: {fontSize: 15},
            9: {fontSize: 15},
            10: {fontSize: 15},
            11: {fontSize: 15},
            12: {fontSize: 15},
            13: {fontSize: 15},
            14: {fontSize: 15},
            15: {fontSize: 15},
            16: {fontSize: 15},
            17: {fontSize: 15},
            18: {fontSize: 15},
            19: {fontSize: 15},
            20: {fontSize: 15},
            21: {fontSize: 15},
            22: {fontSize: 15},
            23: {fontSize: 15},
            24: {fontSize: 15},
            25: {fontSize: 15},
            26: {fontSize: 15},
            27: {fontSize: 15},
            28: {fontSize: 15},
            29: {fontSize: 15},
            30: {fontSize: 15},
            31: {fontSize: 15},
            32: {fontSize: 15},
            33: {fontSize: 15},
            34: {fontSize: 15},
            35: {fontSize: 15},
            36: {fontSize: 15},
            37: {fontSize: 15},
            38: {fontSize: 15},
            39: {fontSize: 15},
            40: {fontSize: 15},
            41: {fontSize: 15},
            42: {fontSize: 15},
            43: {fontSize: 15},
            44: {fontSize: 15},
            45: {fontSize: 15},
            46: {fontSize: 15},
            47: {fontSize: 15},
            48: {fontSize: 15},
            49: {fontSize: 15},
            50: {fontSize: 15},
            51: {fontSize: 15},
            52: {fontSize: 15},
            53: {fontSize: 15},
            54: {fontSize: 15},
            55: {fontSize: 15},
            56: {fontSize: 15},
            57: {fontSize: 15},
            58: {fontSize: 15},
            59: {fontSize: 15},
            60: {fontSize: 15},
            61: {fontSize: 15},
            62: {fontSize: 15},
            63: {fontSize: 15},
            64: {fontSize: 15},
            65: {fontSize: 15},
            66: {fontSize: 15},
            67: {fontSize: 15},
            68: {fontSize: 15},
            69: {fontSize: 15},
            70: {fontSize: 15},
            71: {fontSize: 15},
            72: {fontSize: 15},
            73: {fontSize: 15},
            74: {fontSize: 15},
            75: {fontSize: 15},
            76: {fontSize: 15},
            77: {fontSize: 15},
            78: {fontSize: 15},
            79: {fontSize: 15},
            80: {fontSize: 15},
            81: {fontSize: 15},
            82: {fontSize: 15},
            83: {fontSize: 15},
            84: {fontSize: 15},
            85: {fontSize: 15},
            86: {fontSize: 15},
            87: {fontSize: 15},
            88: {fontSize: 15},
            89: {fontSize: 15},
            90: {fontSize: 15},
            91: {fontSize: 15},
            92: {fontSize: 15},
            93: {fontSize: 15},
            94: {fontSize: 15},
            95: {fontSize: 15},
            96: {fontSize: 15},
            97: {fontSize: 15},
            98: {fontSize: 15},
            99: {fontSize: 15},
        },
    });
    //Make Tag&Height bold & font 17
    if (text.tagUnder == true) {
        for (let i = 0; i <= textAE.length; i++) {
            text.styles[1][i].fontWeight = 'bold';
            text.styles[1][i].fontSize = 17;
        }
        for (let i = (text.text.length - textAE.length - location.length - height.toString().length - 4); i <= text.text.length - textAE.length - location.length - 4; i++) {
            text.styles[0][i].fontWeight = 'bold';
            text.styles[0][i].fontSize = 17;
        }

    } else {
        for (let i = (text.text.length - textAE.length - 2 - location.length); i <= text.text.length - 1 - location.length; i++) {
            text.styles[0][i].fontWeight = 'bold';
            text.styles[0][i].fontSize = 17;
        }
        for (let i = (text.text.length - textAE.length - location.length - height.toString().length - 3); i <= text.text.length - textAE.length - location.length - 2; i++) {
            text.styles[0][i].fontWeight = 'bold';
            text.styles[0][i].fontSize = 17;
        }

    }
    //Make customer font to 12
    if (custName != '') {
        for (let i = (unitDrop.length + 3); i <= (unitDrop.length + 3 + custName.length); i++) {
            text.styles[0][i].fontSize = 12;
        }
    }
}

/**
 * Creates a fabric.js group with one Rect and one Itext item representing the unit as global variable currentGroup
 * @param width - The width of the fabric.Rect object in the unit
 * @param height - The height of the fabric.Rect object in the unit
 * @param cName - The customer of the unit
 * @param AE - The tag number of the unit
 * @param color - The border color of fabric.Rect
 * @param fill - The background color of fabric.Rect
 * @param left - The left position of the fabric.Group
 * @param top - The top position of the fabric.Group
 * @param unitDrop - The drop of the customer of the unit
 * @param location - The physical location of the unit
 * @param {boolean} inCanvas - Flag to signal if the unit is current displayed on canvas
 * @param customerText - The displayed name of the customer in the unit
 * @param fullAE - The full tag number
 * @param weight - The weight of the unit
 */
function createUnit(width, height, cName, AE, color, fill, left, top, unitDrop, location, inCanvas, customerText, fullAE, weight) {
    var custName = cName;
    var rect = new fabric.Rect({
        width: width * 2 - 4,
        height: height * 2 - 2,
        fill: fill,
        stroke: color,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
        rx: 5,
        ry: 5
    });
    var text = new fabric.IText(/*custName + " " + height + " " + AE*/ '', {
        textBackgroundColor: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Arial',
        originX: 'center',
        originY: 'center',
        lineHeight: .75,
    });

    unitText(customerText, width, height, unitDrop, AE, text, rect, location);

    currentGroup = new fabric.Group([rect, text], {
        unitHeight: height,
        unitWidth: width,
        left: left,
        top: top,
        selectable: true,
        id: custName + AE,
        unit: true,
        remove: false,
        hasControls: true,
        customer: cName,
        drop: unitDrop,
        ae: AE,
        fill: fill,
        color: color,
        intersects: true,
        location: location,
        inCanvas: inCanvas,
        customerText: customerText,
        fullAE: fullAE,
        weight, weight
    });

    //Place unit text more centered and unit border more closer to text
    if (currentGroup.item(1).locationUnder == false && currentGroup.item(1).tagUnder == true) {
        if (currentGroup.item(1).rotated != true){
            currentGroup.item(1).set('top', currentGroup.item(1).top + 7);
            currentGroup.set('height', currentGroup.height - 14);
            if (currentGroup.unitHeight * 2 - 2 > currentGroup.height) {
                currentGroup.set('height', currentGroup.unitHeight * 2);
            }
        }else {
            currentGroup.item(1).set('left', currentGroup.item(1).top - 7);
            currentGroup.set('width', currentGroup.width - 14);
            if (currentGroup.unitWidth * 2 - 2 > currentGroup.width) {
                currentGroup.set('width', currentGroup.unitWidth * 2);
            }
        }
    }
    weightCount = weightCount + Math.round(weight);
    _tWeight.innerText = weightCount;

    currentGroup.hoverCursor = 'move';
    currentGroup.moveCursor = 'grabbing';

    //On deselect of units change color back to default to prevent edit border from staying
    let tempActive = currentGroup;
    tempActive.on('deselected', function (options) {
        editOff(tempActive);
    });
}

/**
 * Creates a preview unit on the side bar
 * @param width - The width of the preview unit
 * @param height - The height of the preview unit
 * @param custName - The customer of the preview unit
 * @param AE - The tag of the preview unit
 * @param color - The border color of the preview unit
 * @param fill - The background color of the preview unit
 * @param unitDrop - The drop number of the customer of the preview unit
 * @param location - The physical location of the preview unit
 */
function AddSide(width, height, custName, AE, color, fill, unitDrop, location) {
    createUnit(width, height, custName, AE, color, fill, 0, 0, unitDrop, location, true, custName, AE, 0);
    canvasSide.add(currentGroup);
    canvasSide.centerObject(currentGroup);
}

/**
 * Retrieves the customer at given drop number
 * @param drop - The drop number to match the customer's drop
 * @returns {string} cust - The customer that matches the given drop
 */
function getDropCustomer(drop) {
    var b;
    var cust = 'none';
    for (b = 0; b < customers.length; b++) {
        if (customers[b].drop == drop) {
            cust = customers[b];
        }
    }
    return cust;
}

/**
 * Updates the customer drop based on given customer name
 * @param {string} cName - The customer to be drop number updated
 * @returns {string} error - The error message, if empty no error occurred
 */
function updateDrop(cName) {
    var error = "";
    var i;
    if (checkIfCustomerExists(cName)) {
        if (_drop.value != "" && _drop.value > 0) {
            currentDrop = _drop.value;
        }
        for (i = 0; i < customers.length; i++) {
            if (customers[i].drop == currentDrop && customers[i].name != currentCustomerName) {
                error = 'Drop Error';
                break;
            } else if (customers[i].drop != currentDrop && customers[i].name == currentCustomerName) {
                error = 'Drop already exists'
                break;
            }
        }
        if (error != "") {
            _drop.value = "";
        } else {
            customers[getCustomerIndex(cName)].drop = currentDrop;
        }
    }
    return error;
}

/**
 * Updates the selected unit based on inputted sidebar fields
 */
function updateUnit() {
    if (editing == true) {
        let unUpdatedUnit;
        if (editingUnit == null) {
            unUpdatedUnit = canvas.getActiveObject();
        } else {
            unUpdatedUnit = editingUnit;
        }
        let dropError = '';
        let oldFill = unUpdatedUnit.item(0).fill;
        let oldColor = unUpdatedUnit.item(0).stroke;
        let oldLeft = unUpdatedUnit.left;
        let oldTop = unUpdatedUnit.top;
        let oldCustomer = unUpdatedUnit.customerText;

        let addCheck = true;

        if (_drop.value != '') {
            removeUnit(unUpdatedUnit);
            unUpdatedUnit.set('remove', true);
            let tempCustomer = getDropCustomer(_drop.value);
            if (tempCustomer.names.includes(_customer.value)){
                addCheck = false;
            }
            let AddError = Add(+_width.value, +_height.value, _customer.value, _tag.value, oldColor, oldFill, oldLeft, oldTop, _drop.value, _location.value, unUpdatedUnit.inCanvas, +_weight.value, addCheck);
            if (AddError == '') {
                updateCount(canvas.getActiveObject());
                canvas.remove(unUpdatedUnit);
                updateCount(unUpdatedUnit);
                addCustomer(_customer.value, _drop.value, false);
            } else {
                unUpdatedUnit.set('remove', false);
                let rUnit = canvas.getActiveObject();
                removeUnit(rUnit);
                canvas.remove(rUnit);
                updateCount(rUnit);
                addUnit(unUpdatedUnit);
                canvas.add(unUpdatedUnit);
                updateCount(unUpdatedUnit);
                addCustomer(unUpdatedUnit.customer, unUpdatedUnit.drop, false);
            }
        } else {
            alert(dropError + 'Drop cannot be empty' + "\n");
        }
        editing = false;
        editOff(null);
        listUnits();
        document.getElementById("unitContainer").style.borderColor = "#ccc";
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
        _location.value = '';
        _tag.value = '';
    }
}

/**
 * Calls createSide() function and sets related elements for general field input changes
 */
function onChange() {
    createSide();
    if (editing != true) {
        document.getElementById("unitContainer").style.borderColor = "#ccc";
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
    }
}

/**
 * Sets customer data based on customer name field
 * @param {boolean} list - If true, Flag to run listCustomer() function
 */
function onNameChange(list) {
    currentCustomerName = _customer.value;
    let customer = getCustomer(currentCustomerName);
    setBundleCheck(currentCustomerName);
    if (customer == null) {
        _drop.value = '';
    } else {
        _drop.value = customer.drop;
    }
    createSide();

    //Flag list
    if (list == true) {
        listCustomer();
    }
}

/**
 * Creates preview unit on sidebar
 */
function createSide() {
    canvasSide.remove(currentGroup);
    currentCustomerName = _customer.value;
    AddSide(+_width.value, +_height.value, currentCustomerName, _tag.value, "black", "white", _drop.value, _location.value);
    canvasSide.setHeight(currentGroup.height);
    canvasSide.setWidth(+_width.value);
    _sideUnit.src = currentGroup.toDataURL();
    _sideUnit.height = currentGroup.height / 2;
    _sideUnit.width = currentGroup.width / 2;
    canvasSide.requestRenderAll();
}

/**
 * Called when height or weight sliders are moved
 */
function onChangeSlider() {
    _width.value = document.getElementById("swidth").value * 24;
    _height.value = document.getElementById("sheight").value;
    onChange();
}

/**
 * Checks if given customer has bundles and sets rack toggle
 * @param {string} cName - The customer name to be checked
 */
function setBundleCheck(cName) {
    if (checkIfCustomerExists(cName) && customers[getCustomerIndex(cName)].rack == true) {
        _rack.checked = true;
    } else {
        _rack.checked = false;
    }
}

/**
 * Checks if hasBundles is checked. Adds customer if checked. Removes customer if unchecked and has no units,
 */
function isBundlesChecked() {
    var exists = false;
    currentCustomerName = _customer.value;
    units.forEach(function (unit) {
        if (unit.customer == currentCustomerName) {
            exists = true;
        }
    });
    if (_rack.checked == true) {
        addCustomer(currentCustomerName, _drop.value, false);
        customers[getCustomerIndex(currentCustomerName)].rack = true;
    } else if (exists == false) {
        customers[getCustomerIndex(currentCustomerName)].rack = false;
        removeCustomer(currentCustomerName);
    } else {
        customers[getCustomerIndex(currentCustomerName)].rack = false;
    }
}

/**
 * Sets customer in or out of bundle rack
 */
function checkRack() {
    let dropCustomer = getDropCustomer(_drop.value);

    if (_drop.value == '') {
        alert("Drop cannot be empty or contain letters");
        _rack.checked = false;
    } else if (dropCustomer.name != _customer.value && dropCustomer.name != 'none') {
        _drop.value = '';
        alert("Drop " + _drop.value + " is already assigned to " + dropCustomer.name + "\n");
        _rack.checked = false;
    } else if (!isNaN(_customer.value)) {
        alert("Customer must contain a letter");
        _rack.checked = false;
    } else {
        currentCustomerName = _customer.value;
        isBundlesChecked();
        setBundleCheck(currentCustomerName);
        listCustomer();
        updateRack();
        canvas.requestRenderAll();
    }
}

/**
 * Returns customer that matches given name
 * @param {string} name - The name of the customer
 * @returns {null, array} -
 */
function getCustomer(name) {
    let tempCust = null;
    customers.forEach(function (customer) {
        customer.names.forEach(function (names){
            if (names == name) {
                tempCust = customer;
                return tempCust;
            }
        });
    });
    return tempCust;
}

/**
 * Determines if customer is in truck by checking all unit's customer
 * @param {string} cust - The customer name to be checked
 * @returns {boolean} inTruck - True if is in truck, false if not.
 */
function isCustInTruck(cust) {
    let inTruck = false;
    let customer = getCustomer(cust);
    if (customer != null && customer.rack == false) {
        units.forEach(function (unit) {
            if (unit.customer == customer.name && unit.inCanvas == true) {
                inTruck = true;
            }
        });
    } else {
        inTruck = true;
    }
    return inTruck;
}

/**
 * Checks units array if a unit's customer matches given customer name
 * @param {string} cust - The customer name to be checked
 * @returns {null, unit} tempUnit - Returns matched unit if found, else returns null
 */
function getCustUnit(cust) {
    var tempUnit = null;
    units.forEach(function (unit) {
        if (unit.customer == cust) {
            tempUnit = unit;
        }
    });
    return tempUnit;
}

/**
 * Checks units array if a unit's id matches given id
 * @param {string} id - The id to be checked
 * @returns {null, unit} tempUnit - Returns matched unit if found, else returns null
 */
function getIDUnit(id) {
    let tempUnit = null;
    units.forEach(function (unit) {
        if (unit.id == id) {
            tempUnit = unit;
        }
    });
    return tempUnit;
}

/**
 * Checks units array if a unit's tag matches given tag
 * @param {string} tag - The tag to be checked
 * @returns {null, unit} tempUnit - Returns matched unit if found, else returns null
 */
function getTagUnit(tag) {
    let tempUnit = null;
    units.forEach(function (unit) {
        if (unit.ae == tag) {
            tempUnit = unit;
        }
    });
    return tempUnit;
}

/**
 * Sorts unit list
 */
function sortUnit() {
    units.sort(function (a, b) {
        return a.drop - b.drop
    });
    units.reverse();
    listUnits();
}

/**
 * Adds a unit to units array
 * @param {unit} unit - The unit to be added
 * @returns {boolean} Success exit status.
 */
function addUnit(unit) {
    if (unit.id != '') {
            units.push(unit);
            document.getElementById("tUnits").innerText = units.length.toString();
            sortUnit();
            saveToBrowser();
            return true;
    }
    return false;
}

/**
 * Removes unit from units array and updates customer array
 * @param {unit} unit - The unit to be removed
 */
function removeUnit(unit) {
    if (unit.id != '') {
        if (checkIfUnitIDExists(unit.id)) {
            units.splice(units.indexOf(units[unitIndex]), 1);
            document.getElementById("tUnits").innerText = units.length.toString();
            document.getElementById("drops").innerText = customers.length.toString();
            sortUnit();
            weightCount = weightCount - unit.weight;
            _tWeight.innerText = weightCount;
            saveToBrowser();
        }
        if (getCustUnit(unit.customer) == null) {
            removeCustomer(unit.customer);
            updateRack();
        }
    }
}

/**
 * Sorts customers array and then relists customer list
 */
function sortCustomer() {
    customers.sort(function (a, b) {
        return a.drop - b.drop
    });
    customers.reverse();
    listCustomer();
}

/**
 * Adds a customer to customer array
 * @param {string} cName - The name of the customer
 * @param {string} cDrop - The drop number of the customer in string
 * @param {boolean} importing - Flag if importing, enables array of names
 * @param {string} importingCustomer - The customer name from importing
 * @returns {boolean} True if success
 */
function addCustomer(cName, cDrop, importing, importingCustomer) {
    if (cName != '') {
        if (!checkIfCustomerExists(cName)) {
            if (checkIfCustomerDropExists(cDrop) == '') {
                customers.push({name: cName, rack: false, drop: cDrop, oDrop: cDrop, names: Array(cName)});
                document.getElementById("drops").innerText = customers.length.toString();
                sortCustomer();
                updateRack();
                saveToBrowser();
                return true;
            }
        }
        if (importing){
            let customer = getDropCustomer(cDrop)
            if (!customer.names.includes(importingCustomer)){
                customer.names.push(importingCustomer);
            }
        }
    }
}

/**
 * Removes customer from customer array
 * @param {string} cName - The customer name
 */
function removeCustomer(cName) {
    if (cName != '') {
        if (checkIfCustomerExists(cName)) {
            if (customers[getCustomerIndex(cName)].rack == false) {
                customers.splice(customers.indexOf(customers[getCustomerIndex(cName)]), 1);
                document.getElementById("drops").innerText = customers.length.toString();
                sortCustomer();
                saveToBrowser();
            }
        }
    }
}

/**
 * Checks units array if any unit id matches given id
 * @param {string} id - The id to be tested
 * @returns {boolean} True: success. False: unsuccessful
 */
function checkIfUnitIDExists(id) {
    unitIndex = 0;
    while (unitIndex < units.length) {
        if (units[unitIndex].id == id) {
            return true;
            break;
        }
        unitIndex++;
    }
    unitIndex = 0;
    return false;
}

/**
 * Checks customers array if any customer matches given customer name
 * @param {string} cName - Customer name to be tested
 * @returns {boolean} exists - Returned true if exists, false if not
 */
function checkIfCustomerExists(cName) {
    let i = 0;
    let exists = false;
    while (i < customers.length) {
        customers[i].names.forEach(function (names){
            if (names == cName) {
                exists = true;
                return exists;
            }
        });
        i++;
    }
    return exists;
}

/**
 * Returns the index of customers array for the given customer name
 * @param {string} cName - The customer name to be tested
 * @returns {null, number} index - Returns null if not found, else returns the matched index number
 */
function getCustomerIndex(cName) {
    customerIndex = 0;
    let index = null;
    while (customerIndex < customers.length) {
        customers[customerIndex].names.forEach(function (names){
            if (names == cName) {
                index = customerIndex;
                return index;
            }
        });
        customerIndex++;
    }
    return index;
}