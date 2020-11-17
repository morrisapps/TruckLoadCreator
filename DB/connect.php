<?php
/*
* TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
* Copyright 2020 (c) Corey Morris
* Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
*/

$return = array();
$truckID = $_POST['truckID'];

$connectionServer = 'localHost';
$connectionLogin = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "test"
);
$connectionQuery= "SELECT Id, Name, Location FROM TestSchema.Employees;";



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
        while ($row = sqlsrv_fetch_array($returnedData, SQLSRV_FETCH_ASSOC)) {
            $truck = array (
                $row['Id'],
                $row['Name'],
                $row['Location']
            );
            array_push($return,$truck);
        }
    }
    //Closes query
    sqlsrv_free_stmt($returnedData);
}else {
    array_push($return,false);
    array_push($return, 'Could not connect to Database');
}
echo json_encode($return);
?>