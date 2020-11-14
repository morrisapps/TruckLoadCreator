<?php
$connectionOptions = array(
    "Database" => "SampleDB",
    "Uid" => "sa",
    "PWD" => "test"
);
$return = array();
//Establishes the connection
$conn = sqlsrv_connect("localHost", $connectionOptions);
array_push($return, 'connecting');
if ($conn) {
    array_push($return, 'connected!');
} else {
    array_push($return, 'Not connected');
}
echo json_encode($return);
?>