var images = document.querySelectorAll('.images img');
[].forEach.call(images, function (img) {
    img.addEventListener('dragstart', handleDragStart, false);
    img.addEventListener('dragend', handleDragEnd, false);
});

//When mouse is down anywhere in the program
window.addEventListener('mousedown', e => {
    //Calls listUnits to refresh what is selected in list
    //listUnits();
    //listCustomer();
});

function handleDragEnter(e) {
    /*
      if (e.preventDefault) {
          e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';
      if (e.target.tagName == 'CANVAS'){
          pointerDrag = e;
          //console.log(e.clientX);
      }
      if (e.target.tagName == 'CANVAS'){
          console.log('Dragging over Canvas');
          var img = document.querySelector('.images img.img_dragging');
          if (img.id == "sideUnit") {

                  //Adding Units
                  if (document.getElementById("drop").value == '') {
                      alert("Drop cannot be empty");
                  } else {
                      editing = false;
                      var offset = $($("canvas", this)[0]).offset();
                      let addError = Add(
                          +document.getElementById("width").value,
                          +document.getElementById("height").value,
                          document.getElementById("name").value,
                          document.getElementById("ae").value,
                          currentColor,
                          currentFill,
                          //Takes the mouse coordinates multiplies by invertedWidthRatio and subtracts width or height divided by 2.
                          //Does not add divided by two because the canvas is 2x the pixel size
                          e.layerX*invertedWidthRatio-document.getElementById("width").value,
                          e.layerY*invertedWidthRatio-document.getElementById("height").value,
                          document.getElementById("drop").value);
                      //document.getElementById("ae").value = "";
                      if (addError == "") {
                          addCustomer(document.getElementById("name").value, document.getElementById("drop").value);
                      }
              }
          }
          console.log(e);
          e.dropEffect="none";
          while (1 == 0){
              console.log("mousedown")
              let currentUnit = canvas.getActiveObject();
              //mouseDownEvent = false;
              if (currentUnit != null){
                  currentUnit.top = e.layerY*invertedWidthRatio-currentUnit.height;
                  currentUnit.left = e.layerX*invertedWidthRatio-currentUnit.width;

              }
          }
      }
      return false;

     */
}

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
        unitButtons.offsetX = 10;
        editButton.offsetX = 10;
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
            mtr: false //rotating-point
        });
        fabric.Object.prototype.controls.mtr.cornerSize = 24;
        unitButtons.offsetX = 6;
        editButton.offsetX = 6;
    });

    dashGroup.on('scaling', function (options) {
        dashGroup.item(0).set({
            //strokeWidthUnscaled: dashGroup.item(0).strokeWidth,
            //strokeWidth: dashGroup.item(0).strokeWidthUnscaled / dashGroup.item(0).scaleX,
            strokeDashArray: [14, 10],
            strokeWidth: 5,
        });
    });

    return dashGroup;
}

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
        unitButtons.offsetX = 10;
        editButton.offsetX = 10;

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
            mtr: false //rotating-point
        });
        fabric.Object.prototype.controls.mtr.cornerSize = 24;
        unitButtons.offsetX = 6;
        editButton.offsetX = 6;
    });
    return comment;
}

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
        ry: 5
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
        //unit: true,
        remove: false,
        isRack: true,
        hasControls: true,
        intersects: true
    });

    rackNew.hoverCursor = 'move';
    rackNew.moveCursor = 'grabbing';

    rackNew.on('selected', function (options) {
        fabric.Object.prototype.controls.mtr = mtrButton;
        fabric.Object.prototype.setControlsVisibility({
            mtr: false
        });
    });
    rackNew.on('deselected', function (options) {
        fabric.Object.prototype.controls.mtr = editButton;
        fabric.Object.prototype.setControlsVisibility({
            mtr: true
        });
    });
    return rackNew;
}

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
            if (draggedUnit.inCanvas == true){
                alert(draggedUnit.id + ' is already in the truck');
            }else{
                editOff(draggedUnit);
                draggedUnit.set('left', e.layerX * invertedWidthRatio - draggedUnit.unitWidth);
                draggedUnit.set('top', e.layerY * invertedWidthRatio - draggedUnit.unitHeight);
                draggedUnit.inCanvas = true;
                canvas.add(draggedUnit);
                updateHeightCount(draggedUnit);
                listUnits();
                listCustomer();
            }
        }

        //Add sideUnit
        if (img.id == "sideUnit") {

            //Adding Units
            if (document.getElementById("name").value == '') {
                alert("Customer cannot be empty");
            } else if (document.getElementById("drop").value == '') {
                alert("Drop cannot be empty");
            } else if (document.getElementById("ae").value == '') {
                alert("Tag cannot be empty");
            } else {
                editing = false;
                var offset = $($("canvas", this)[0]).offset();
                let addError = Add(
                    +document.getElementById("width").value,
                    +document.getElementById("height").value,
                    document.getElementById("name").value,
                    document.getElementById("ae").value,
                    currentColor,
                    currentFill,
                    //Takes the mouse coordinates multiplies by invertedWidthRatio and subtracts width or height divided by 2.
                    //Does not add divided by two because the canvas is 2x the pixel size
                    e.layerX * invertedWidthRatio - document.getElementById("width").value,
                    e.layerY * invertedWidthRatio - document.getElementById("height").value,
                    document.getElementById("drop").value,
                    document.getElementById('location').value,
                    true
                );
                if (addError == "") {
                    addCustomer(document.getElementById("name").value, document.getElementById("drop").value);
                }
                document.getElementById("ae").value = '';
                document.getElementById("location").value = '';
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
        updateHeightCount(canvas.getActiveObject());
    }
    return false;
}

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

        var imageOffset = $(this).offset();
        imageOffsetX = e.clientX - imageOffset.left;
        imageOffsetY = e.clientY - imageOffset.top;
    }
}

function handleDragEnd(e) {
    let type = null;
    if (e.target.parentElement != null){
        if (e.target.tagName != null && e.target.tagName == "IMG") {
            type = images;
        } else if (e.target.parentElement.id != null && e.target.parentElement.id == "unitList") {
            type = uList;
        } else if (e.target.parentElement.id != null && e.target.parentElement.id == "cList") {
            type = cList;
        }
    }

    // this/e.target is the source node.
    if (type != null) {
        [].forEach.call(type, function (img) {
            img.classList.remove('img_dragging');
        });
    }
}

