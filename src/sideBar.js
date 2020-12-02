/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

var customers = [];
var units = [];
var unitIndex;
var customerIndex;
var canvasSide = new fabric.Canvas('d', {selection: false});
var currentGroup;
var currentColor;
var currentFill;
var currentCustomerName;
var currentDrop;
canvasSide.setHeight(126);
canvasSide.setWidth(251);
var grid = 25;
let sideUnit = document.getElementById('sideUnit');

function cutText(text, start, end) {
    if (text.length <= end) {
        return text;
    } else {
        return text.slice(start, end);
    }
}

function optionsUpdate() {
    updateUnits(units);
    canvas.requestRenderAll();
    saveToBrowser();
}

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

function AddSide(width, height, custName, AE, color, fill, unitDrop, location) {
    createUnit(width, height, custName, AE, color, fill, 0, 0, unitDrop, location, true, custName, AE, 0);
    canvasSide.add(currentGroup);
    canvasSide.centerObject(currentGroup);
}


currentFill = "white";
// Random color currentColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
currentColor = 'black';


//Adding objects
AddSide(+_width.value, +_height.value, _customer.value, _tag.value, currentColor, currentFill, _drop.value, _location.value);
sideUnit.src = currentGroup.toDataURL();
sideUnit.height = +_height.value;
sideUnit.width = +_width.value;

function getDropUnit(drop) {
    //Checks if any unit exists with drop number. Returns first unit found.
    var b;
    var unit = 'none';
    for (b = 0; b < units.length; b++) {
        if (units[b].drop == drop) {
            unit = units[b];
        }
    }
    return unit;
}

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

function setDropCheck(cName) {
    var cust = getCustomer(cName);
    if (cust == null) {
    } else if (cust.drop > 0) {
        _drop.value = cust.drop;
    }
}

function onDropChange() {
    createSide();
}

function checkDropAssigned(newCustName, currentCust) {
    if (currentCust.name != newCustName && currentCust != 'none') {
        _drop.value = '';
        return "Drop " + _drop.value + " is already assigned to " + currentCust.name + "\n";
    } else {
        return "";
    }
}

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

        if (_drop.value != '') {

            removeUnit(unUpdatedUnit);
            unUpdatedUnit.set('remove', true);
            let AddError = Add(+_width.value, +_height.value, _customer.value, _tag.value, oldColor, oldFill, oldLeft, oldTop, _drop.value, _location.value, unUpdatedUnit.inCanvas, +_weight.value);
            if (AddError == '') {
                updateCount(canvas.getActiveObject());
                canvas.remove(unUpdatedUnit);
                updateCount(unUpdatedUnit);
                addCustomer(_customer.value, _drop.value);
            } else {
                unUpdatedUnit.set('remove', false);
                let rUnit = canvas.getActiveObject();
                removeUnit(rUnit);
                canvas.remove(rUnit);
                updateCount(rUnit);
                addUnit(unUpdatedUnit);
                canvas.add(unUpdatedUnit);
                updateCount(unUpdatedUnit);
                addCustomer(unUpdatedUnit.customer, unUpdatedUnit.drop);
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

function onChange() {
    createSide();
    if (editing != true) {
        document.getElementById("unitContainer").style.borderColor = "#ccc";
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
    }
}

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
    if (list == true) {
        listCustomer();
    }


}

function createSide() {

    canvasSide.remove(currentGroup);
    currentCustomerName = _customer.value;
    AddSide(+_width.value, +_height.value, currentCustomerName, _tag.value, "black", "white", _drop.value, _location.value);

    canvasSide.setHeight(currentGroup.height);
    canvasSide.setWidth(+_width.value);

    sideUnit.src = currentGroup.toDataURL();
    sideUnit.height = currentGroup.height / 2;
    sideUnit.width = currentGroup.width / 2;

    canvasSide.requestRenderAll();
}

function onChangeSlider() {
    _width.value = document.getElementById("swidth").value * 24;
    _height.value = document.getElementById("sheight").value;
    onChange();
}

function setBundleCheck(cName) {
    if (checkIfCustomerExists(cName) && customers[getCustomerIndex(cName)].rack == true) {
        _rack.checked = true;
    } else {
        _rack.checked = false;
    }
}

function isBundlesChecked() {
    var exists = false;
    currentCustomerName = _customer.value;
    units.forEach(function (unit) {
        if (unit.customer == currentCustomerName) {
            exists = true;
        }
    });
    if (_rack.checked == true) {
        addCustomer(currentCustomerName, _drop.value);
        customers[getCustomerIndex(currentCustomerName)].rack = true;
    } else if (exists == false) {
        customers[getCustomerIndex(currentCustomerName)].rack = false;
        removeCustomer(currentCustomerName);
    } else {
        customers[getCustomerIndex(currentCustomerName)].rack = false;
    }
}

function checkRack() {
    let checkDrop = checkDropAssigned(_customer.value, getDropCustomer(_drop.value));
    if (_drop.value == '') {
        alert("Drop cannot be empty or contain letters");
        _rack.checked = false;
    } else if (checkDrop != '') {
        alert(checkDrop);
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


function getCustomer(name) {
    let tempCust = null;
    customers.forEach(function (customer) {
        if (customer.name == name) {
            tempCust = customer;
            return tempCust;
        }
    });
    return tempCust;
}

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

function getCustUnit(cust) {
    var tempUnit = null;
    units.forEach(function (unit) {
        if (unit.customer == cust) {
            tempUnit = unit;
            return tempUnit;
        }
    });
    return tempUnit;

}

function getIDUnit(id) {
    let tempUnit = null;
    units.forEach(function (unit) {
        if (unit.id == id) {
            tempUnit = unit;
        }
    });
    return tempUnit;
}

function getTagUnit(tag) {
    let tempUnit = null;
    units.forEach(function (unit) {
        if (unit.ae == tag) {
            tempUnit = unit;
        }
    });
    return tempUnit;
}

function sortUnit() {
    units.sort(function (a, b) {
        return a.drop - b.drop
    });
    units.reverse();
    listUnits();
}

function addUnit(unit) {
    if (unit.id != '') {
        if (!checkIfUnitIDExists(unit.id)) {
            units.push(unit);
            document.getElementById("tUnits").innerText = units.length.toString();
            sortUnit();
            saveToBrowser();
            return true;
        }
    }
}

function removeUnit(unit) {
    if (unit.id != '') {
        if (checkIfUnitIDExists(unit.id)) {
            units.splice(units.indexOf(units[unitIndex]), 1);
            document.getElementById("tUnits").innerText = units.length.toString();
            document.getElementById("drops").innerText = customers.length.toString();
            sortUnit();
            saveToBrowser();
        }
        if (getCustUnit(unit.customer) == null) {
            removeCustomer(unit.customer);
            updateRack();
        }
    }
}

function sortCustomer() {
    customers.sort(function (a, b) {
        return a.drop - b.drop
    });
    customers.reverse();
    listCustomer();
}

function addCustomer(cName, cDrop) {
    if (cName != '') {
        if (!checkIfCustomerExists(cName)) {
            if (checkIfCustomerDropExists(cDrop) == '') {
                customers.push({name: cName, rack: false, drop: cDrop, oDrop: cDrop});
                document.getElementById("drops").innerText = customers.length.toString();
                sortCustomer();
                updateRack();
                saveToBrowser();
                return true;
            }
        }
    }
}

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

function checkIfUnitIDExists(id) {
    unitIndex = 0;
    //returnIndex disabled due to error with units existing after delete
    let returnIndex = false;
    while (unitIndex < units.length) {
        if (units[unitIndex].id == id) {
            return true;
            //returnIndex = true;
            break;
        }
        unitIndex++;
    }
    unitIndex = 0;
    return false;
    //return returnIndex;

}

function checkIfCustomerExists(cName) {
    let i = 0;
    let exists = false;
    while (i < customers.length) {
        if (customers[i].name == cName) {
            exists = true;
            break;
        }
        i++;
    }
    return exists;
}

function getCustomerIndex(cName) {
    customerIndex = 0;
    let index = null;
    while (customerIndex <= customers.length) {
        if (customers[customerIndex].name == cName) {
            index = customerIndex;
            break;
        }
        customerIndex++;
    }
    return index;
}