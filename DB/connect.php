<?php
/*
* TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
* Copyright 2020 (c) Corey Morris
* Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
*/

//Server variables
$connectionTable = 'dbo.alex_test_sample';
$connectionServer = 'localHost';
$connectionLogin = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "test"
);
$getTrucksQuery = 'SELECT DISTINCT TRUCKID, DLVMODEID FROM ' . $connectionTable . ';';
$getUnitsQuery = 'SELECT * FROM ' . $connectionTable . ' WHERE TRUCKID = \'' . $_POST['tID'] . '\';';
$connectionQuery = '';
if ($_POST['query'] == '1'){$connectionQuery = $getTrucksQuery;}
else if ($_POST['query'] == '2'){$connectionQuery = $getUnitsQuery;}
$rows = $_POST['rows'];
$return = array();


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