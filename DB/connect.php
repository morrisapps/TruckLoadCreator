<?php
/*
* TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
* Copyright 2022 (c) Corey Morris
* Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
*/

//Server variables
$connectionTable = 'dbo.fakesample';
$connectionServer = 'localHost';
$connectionLogin = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "test"
);

//set rows
$getTrucksRows = array('TRUCKID', 'DLVMODEID');
$getUnitsRows = array('TRUCKID', 'TRAILERNUMBER', 'DLVMODEID', 'shipdate', 'ACTUALHEIGHT', 'ACTUALWEIGHT', 'ESTIMATEDHEIGHT', 'ESTIMATEDWEIGHT', 'CUSTOMERNAME', 'DROPNUMBER', 'WMSPALLETID', 'HEIGHT', 'WEIGHT', 'PALLETTYPEID', 'NUMBEROFBUNDLES', 'WMSLOCATIONID');

$connectionQuery = '';
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
    case '3': //Penneast
        $site = 'penn';
        break;
    case '4': //Midwest
        $site = 'midw';
        break;
    case '5': //RWW
        $site = 'rwwl';
        break;
    default: //Default AlexEast
        $site = 'east';
}

//Set queries
$getTrucksQuery = 'SELECT DISTINCT TRUCKID, DLVMODEID FROM ' . $connectionTable . ' WHERE site = \'' . $site . '\' ORDER BY DLVMODEID;';
$getUnitsQuery = 'SELECT * FROM ' . $connectionTable . ' WHERE TRUCKID = \'' . $_POST['tID'] . '\';';


//Set which query to use from POST
if ($_POST['query'] == '1'){$connectionQuery = $getTrucksQuery; $rows = $getTrucksRows;}
else if ($_POST['query'] == '2'){$connectionQuery = $getUnitsQuery; $rows = $getUnitsRows;}

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
            //Encodes each row as utf8 to ensure all unicode characters are processed
            $row = array_map('utf8_encode', $row);
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