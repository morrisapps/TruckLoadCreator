/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Called when Add/Update button is clicked
//Create a unit to list if Add. Replaces a unit in canvas with a new one if Update.
function AddUpdateButton() {
    if (document.getElementById('add').name == 'update') {
        updateUnit()
    } else {
        //Adding Units to list
        if (document.getElementById("name").value == '') {
            alert("Customer cannot be empty");
        } else if (document.getElementById("drop").value == '') {
            alert("Drop cannot be empty");
        } else if (document.getElementById("ae").value == '') {
            alert("Tag cannot be empty");
        } else if (!isNaN(document.getElementById('name').value)){
            alert("Customer must contain a letter");
        } else {
            let AddError = Add(+document.getElementById('width').value, +document.getElementById('height').value, document.getElementById('name').value, document.getElementById('ae').value, 'black', 'white', 200, 200, document.getElementById('drop').value, document.getElementById('location').value, false);
            if (AddError == '') {
                updateHeightCount(canvas.getActiveObject());
                addCustomer(document.getElementById("name").value, document.getElementById("drop").value);
                document.getElementById('ae').value = '';
                document.getElementById('location').value = '';
                document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Added to List!" onclick="AddUpdateButton()">Added</button>';
            }
        }
    }
}

//Called when Remove Button is clicked
//Removes unit that is currently in edit
function RemoveButton() {
    if (editingUnit != null && editingUnit.unit == true) {
        deleteObject(null, editingUnit);
        editOff(null);
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Deleted from List!" onclick="AddUpdateButton()">Deleted</button>';
        document.getElementById('location').value = '';
    }
}