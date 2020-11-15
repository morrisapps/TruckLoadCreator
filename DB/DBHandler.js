/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

//Creates retrieve dialog
$(function() {
    $("#retrieveDialog").dialog({
        autoOpen: false,
        show: 'fold',
        hide: "blind",
        width: 300,
        height: 220,
        buttons : {
            "Retrieve": function () {
                console.log(_returnedData);
                console.log($("#retrieveTruck").val());
                console.log($("#retrieveTruck")[0].selectedIndex);
            },
            "Cancel": function () {
                $("#retrieveDialog").dialog ("close");
            }
        }
    }).prev().find(".ui-dialog-titlebar-close").hide ();
    $( "#retrieveTruck" ).selectmenu();
});

function DBConnect() {
    $.post('./DB/connect.php', null, function (response) {

        //Returned message
        _returnedData = JSON.parse(response);
        if (_returnedData != null){
            for (let i = 0; i < _returnedData.length; i++){
                    $('#retrieveTruck').append($('<option>', {
                        value: _returnedData[i][1],
                        text: _returnedData[i][1]
                    })).selectmenu("refresh");
            }
        }
    });




    $(function() {
        $( "#retrieveDialog" ).dialog( "open" );
    });
}

function DBRetrieve(truckID){
    let data = {'truckID': truckID};
    $.post('./DB/connect.php', data, function (response) {

        //Returned message
        let returnedData = JSON.parse(response);
        alert("action performed successfully" + returnedData);
    });
}
