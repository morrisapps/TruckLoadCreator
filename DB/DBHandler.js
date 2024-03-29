/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2023 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */


/**
 * Creates import dialog
 */
$(function () {
    $("#importDialog").dialog({
        autoOpen: false,
        modal: true,
        show: 'clip',
        hide: "blind",
        width: 300,
        height: "auto",
        draggable: false,
        resizable: false,
        minHeight: 220,
        maxHeight: 400,
        buttons: {
            "Import": function () {
                //Checks if truck is labled empty to disable importing
                if ($('#importTruck').find('option').text() == 'Empty'){
                    $('#importDialog').dialog("close");
                }else {
                    getDBData($("#importTruck").val());
                }

            },
            "Cancel": function () {
                $("#importDialog").dialog("close");
            }
        }
    }).prev().find(".ui-dialog-titlebar-close").hide();
    $("#importTruck").selectmenu({});
});

/**
 * Launches connect.php which attempts to establish a connection to import data.
 * @param {[Query number, query rows, truckID]} input - An array containing query number, the rows, and optionally the truckID
 * @returns {*} - Sets _errorDB to any error messages encountered
 */
function DBConnect(input) {
    _errorDB = '';
    let query = input[0];;
    let tID = input[1];
    //Runs connect.php which connects to DB and returns associated rows as a double array
    return $.post('./DB/connect.php', {query: query, tID: tID, location: URLlocation}, function (response) {
        //Returned message
        if (response) {
            try {
                _returnedData = JSON.parse(response);
            } catch (e) {
                _errorDB = 'Invalid data retrieved from server ' + e;
            }
        } else {
            _errorDB = 'No Response from Server'
        }
        if (_errorDB == '') {
            //Checks if results are not null
            if (_returnedData == null && _returnedData[0] == null && _returnedData[0] == false) {
                //Error handling
                if (_returnedData[0] == null) {
                    _errorDB = _errorDB + 'No trucks imported.';
                } else {
                    for (let i = 0; i + 1 < _returnedData.length; i++) {
                        if (_returnedData[i + 0].message != null) {
                            _errorDB = _errorDB + _returnedData[i + 0].message;
                        } else {
                            _errorDB = +_errorDB + _returnedData[i + 0];
                        }
                    }
                }
            }
        }
    })
        //Called on failing to connect to DB. Opens error dialog.
        .fail(function (xhr, status, failError) {
            _errorDB = _errorDB + " " + failError;
        })
        //Called on successfully connecting to DB.
        .done(function () {
        });
}

/**
 * Retrieves a list of Trucks and displays them in a selectable dialog
 */
function getDBTruckIDs() {
    let input = ['1'];
    $("#overlay").fadeIn(300);
    let DBReturn = null;
    let DBPromise = new Promise((finished) => {
        finished(DBReturn = DBConnect(input));
    });
    DBPromise.then(v => {
        if (_errorDB == '') {
            //Removes all options
            $('#importTruck').find('option').remove().end();
            //Adds new options as truckID's
            if (_returnedData.length > 0){
                for (let i = 0; i < _returnedData.length; i++) {
                    let disabled = false;
                    if (loadID != '' && loadID != 'Enter load' && loadID != _returnedData[i][0]){
                        disabled = true;
                    }
                    $('#importTruck').append($('<option>', {
                        value: _returnedData[i][0],
                        text: _returnedData[i][1] +' ' + _returnedData[i][0],
                        disabled: disabled
                    })).selectmenu("refresh");

                }
            } else {
                //No trucks in manifest
                document.getElementById('importText').innerHTML = "<p>No trucks in truck view</p>"
                $('#importTruck').append($('<option>', {
                    value: 0,
                    text: 'Empty',
                    disabled: true
                })).selectmenu("refresh");
            }

            if (loadID != '' && loadID != "Enter load"){
                $('#importTruck').val(loadID).selectmenu("refresh");
                document.getElementById('importText').innerHTML = "<p>Import from "+loadID+" again?</p>"
            }
            $(function () {
                $("#importDialog").dialog("open");
            });
        } else {
            document.getElementById('infoDialog').innerHTML = "<P>" + _errorDB + "</p>"
            $(function () {
                $('#infoDialog').dialog('option', 'title', 'Error');
                $("#infoDialog").dialog("open");
            });
        }
        $("#overlay").fadeOut(300);
    });
}

/**
 * Retrieves the customer, unit, and bundle information from given truckID.
 * Calls loadFromDB with returned data
 * @param truckID - The truck trailer number
 */
function getDBData(truckID) {
    let input = ['2', truckID];
    $("#overlay").fadeIn(300);
    $(function () {$("#importDialog").dialog("close");});
    //Delay to wait for dialog to close
    setTimeout(function() {
        let DBReturn = null;
        let DBPromise = new Promise((finished) => {
            finished(DBReturn = DBConnect(input));
        });
        DBPromise.then(v => {
            if (_errorDB == '') {
                loadFromDB(_returnedData);

            } else {
                document.getElementById('infoDialog').innerHTML = "<P>" + _errorDB + "</p>"
                $(function () {
                    $('#infoDialog').dialog('option', 'title', 'Error');
                    $("#infoDialog").dialog("open");
                });
            }
            $("#overlay").fadeOut(300);
        });
    }, 1000);
}

/**
 * Loads customer, unit, bundle, and truck information from the given database data
 * @param data - An array containing arrays representing each returned row
 */
function loadFromDB(data) {
    let importUnits = 0;
    let importCusts = 0;
    data.forEach(function (item) {
        //Checks if Customer drop exists and if name is different. Forces use of the same name.
        let customer = null;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].oDrop == item[9]) {
                customer = customers[i];
            }
        }
        let customerText = item[8];
        if (customer != null){
            customerText = customer.name;
        }

        //Location - If in correct truck do set location to blank
        let physical = item[15].replace(/\D/g,'');
        let truckID = item[2].replace(/\D/g,'');
        let location = item[15];
        if (parseInt(physical) == parseInt(truckID) || location == 'SHIPPING'){location = '';}

        //Format pallet type to dimensions only
        let dimensions = item[13].replace(/[a-wy-z\s&\/\\#,+'"()$~%.:*?<>\-_{}]/gi, '');
        //Get unit width
        let unitWidth = item[16];
        //If unit type is EC, set stripes true
        let stripes = false;
        if (item[13].substring(0, 2) == "EC"){stripes = true;}

        //Checks if bundle then add bundle
        if (item[18].includes('Bundle')){
            if (addCustomer(customerText, item[9], false)){
                importCusts++
            }
            customers[getCustomerIndex(customerText)].rack = true;
        //If not bundle, add as unit
        } else {
            //Create unit
            createUnit(unitWidth, Math.trunc(item[11]), customerText, item[10].slice(item[10].length -4, item[10].length), 'black', 'white', 0, 0, item[9], location, false, item[8],item[10],Math.round(item[12]),stripes);
            if (getTagUnit(item[10]) == null && addUnit(currentGroup)){
                importUnits++;
            }
            if (addCustomer(customerText, item[9], true, item[8])){
                importCusts++;
            }
        }
    });

    //Sort customers and number drop sequence
    customers.sort(function (a, b) {
        return b.drop - a.drop
    });
    customers.reverse();

    for (let i = 0; i < customers.length; i++) {
        //Change Unit Drops matching customer
        units.forEach(function (unit) {
            if (unit.customer == customers[i].name) {
                unit.drop = i+1;
            }
        });
        customers[i].drop = i+1;
    }
    sortCustomer();
    sortUnit();
    updateUnits(units);
    updateRack();
    listUnits();
    loadTextEdit.set({text: data[0][0], fontSize: 16, fontStyle: "normal", top: 23});
    if (loadID == '' || loadID == 'Enter load'){loadID = data[0][0];}
    createLoadBarcode();
    modeTextEdit.set({text: data[0][2], fontSize: 16, fontStyle: "normal", top: 23});
    dropsTextEdit.set({text: customers.length.toString(), fontSize: 16, fontStyle: "normal", top: 23});

    document.getElementById('infoDialog').innerHTML = "<P>" + importUnits + " Units" + "</P>" + "<P>" + importCusts + " Drops" + "</P>"
    $(function () {
        $('#infoDialog').dialog('option', 'title', 'Imported');
        $("#infoDialog").dialog("open");
    });

    if (!loading){saveToBrowser();}
}