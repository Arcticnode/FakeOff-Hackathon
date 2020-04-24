<?php
$hostname='localhost';
$database ='test_data';
$username = 'root';
$password ='admin';

$conexion =new mysqli($hostname,$username,$password, $database);
if($conexion -> connect_errno){
    echo "Error en la conexión";
}

?>