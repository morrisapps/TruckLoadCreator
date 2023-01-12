/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2022 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * Saves all relevant truck information to the browser's localStorage
 */
function saveToBrowser(){
    //Saves all relevant information to browser
    localStorage.saveContent = JSON.stringify(getSaveContent());
    //Sets the browsers saved variable to false to signify that the saveContent is not yet saved to disk;
    localStorage.saved = false;
}

/**
 * Retrieves all truck information to be used for saving
 * @returns {[]} - An array containing units, customers, canvas text, canvas racks, canvas dashes,canvas comments, truckID, program options, fileName
 */
function getSaveContent() {
    //Sets current date of canvas to signify this is the date of the current version
    timeText.text = new Date().toDateString().slice(4);

    //Saves important unit information
    let savedUnits = [];
    units.forEach(function (unit) {
        let saved = ({
            unitHeight: unit.unitHeight,
            unitWidth: unit.unitWidth,
            left: unit.left,
            top: unit.top,
            selectable: unit.selectable,
            id: unit.id,
            unit: unit.unit,
            remove: unit.remove,
            hasControls: unit.hasControls,
            customer: unit.customer,
            drop: unit.drop,
            ae: unit.ae,
            intersects: unit.intersects,
            fill: unit._objects[0].fill,
            color: unit._objects[0].stroke,
            location: unit.location,
            inCanvas: unit.inCanvas,
            customerText: unit.customerText,
            fullAE: unit.fullAE,
            weight: unit.weight,
            striped: unit.striped,
            opacity: unit.opacity
        });
        savedUnits.push(saved);
    });
    //Saves typed in information from truck header
    let savedText = ({
        driverTextEdit: driverTextEdit.text,
        dropsTextEdit: dropsTextEdit.text,
        shipperTextEdit: shipperTextEdit.text,
        trailerTextEdit: trailerTextEdit.text,
        modeTextEdit: modeTextEdit.text,
        loadTextEdit: loadTextEdit.text,
        timeText: timeText.text
    });

    //Save comment, dashline, racks
    let savedComments = [];
    let savedDashes = [];
    let savedRacks = [];
    canvas.forEachObject(function (obj) {
        if (obj.isComment == true) {
            let comment = ({
                top: obj.top,
                left: obj.left,
                text: obj.text,
                width: obj.width,
            });
            savedComments.push(comment);
        } else if (obj.isDash == true) {
            let dash = ({
                top: obj.top,
                left: obj.left,
                width: obj.width,
                scaleX: obj.scaleX,
            });
            savedDashes.push(dash);
        } else if (obj.isRack == true) {
            let rack = ({
                top: obj.top,
                left: obj.left,
                id: obj.size,
                drag: false,
                opacity: obj.opacity
            });
            savedRacks.push(rack);
        }
    });

    //Save options
    let options = [_tagBrackets.checked, _custInUnits.checked, _locToggle.checked, _halfWeightToggle.checked];

    //Bundles all content
    let saveContents = [
        savedUnits,
        customers,
        savedText,
        savedRacks,
        savedDashes,
        savedComments,
        truckID,
        options,
        getFileName()
    ];
    return saveContents;
}

/**
 * Creates a name that can be used for saving
 * @returns {string} - The file name
 */
function getFileName(){
    var date = new Date();
    let loadNumber = '';
    let modeNumber = '';
    let trailerNumber = '';
    let driverName = '';
    if (loadTextEdit.text != "Enter load") {
        loadNumber = loadTextEdit.text + " – ";
    }
    if (modeTextEdit.text != "Enter mode") {
        modeNumber = modeTextEdit.text + " – ";
    }
    if (trailerTextEdit.text != "Enter trailer") {
        trailerNumber = trailerTextEdit.text + " – ";
    }
    if (driverTextEdit.text != "Enter driver") {
        driverName = driverTextEdit.text + " – ";
    }
    return (modeNumber + loadNumber + trailerNumber + driverName + (date.getMonth() + 1) + "." + date.getDate() + "." + date.getFullYear());
}

/**
 * Saves current truck as a PDF file.
 */
function saveAsPDF(){
    html2pdf(document.getElementById('printableArea'),
        {   html2canvas: {
                width: canvas.width,
                logging: false
            },
            margin: [0, 25,0,-5],
            image: {
                type: 'jpeg',
                quality: 1
            },
            filename: getFileName()+".pdf",
            jsPDF:{
                unit: 'mm',
                format: 'letter',
                orientation: 'landscape',
                format:[canvas.width,canvas.height] }
        });
}

/**
 * Saves current state of the program to a .truck file to be used for loading back later
 */
function save() {
    //Get saved contents and convert to JSON object
    let saveContent = getSaveContent();
    let JSONContents = [];
    JSONContents[0] = JSON.stringify(getSaveContent(), function replacer(key, value) {
        return value;
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(JSONContents, {
        type: "text/plain"
    }));

    a.setAttribute("download", saveContent[8] + ".truck");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    //Sets localStorage saved variable to true to signal that the work has been saved up to this point.
    localStorage.saved = true;
}

/**
 * Replaces all units in canvas with the given array of updateUnits
 * @param {[unit]} updateUnits - Array of units
 */
function updateUnits(updateUnits) {
    //Reinitialize all units
    canvas.forEachObject(function (obj) {
        if (obj.unit == true) {
            truckWeightUpdate();
            //Remove unit from all weight regions
            weightRegions.forEach(function(region){
                for (const unit of region.units) {
                    if (unit[0] === obj) {region.units.delete(unit);break;}
                }
            })
            canvas.remove(obj);
        }
    });
    units = [];

    //Reinitialize counters
    initializeCounters();
    createCounters();
    _tWeight.innerText = '';
    _mWeight.innerText = '';
    _hWeight.innerText = '';

    topUnits.forEach(function (tUnit) {
        tUnit = new Array();
    });
    botUnits.forEach(function (bUnit) {
        bUnit = new Array();
    });

    for (let tUnit of topUnits) {
        tUnit = new Array();
    }
    for (let bUnit of botUnits) {
        bUnit = new Array();
    }
    for (let tCounter of topCounters) {
        tCounter.text = '';
    }
    for (let tCounter of botCounters) {
        tCounter.text = '';
    }

    //Restore units
    updateUnits.forEach(function (unit) {
        if (unit != null) {
            createUnit(unit.unitWidth, unit.unitHeight, unit.customer, unit.ae, unit.color, unit.fill, unit.left, unit.top, unit.drop, unit.location, unit.inCanvas, unit.customerText, unit.fullAE, unit.weight, unit.striped, unit.opacity);
            units.push(currentGroup);
            if (currentGroup.inCanvas == true) {
                canvas.add(currentGroup);
                updateCount(currentGroup);
            }
        }
    });

    //Restore racks and dashes
    canvas.forEachObject(function (obj){
        if (obj.isRack || obj.isDash){updateCount(obj);}
    });
}

/**
 * Loads a saved state from a file using a selection dialog
 */
function loadFromFile() {
    //Retrieving data
    let content;
    var input = $(document.createElement('input'));
    input.attr("type", "file");
    input.trigger('click');
    input.change(function (i) {
        var reader = new FileReader();
        reader.readAsText(i.target.files[0]);
        reader.onload = readerEvent => {
            content = JSON.parse(readerEvent.target.result);
            load(content);
        }
    });
}

/**
 * Loads the saved state in the browser
 * @returns {boolean} - Returns true if successful
 */
function loadFromBrowser(){
    if (localStorage.saved == 'false'){
        let savedContent = JSON.parse(localStorage.saveContent);
        if(confirm('The previous session '+savedContent[8].toString() +' had unsaved work. Would you like to restore?')){
            load(savedContent);
            return true;
        }
    }
}

/**
 * Loads given save.
 * Restores units, customers, canvas text, canvas racks, canvas dashes,canvas comments, truckID, and program options.
 * @param {[units, customers, canvas text, canvas racks, canvas dashes,canvas comments, truckID, program options, file name]} content - The save content
 */
function load(content) {
    //Set loading to true
    let loading = true;

    //Reset all input to blank
    _customer.value = '';
    _drop.value = '';
    _rack.checked = false;
    _tag.value = '';
    _height.value = '';
    _width.value = '';
    _weight.value = '';
    _striped.checked = false;
    createSide();

    //Set options
    _tagBrackets.checked = content[7][0];
    _custInUnits.checked = content[7][1];
    _locToggle.checked = content[7][2];
    _halfWeightToggle.checked = content[7][3];

    //Remove all objects
    canvas.forEachObject(function (obj){
            canvas.remove(obj);
    });

    //Remove all units from weight regions
    sideRegions.forEach(function(region){region.units = new Set()})
    weightRegions.forEach(function(region){region.units = new Set()})

    //Re-add weight regions to canvas
    canvas.add(topLeftWeightRegion,topMiddleWeightRegion,topRightWeightRegion,botLeftWeightRegion,botMiddleWeightRegion,botRightWeightRegion);
    canvas.add(topFrontWeightRegion,topBackWeightRegion,botFrontWeightRegion,botBackWeightRegion);
    canvas.add(fullWeightRegion);
    //Re-add weight text to canvas
    canvas.add(topLeftWeightText,topMiddleWeightText,topRightWeightText,botLeftWeightText,botMiddleWeightText,botRightWeightText);

    //Recreate units
    updateUnits(content[0]);

    //Restore customers
    customers = content[1];

    //Recount total units and customers
    document.getElementById("tUnits").innerText = units.length.toString();
    document.getElementById("drops").innerText = customers.length.toString();

    //Re-init Customers box
    rackLoad();
    updateRack();

    //Sort customer and unit lists
    sortCustomer();
    sortUnit();

    //Re-init canvas text fields
    textLoad();

    //Restore truckid and truck size
    truckLoad(content[6]);

    //Restore racks
    content[3].forEach(function (rack) {
        let savedRack = createRack(rack.top, rack.left, rack.id, rack.drag, rack.opacity);
        canvas.add(savedRack);
        updateCount(savedRack);
    });

    //Restore dash lines
    content[4].forEach(function (dash) {
        let savedDash = createDash(dash.top, dash.left, (dash.width - 2) * dash.scaleX)
        canvas.add(savedDash);
        updateCount(savedDash);
    });

    //Restore comments
    content[5].forEach(function (comment) {
        canvas.add(createComment(comment.top, comment.left, comment.text, comment.width));
    });

    //Restore text edit fields
    driverTextEdit.text = content[2].driverTextEdit;
    dropsTextEdit.text = content[2].dropsTextEdit;
    shipperTextEdit.text = content[2].shipperTextEdit;
    trailerTextEdit.text = content[2].trailerTextEdit;
    modeTextEdit.text = content[2].modeTextEdit;
    loadTextEdit.text = content[2].loadTextEdit;
    loadID = content[2].loadTextEdit;
    timeText.text = content[2].timeText;
    createLoadBarcode();

    //Triggers selection and deselection of each field to call handlers to set properties
    canvas.setActiveObject(driverTextEdit);
    canvas.setActiveObject(dropsTextEdit);
    canvas.setActiveObject(shipperTextEdit);
    canvas.setActiveObject(trailerTextEdit);
    canvas.setActiveObject(modeTextEdit);
    canvas.setActiveObject(loadTextEdit);
    canvas.discardActiveObject();
    canvas.requestRenderAll();

    //Places objects that should be visible on the top layers.
    keepObjectsOnTop();

    //Set loading to false
    loading = false;
}