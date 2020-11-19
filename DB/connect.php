<?php
/*
* TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
* Copyright 2020 (c) Corey Morris
* Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
*/

//Declared variables
$connectionServer = 'localHost';
$connectionLogin = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "test"
);
$connectionQuery= $_POST['query'];
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