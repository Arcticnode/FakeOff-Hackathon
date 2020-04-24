<?php
$hostname='localhost';
$database ='test_data';
$username = 'root';
$password ='';

$conexion =new mysqli($hostname,$username,$password, $database);
if($conexion -> connect_errno){
    echo "Error in the conexion";
}

?>