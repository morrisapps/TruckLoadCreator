//Delete Button
let unitButtons = new fabric.Control({
    position: {x: .5, y: -0.5},
    offsetY:-2,
    offsetX: 6,
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
    position: {x: .5, y: -0.5},
    offsetY: 10,
    offsetX: 6,
    cursorStyle: 'pointer',
    mouseUpHandler: editObject,
    render: renderEditIcon,
    cornerSize: 24
});
fabric.Object.prototype.controls.mtr = editButton;


//delete icon
var deleteIcon = "./src/resources/ThirdParty/img/cancel.svg";
var deleteImg = document.createElement('img');
deleteImg.src = deleteIcon;
function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
}

//edit icon
var editIcon = "./src/resources/ThirdParty/img/menu.svg";
var editImg = document.createElement('img');
editImg.src = editIcon;
function renderEditIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(editImg, -size / 2, -size / 2, size, size);
    ctx.restore();
}


function deleteObject(eventData, target) {
    let removeResponse = confirm("Are you sure you want to remove " + target.id + "?");
    if (removeResponse == true) {
        target.set('remove', true);
        canvas.remove(target);
        removeUnit(target);
        updateHeightCount(target);
        canvas.requestRenderAll();
    }
}

function editObject(eventData, target){
    if (editing == false){
        editing = true;
        editingUnit = target;
        document.getElementById("ae").value = target.ae;
        document.getElementById("height").value = target.unitHeight;
        document.getElementById("width").value = target.unitWidth;
        document.getElementById("location").value = target.location;
        document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="update" data-title="Update Unit" onclick="AddUpdateButton()">Update</button>';
        document.getElementById("unitContainer").style.borderColor = "#fb8302";
        target.set({'borderColor':'#fb8302'});
        document.getElementById('remove').style.visibility = 'visible';
    } else {
        editOff(target);
    }

    canvas.requestRenderAll();
}

function editOff(unit){
    document.getElementById("ae").value = '';
    document.getElementById("location").value = '';
    document.getElementById('add').outerHTML = '<button style="margin-top: 20px;" class="tip expand" id="add" name="add" data-title="Add to List" onclick="AddUpdateButton()">Add</button>';
    if (unit != null){
        unit.set({'borderColor':'rgb(178,204,255)'});
    }

    document.getElementById("unitContainer").style.borderColor = "#CCC";
    editing = false;

    document.getElementById('remove').style.visibility = 'hidden';
}