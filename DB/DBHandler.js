/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

let _DBTable = 'dbo.alex_test_sample';

//Creates import dialog
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
                getDBData($("#importTruck").val());
            },
            "Cancel": function () {
                $("#importDialog").dialog("close");
            }
        }
    }).prev().find(".ui-dialog-titlebar-close").hide();
    $("#importTruck").selectmenu();
});

//Creates error dialog
$(function () {
    $("#infoDialog").dialog({
        autoOpen: false,
        show: 'fold',
        hide: "blind",
        width: 300,
        height: "auto",
        draggable: false,
        resizable: false,
        minHeight: 220,
        maxHeight: 400,
        buttons: {
            "Ok": function () {
                $("#infoDialog").dialog("close");
            }
        }
    }).prev().find(".ui-dialog-titlebar-close").hide();
});

//Launches connect.php which attempts to establish a connection to import data.
function DBConnect(input) {
    _errorDB = '';
    let query = input[0];
    let rows = input[1];

    //Runs connect.php which connects to DB and returns associated rows as a double array
    return $.post('./DB/connect.php', {query: query, rows: rows}, function (response) {
        //Returned message
        if (response) {
            try {
                _returnedData = JSON.parse(response);
                console.log(_returnedData)
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

function getDBTruckIDs() {
    let rows = ['TRUCKID', 'DLVMODEID'];
    let input = ['SELECT DISTINCT TRUCKID, DLVMODEID FROM ' + _DBTable + ';', rows];
    DBConnect(input).then(response => {
        if (_errorDB == '') {
            //Removes all options
            $('#importTruck').find('option').remove().end();
            //Adds new options as truckID's
            for (let i = 0; i < _returnedData.length; i++) {
                $('#importTruck').append($('<option>', {
                    value: _returnedData[i][0],
                    text: _returnedData[i][1] +' ' + _returnedData[i][0]
                })).selectmenu("refresh");
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
    });

}

function getDBData(truckID) {
    let rows = ['TRUCKID', 'TRAILERNUMBER', 'DLVMODEID', 'shipdate', 'ACTUALHEIGHT', 'ACTUALWEIGHT', 'ESTIMATEDHEIGHT', 'ESTIMATEDWEIGHT', 'CUSTOMERNAME', 'DROPNUMBER', 'WMSPALLETID', 'HEIGHT', 'WEIGHT', 'PALLETTYPEID', 'NUMBEROFBUNDLES'];
    let input = ["SELECT * FROM "+ _DBTable + " WHERE TRUCKID = \'" + truckID + "\';", rows];
    DBConnect(input).then(response => {
        if (_errorDB == '') {
            $(function () {
                $("#importDialog").dialog("close");
            });
            loadFromDB(_returnedData);

        } else {
            $(function () {
                $("#importDialog").dialog("close");
            });
            document.getElementById('infoDialog').innerHTML = "<P>" + _errorDB + "</p>"
            $(function () {
                $('#infoDialog').dialog('option', 'title', 'Error');
                $("#infoDialog").dialog("open");
            });
        }
    });
}

function loadFromDB(data) {
    let importUnits = 0;
    let importCusts = 0;
    data.forEach(function (item) {
        let unitWidth = item[13].split(/x/)[1];
        if (unitWidth != undefined) {
            unitWidth = unitWidth.split(/"/)[0];
        }
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

        //Checks if bundles or Units then creates and adds them
        if (item[13].includes('40\"x') || item[13].includes('48\"x') || item[13].includes('EC 25\"')) {
            //Adding unit
            createUnit(unitWidth, item[11], customerText, item[10].slice(item[10].length -4, item[10].length), 'black', 'white', 0, 0, item[9], '', false, item[8],item[10]);
            if (addUnit(currentGroup)){
                importUnits++;
            }
            if (addCustomer(customerText, item[9])){
                importCusts++;
            }

        } else if (item[13].includes('bundle') || item[13].includes('box') || item[11] <= 1){
            if (addCustomer(customerText, item[9])){
                importCusts++
            }
            customers[getCustomerIndex(customerText)].rack = true;
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
    modeTextEdit.set({text: data[0][2], fontSize: 16, fontStyle: "normal", top: 23});
    dropsTextEdit.set({text: customers.length.toString(), fontSize: 16, fontStyle: "normal", top: 53});
    document.getElementById('infoDialog').innerHTML = "<P>" + importUnits + " Units" + "</P>" + "<P>" + importCusts + " Drops" + "</P>"
    $(function () {
        $('#infoDialog').dialog('option', 'title', 'Imported');
        $("#infoDialog").dialog("open");
    });
}