<?php 
include 'connexion.php';
$word = $_POST['word'];
//%word = &_GET['word'];
$query = "SELECT INFORMATION from WhiteList where SOURCE LIKE '%$word%' ";
//$query = "SELECT text from TEST where SOURCE CONTAINS '$word' ";
$result = $connexion -> query($query);
while($row = mysqli_fetch_assoc($result)){
	$product[] = array_map('utf8_encode',$row);
}
if (!empty($product)){
	echo json_encode($product);
}
else{
	echo json_encode (json_decode ("{}"));
}
$connexion->close();
 ?>

