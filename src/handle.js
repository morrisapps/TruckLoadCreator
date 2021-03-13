/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2021 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Initializes all images with drag handlers
var images = document.querySelectorAll('.images img');
[].forEach.call(images, function (img) {
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
});

/**
 * Creates a dashed fabric.Line to be used on canvas
 * @param top - The top position of dash
 * @param left - The left position of dash
 * @param width - The width of the dash
 * @returns {fabric.Group()} dashGroup - The dash object to be used on fabric canvas
 */
function createDash(top, left, width) {
    var dash = new fabric.Line([0, 20, width - 4, 20], {
        strokeUniform: true,
        strokeWidth: 5,
        strokeDashArray: [14, 10],
        stroke: 'black',
        fill: 'white',
        hasControls: true,
        tool: true,

    });
    var dashGroup = new fabric.Group([dash], {
        left: left,
        top: top,
        id: 'dash',
        height: 10,
        width: width,
        hasControls: true,
        intersects: true,
        tool: true,
        isDash: true,
        lockScalingFlip: true,
    });
    dashGroup.cornerSize = 16;
    dashGroup.cornerColor = 'rgba(0,144,255,0.53)';
    dashGroup.cornerStyle = 'circle';
    dashGroup.transparentCorners = true;
    dashGroup.hoverCursor = 'move';
    dashGroup.moveCursor = 'grabbing';

    dashGroup.on('selected', function (options) {
        fabric.Object.prototype.setControlsVisibility({
            tl: false, //top-left
            mt: false, // middle-top
            tr: false, //top-right
            ml: true, //middle-left
            mr: true, //middle-right
            bl: false, // bottom-left
            mb: false, //middle-bottom
            br: false, //bottom-right
            mtr: false //rotating-point
        });
        fabric.Object.prototype.controls.mtr.cornerSize = 0;
        unitButtons.offsetX = unitButtons.offsetX + 6;
        editButton.offsetX = editButton.offsetX + 6;
    });
    dashGroup.on('deselected', function (options) {
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
        fabric.Object.prototype.controls.mtr.cornerSize = 24;
        unitButtons.offsetX = unitButtons.offsetX - 6;
        editButton.offsetX = editButton.offsetX - 6;
    });

    dashGroup.on('scaling', function (options) {
        dashGroup.item(0).set({
            strokeDashArray: [14, 10],
            strokeWidth: 5,
        });
    });
    return dashGroup;
}

/**
 * Creates a fabric.Textbox with the given text
 * @param top - The top position
 * @param left - The left position
 * @param text - The text to be placed in the fabric.Textbox
 * @param width - The width of the fabric.Textbox
 * @returns {fabric.Textbox()} comment - The comment object to be used on fabric canvas
 */
function createComment(top, left, text, width) {
    let commentText = '';
    if (text != null) {
        commentText = text;
    }

    var comment = new fabric.Textbox(commentText, {
        width: width,
        height: 300,
        top: top,
        left: left,
        hasControls: true,
        fontSize: 16,
        fixedWidth: 150,
        fixedFontSize: 17,
        fontWeight: 'bold',
        isComment: true,
        tool: true,
        id: 'Comment Textbox'
    });
    comment.hoverCursor = 'move';
    comment.moveCursor = 'grabbing';

    comment.controls.deleteControl = unitButtons;
    comment.on('selected', function (options) {
        comment.setControlsVisibility({
            tl: false, //top-left
            mt: false, // middle-top
            tr: false, //top-right
            ml: true, //middle-left
            mr: true, //middle-right
            bl: false, // bottom-left
            mb: false, //middle-bottom
            br: false, //bottom-right
            mtr: false //rotating-point
        });
        fabric.Object.prototype.controls.mtr.cornerSize = 0;
        unitButtons.offsetX = unitButtons.offsetX + 6;
        editButton.offsetX = editButton.offsetX + 6;

    });
    comment.on('deselected', function (options) {
        comment.setControlsVisibility({
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
        fabric.Object.prototype.controls.mtr.cornerSize = 24;
        unitButtons.offsetX = unitButtons.offsetX - 6;
        editButton.offsetX = editButton.offsetX - 6;
    });
    return comment;
}

/**
 * Creates a fabric.Group containing fabric.Rect and fabric.Itext representing a rack
 * @param top - The top position of the rack
 * @param left - The left position of the rack
 * @param id - The id of the rack, used for representing the size of the rack
 * @param {boolean} drag - Flag if rack is being created by drag and drop to set position accordingly
 * @returns {fabric.Group()} - The rack object to be used on fabric canvas
 */
function createRack(top, left, id, drag) {
    let rackHeight = 0;
    let rackText = '';

    if (id == "RackS") {
        rackHeight = 18;
        rackText = "Rack Small"
    }
    if (id == "RackM") {
        rackHeight = 24;
        rackText = "Rack Medium"
    }
    if (id == "RackL") {
        rackHeight = 29;
        rackText = "Rack Large"
    }
    var rackRect = new fabric.Rect({
        width: 192 * 2 - 4,
        height: rackHeight * 2 - 2,
        fill: "white",
        stroke: 'black',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
        rx: 5,
        ry: 5,
    });

    if (drag == true) {
        top = top - rackRect.height / 2;
        left = left - rackRect.width / 2;
    }

    var rText = new fabric.IText(rackText, {
        height: height * 2 - 2,
        textBackgroundColor: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'Arial',
        originX: 'center',
        originY: 'center',
    });

    let rackNew = new fabric.Group([rackRect, rText], {
        unitHeight: rackHeight,
        left: left,
        top: top,
        selectable: true,
        id: 'rack',
        size: id,
        remove: false,
        isRack: true,
        hasControls: true,
        intersects: true,
        tool: true,
        weight: 2000
    });

    truckWeightUpdate(2000);

    rackNew.hoverCursor = 'move';
    rackNew.moveCursor = 'grabbing';
    let current = rackNew;
    rackNew.on('selected', function (options) {
        fabric.Object.prototype.controls.mtr = mtrButton;
        fabric.Object.prototype.setControlsVisibility({
            mtr: false
        });
        _weight.value = current.weight;
    });
    rackNew.on('deselected', function (options) {
        fabric.Object.prototype.controls.mtr = editButton;
        fabric.Object.prototype.setControlsVisibility({
            mtr: true
        });
        _weight.value = '';
    });
    return rackNew;
}

/**
 * Triggered when image element is dropped on canvas.
 * Determines what type of object to create on canvas.
 * @returns {boolean} - Returns false
 */
function handleDrop(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    var img;
    var images = document.querySelector('.images img.img_dragging');
    if (images == null) {
        var cList = document.querySelector('.list-group-cust div.img_dragging');
        if (cList == null) {
            var uList = document.querySelector('.list-group-unit div.img_dragging');
            if (uList == null) {
                img = null;
            } else {
                img = uList
            }
        } else {
            img = cList;
        }
    } else {
        img = images;
    }

    //Do when object is dropped on canvas
    if (img != null) {
        //Creates unit from list item
        if (img.parentElement.id == 'unitList') {
            let draggedUnit = getIDUnit(img.id.replace(/%/g, ' '));
            if (draggedUnit.inCanvas == true) {
                alert(draggedUnit.id + ' is already in the truck');
            } else {
                editOff(draggedUnit);
                draggedUnit.set('left', e.layerX * invertedWidthRatio - draggedUnit.unitWidth);
                draggedUnit.set('top', e.layerY * invertedWidthRatio - draggedUnit.unitHeight);
                draggedUnit.inCanvas = true;
                canvas.add(draggedUnit);
                updateCount(draggedUnit);
                listUnits();
                listCustomer();
                _weight.value = '';
            }
        }
        //Add sideUnit
        if (img.id == "sideUnit") {
            //Adding Units
            if (_customer.value == '') {
                alert("Customer cannot be empty");
            } else if (_drop.value == '') {
                alert("Drop cannot be empty");
            } else if (_tag.value == '') {
                alert("Tag cannot be empty");
            } else if (!isNaN(_customer.value)){
                alert("Customer must contain a letter");
            }
            else {
                editing = false;
                let addError = Add(
                    +_width.value,
                    +_height.value,
                    _customer.value,
                    _tag.value,
                    currentColor,
                    currentFill,
                    //Takes the mouse coordinates multiplies by invertedWidthRatio and subtracts width or height divided by 2.
                    //Does not add divided by two because the canvas is 2x the pixel size
                    e.layerX * invertedWidthRatio - _width.value,
                    e.layerY * invertedWidthRatio - _height.value,
                    _drop.value,
                    _location.value,
                    true,
                    +_weight.value,
                    true,
                    _striped.checked
                );
                if (addError == "") {
                    addCustomer(_customer.value, _drop.value, false);
                }
                _tag.value = '';
                _location.value = '';
            }
        }
        //Add comment textbox
        else if (img.id == "comment") {
            let text = createComment(e.layerY * invertedWidthRatio - 9, e.layerX * invertedWidthRatio - 75, '', 150);
            canvas.add(text);
            canvas.setActiveObject(text);
            keepInBounds(text);
        }
        //Add strap
        else if (img.id == "dashline") {
            let dashGroup = createDash(e.layerY * invertedWidthRatio - 5, e.layerX * invertedWidthRatio - 190, 380);
            canvas.add(dashGroup);
            canvas.setActiveObject(dashGroup);
            keepInBounds(dashGroup);
        }
        //Add Rack
        else if (img.id == "RackS" || img.id == "RackM" || img.id == "RackL") {
            rackCanvas = createRack(e.layerY * invertedWidthRatio, e.layerX * invertedWidthRatio, img.id, true);
            canvas.add(rackCanvas);
            canvas.setActiveObject(rackCanvas);
            keepInBounds(rackCanvas);
        }
        //Update the line count when dropped
        updateCount(canvas.getActiveObject());
        saveToBrowser();
    }
    return false;
}

/**
 * Determines the type of image being dragged and adds it to img.classList
 */
function handleDragStart(e) {
    let type = null;
    if (e.target.tagName == "IMG") {
        type = images;
    } else if (e.target.parentElement.id == "unitList") {
        type = uList;
    } else if (e.target.parentElement.id == "cList") {
        type = cList;
    }
    if (type != null) {
        [].forEach.call(type, function (img) {
            img.classList.remove('img_dragging');
        });
        this.classList.add('img_dragging');
    }
}

/**
 * Removes the dragged unit from the img.classList
 */
function handleDragEnd(e) {
    let type = null;
    if (e.target.parentElement != null) {
        if (e.target.tagName != null && e.target.tagName == "IMG") {
            type = images;
        } else if (e.target.parentElement.id != null && e.target.parentElement.id == "unitList") {
            type = uList;
        } else if (e.target.parentElement.id != null && e.target.parentElement.id == "cList") {
            type = cList;
        }
    }
    if (type != null) {
        [].forEach.call(type, function (img) {
            img.classList.remove('img_dragging');
        });
    }
}

