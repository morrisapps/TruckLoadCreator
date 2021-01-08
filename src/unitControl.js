/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * Called when Add/Update button is clicked
 * Create a unit to list if Add. Replaces a unit in canvas with a new one if Update.
 */
function AddUpdateButton() {
    if (document.getElementById('add').name == 'update') {
        updateUnit()
    } else {
        //Adding Units to list
        if (_customer.value == '') {
            alert("Customer cannot be empty");
        } else if (_drop.value == '') {
            alert("Drop cannot be empty");
        } else if (_tag.value == '') {
            alert("Tag cannot be empty");
        } else if (!isNaN(_customer.value)){
            alert("Customer must contain a letter");
        } else {
            let AddError = Add(+_width.value, +_height.value, _customer.value, _tag.value, 'black', 'white', 200, 200, _drop.value, _location.value, false, Math.round(+_weight.value), true);
            if (AddError == '') {
                updateCount(canvas.getActiveObject());
                addCustomer(_customer.value, _drop.value, false);
                _tag.value = '';
                _location.value = '';
                _weight.value = '';
                document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Added to List!" onclick="AddUpdateButton()">Added</button>';
            }
        }
    }
}

/**
 * Called when Remove Button is clicked
 * Removes unit that is currently in edit
 */
function RemoveButton() {
    if (editingUnit != null && editingUnit.unit == true) {
        deleteObject(null, editingUnit);
        editOff(null);
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Deleted from List!" onclick="AddUpdateButton()">Deleted</button>';
        _location.value = '';
    }
}