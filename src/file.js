/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

function save(){
    //Saves important unit information
    let savedUnits = [];
    units.forEach(function (unit){
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
        });

        savedUnits.push(saved);
    });

    let savedText = ({
        driverTextEdit: driverTextEdit.text,
        dropsTextEdit: dropsTextEdit.text,
        shipperTextEdit: shipperTextEdit.text,
        trailerTextEdit: trailerTextEdit.text,
        modeTextEdit: modeTextEdit.text,
        loadTextEdit: loadTextEdit.text
    });

    //Save comment, dashline, racks
    let savedComments = [];
    let savedDashes = [];
    let savedRacks = [];
    canvas.forEachObject(function(obj){
        if (obj.isComment == true){
            let comment = ({
                top: obj.top,
                left: obj.left,
                text: obj.text,
                width: obj.width,
            });
            savedComments.push(comment);
        }else if (obj.isDash == true){
            let dash = ({
                top: obj.top,
                left: obj.left,
                width: obj.width,
                scaleX: obj.scaleX,
            });
            savedDashes.push(dash);
        }else if (obj.isRack == true){
            let rack = ({
                top: obj.top,
                left: obj.left,
                id: obj.size,
                drag: false,
            });
            savedRacks.push(rack);
        }
    });

    let Contents = [
        savedUnits,
        customers,
        savedText,
        savedRacks,
        savedDashes,
        savedComments,
        truckid
    ];
    let saveContents = [];
    saveContents[0] = JSON.stringify(Contents, function replacer(key, value) { return value;});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(saveContents, {
        type: "text/plain"
    }));

    //Create file name
    var date = new Date();
    let loadNumber = '';
    let modeNumber = '';
    let trailerNumber = '';
    if (loadTextEdit.text != "Enter load"){
        loadNumber = loadTextEdit.text+'_';
    }
    if (modeTextEdit.text != "Enter mode"){
        modeNumber = modeTextEdit.text+'_';
    }
    if (trailerTextEdit.text != "Enter trailer"){
        trailerNumber = trailerTextEdit.text+'_';
    }
    let saveFileName = modeNumber+loadNumber+trailerNumber+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getHours()+'h'+date.getMinutes()+'m';


    a.setAttribute("download", saveFileName+".truck");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}

function updateUnits(updateUnits){

}

function load(){
    //Reset all input to blank
    _customer.value = '';
    _drop.value = '';
    _rack.value = false;
    _tag.value = '';
    _height.value = '';
    _width.value = '';
    createSide();

    //Retrieving data
    var input = $(document.createElement('input'));
    input.attr("type", "file");
    input.trigger('click');
    input.change(function(i){
        var reader = new FileReader();
        reader.readAsText(i.target.files[0]);
        reader.onload = readerEvent => {
            let content = JSON.parse(readerEvent.target.result);

            //Reinitialize all units
            canvas.forEachObject(function (obj) {
                if (obj.unit == true){
                    canvas.remove(obj);
                }
            });
            units = [];

            //Reinitialize counters
            initializeCounters();
            heightLines();
            topUnits.forEach(function (tUnit){ tUnit = new Array(); });
            botUnits.forEach(function (bUnit){ bUnit = new Array(); });

            for (let tUnit of topUnits){ tUnit = new Array(); };
            for (let bUnit of botUnits){ bUnit = new Array(); };
            for (let tCounter of topCounters){ tCounter.text = ''; };
            for (let tCounter of botCounters){ tCounter.text = ''; };

            //Restore units
            content[0].forEach(function (unit){
                if (unit != null){
                    createUnit(unit.unitWidth, unit.unitHeight, unit.customer, unit.ae, unit.color, unit.fill, unit.left, unit.top, unit.drop, unit.location, unit.inCanvas);
                    units.push(currentGroup);
                    if (currentGroup.inCanvas == true){
                        canvas.add(currentGroup);
                        updateHeightCount(currentGroup);
                    }
                }
            });

            customers = content[1];

            //Recount total units and customers
            document.getElementById("tUnits").innerText = units.length.toString();
            _drop.innerText = customers.length.toString();

            updateRack();
            sortCustomer();
            sortUnit();
            textLoad();

            //Restore text edit fields
            driverTextEdit.text = content[2].driverTextEdit;
            dropsTextEdit.text = content[2].dropsTextEdit;
            shipperTextEdit.text = content[2].shipperTextEdit;
            trailerTextEdit.text = content[2].trailerTextEdit;
            modeTextEdit.text = content[2].modeTextEdit;
            loadTextEdit.text = content[2].loadTextEdit;
            //Triggers selection and deselection of each field to call handlers to set properties
            canvas.setActiveObject(driverTextEdit);
            canvas.setActiveObject(dropsTextEdit);
            canvas.setActiveObject(shipperTextEdit);
            canvas.setActiveObject(trailerTextEdit);
            canvas.setActiveObject(modeTextEdit);
            canvas.setActiveObject(loadTextEdit);
            canvas.discardActiveObject();
            canvas.requestRenderAll();

            //Restore racks
            content[3].forEach(function (rack){
                let savedRack = createRack(rack.top,rack.left,rack.id,rack.drag);
                canvas.add(savedRack);
                updateHeightCount(savedRack);
            });

            //Restore dash lines
            content[4].forEach(function (dash){
                canvas.add(createDash(dash.top, dash.left, (dash.width-2)*dash.scaleX));
            });

            //Restore comments
            content[5].forEach(function (comment){
                canvas.add(createComment(comment.top,comment.left,comment.text,comment.width));
            });
            //Restore truckid and truck size
            truckLoad(content[6]);

        }
    });

}