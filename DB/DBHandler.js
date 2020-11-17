4/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Creates import dialog
$(function () {
    $("#importDialog").dialog({
        autoOpen: false,
        modal: true,
        show: 'clip',
        hide: "blind",
        width: 300,
        height: 220,
        draggable: false,
        resizable: false,
        buttons: {
            "Import": function () {
                console.log(_returnedData);
                console.log($("#importTruck").val());
                console.log($("#importTruck")[0].selectedIndex);
                console.log(_returnedData[$("#importTruck")[0].selectedIndex]);
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
    $("#errorDialog").dialog({
        autoOpen: false,
        show: 'fold',
        hide: "blind",
        width: 300,
        height: 220,
        buttons: {
            "Cancel": function () {
                $("#errorDialog").dialog("close");
            }
        }
    }).prev().find(".ui-dialog-titlebar-close").hide();
});

//Launches connect.php which attempts to establish a connection and import data.
function DBConnect() {
    let error = '';
    $.post('./DB/connect.php', null, function (response) {
        //Returned message
        if (response){
            try {
                _returnedData = JSON.parse(response);
            } catch(e) {
                error = 'Invalid data retrieved from server';
            }
        }
        //Checks if results have any data
        if (_returnedData[0] != false && _returnedData[0] != null) {
            //Removes all options
            $('#importTruck').find('option').remove().end();
            //Adds new options as truckID's
            for (let i = 0; i < _returnedData.length; i++) {
                $('#importTruck').append($('<option>', {
                    value: _returnedData[i][1],
                    text: _returnedData[i][1]
                })).selectmenu("refresh");
            }
        } else {
            //Error handling
            if (_returnedData[0] == null){
                error = 'No trucks imported.';
            }else {
                for (let i = 0; i+1 < _returnedData.length; i++){
                    if (_returnedData[i+1].message != null){
                        error = error + _returnedData[i+1].message;
                    }else {
                        error = error + _returnedData[i+1];
                    }
                }
            }

        }
    })
        //Called on failing to connect to DB. Opens error dialog.
        .fail(function (xhr, status, error) {
            document.getElementById('errorDialog').innerHTML = "<P>" + error + "<br> <br>Contact I.T for solution" + "</p>"
            $(function () {
                $("#errorDialog").dialog("open");
            });
        })
        //Called on successfully connecting to DB. Opens import dialog if no parse errors.
        .done(function () {
            if (error == ''){
                $(function () {
                    $("#importDialog").dialog("open");
                });
            }else {
                document.getElementById('errorDialog').innerHTML = "<P>" + error + "</p>"
                $(function () {
                    $("#errorDialog").dialog("open");
                });
            }

        });
}
