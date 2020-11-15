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
//array_push($return, $conn);
if ($conn) {
    //Read Query
    $returnedData = sqlsrv_query($conn, $connectionQuery);
    if ($returnedData == FALSE){
        die(FormatErrors(sqlsrv_errors()));
        array_push($return,($row[null] . " " . $row[null] . " " . $row[null] . PHP_EOL));
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
}
echo json_encode($return);



function FormatErrors( $errors )
{
    /* Display errors. */
    echo json_encode("Error information: ");

    foreach ( $errors as $error )
    {
        echo json_encode("SQLSTATE: ".$error['SQLSTATE']."");
        echo json_encode("Code: ".$error['code']."");
        echo json_encode("Message: ".$error['message']."");
    }
}
?>