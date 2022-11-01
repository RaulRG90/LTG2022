<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

//recibe valores externo en formato json
$data = file_get_contents('php://input');

if(!$data){
  echo "No hay datos";
}else{
  //conversion a array
  $data = json_decode($data, true);
  //asignacion de datos en variables
  $id_contenido = $data['id_contenido'];
  $tipo = $data['tipo'];




  include 'conecta.php';
    $q = "INSERT INTO registro (id_contenido, tipo) VALUES ('$id_contenido','$tipo');";
    $conn	=	conecta_bd();
    $result = mysqli_query($conn,$q);
    desconectar_bd($conn);


}
	

?>