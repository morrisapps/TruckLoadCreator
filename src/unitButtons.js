/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Delete Button
let unitButtons = new fabric.Control({
    x: .5,
    y: -.5,
    offsetY:-2,
    offsetX: 12,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderDeleteIcon,
    cornerSize: 24
});
fabric.Object.prototype.controls.deleteControl = unitButtons;

//Used to restore mtr to default
let mtrButton = fabric.Object.prototype.controls.mtr;

//Edit Button
let editButton = new fabric.Control({
    x: .5,
    y: -.5,
    offsetY: 20,
    offsetX: 12,
    cursorStyle: 'pointer',
    mouseUpHandler: editObject,
    render: renderEditIcon,
    cornerSize: 24
});
fabric.Object.prototype.controls.mtr = editButton;

/**
 * Renders the delete icon that will be displayed on selected canvas objects
 */
function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    //delete icon
    var deleteIcon = "./src/resources/ThirdParty/img/cancel.svg";
    var deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
}

/**
 * Renders the edit icon that will be displayed on selected canvas objects
 */
function renderEditIcon(ctx, left, top, styleOverride, fabricObject) {
    //edit icon
    var editIcon = "./src/resources/ThirdParty/img/menu.svg";
    var editImg = document.createElement('img');
    editImg.src = editIcon;
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(editImg, -size / 2, -size / 2, size, size);
    ctx.restore();
}

/**
 * Deletes object from canvas
 * @param eventData - Not used
 * @param target - The object to be deleted
 */
function deleteObject(eventData, target) {
    let removeResponse = confirm("Are you sure you want to remove " + target.id + "?");
    if (removeResponse == true) {
        target.set('remove', true);
        canvas.remove(target);
        removeUnit(target);
        updateCount(target);
        _weight.value = '';
        canvas.requestRenderAll();
        saveToBrowser();
    }
}

/**
 * Toggles the target to be edited on/off and sets side bar fields to the object's properties
 * @param eventData - Not used
 * @param target - The object to have editing turned on or off
 */
function editObject(eventData, target){
    if (editing == false){
        editing = true;
        editingUnit = target;
        _tag.value = target.ae;
        _height.value = target.unitHeight;
        _width.value = target.unitWidth;
        _location.value = target.location;
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="update" data-title="Update Unit" onclick="AddUpdateButton()">Update</button>';
        document.getElementById("unitContainer").style.borderColor = "#fb8302";
        target.set({'borderColor':'#fb8302'});
        document.getElementById('remove').style.visibility = 'visible';
    } else {
        editOff(target);
    }
    canvas.requestRenderAll();
}

/**
 * Disables the object from being edited
 * @param unit - The object that will have editing disabled
 */
function editOff(unit){
    _tag.value = '';
    _location.value = '';
    document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
    if (unit != null){
        unit.set({'borderColor':'rgb(178,204,255)'});
    }
    document.getElementById("unitContainer").style.borderColor = "#CCC";
    editing = false;
    document.getElementById('remove').style.visibility = 'hidden';
}