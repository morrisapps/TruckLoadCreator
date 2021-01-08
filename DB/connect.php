<?php
/*
* TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
* Copyright 2020 (c) Corey Morris
* Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
*/

//Server variables
$connectionTable = 'dbo.alexmo_truck_manifest';
$connectionServer = 'am-ax2012-db,56487';
$connectionLogin = array(
    "Database" => "AX2012DB",
    "Uid" => "ax_worldship",
    "PWD" => "0nlyworldship"
);


$connectionQuery = '';
$rows = $_POST['rows'];
$return = array();
$site = '';

//Encapsulate site variable with Location POST. Set which site to use
switch ($_POST['location']) {
    case '1': //AlexEast
        $site = 'east';
        break;
    case '2': //AlexWest
        $site = 'west';
        break;
    case '3':

        break;
    default: //Default AlexEast
        $site = 'east';
}

//Set queries
$getTrucksQuery = 'SELECT DISTINCT TRUCKID, DLVMODEID FROM ' . $connectionTable . ' WHERE site = \'' . $site . '\' ORDER BY DLVMODEID;';
$getUnitsQuery = 'SELECT * FROM ' . $connectionTable . ' WHERE TRUCKID = \'' . $_POST['tID'] . '\';';

//Set which query to use from POST
if ($_POST['query'] == '1'){$connectionQuery = $getTrucksQuery;}
else if ($_POST['query'] == '2'){$connectionQuery = $getUnitsQuery;}

//Establishes the connection
$conn = sqlsrv_connect($connectionServer, $connectionLogin);
if ($conn) {
    //Read Query
    $returnedData = sqlsrv_query($conn, $connectionQuery);
    if ($returnedData == FALSE){
        array_push($return,false);
        foreach ( sqlsrv_errors() as $error )
        {
            array_push($return, $error);
        }
    } else {
        //Fetches rows
        while ($row = sqlsrv_fetch_array($returnedData, SQLSRV_FETCH_ASSOC)) {
            //Creates an array for each row which is then added to the $return array
            $data = array ();
            foreach ($rows as &$value) {
                array_push($data,$row[$value]);
            }
            array_push($return,$data);
        }
    }
    //Closes query
    sqlsrv_free_stmt($returnedData);
}else {
    array_push($return,false);
    array_push($return, 'Could not connect to Database');
}
//Returns data
echo json_encode($return);
?>