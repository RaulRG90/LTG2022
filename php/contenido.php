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
  $escenario = $data['escenario'];
  $grado = $data['grado'];




  include 'conecta.php';
    $q = "SELECT id_contenido,titulo_libro, archivo,num_pag, id_campo FROM `contenido` 
    INNER JOIN escenario ON contenido.id_escenario = escenario.id_escenario 
    WHERE abreviatura = '$escenario' AND grado = $grado AND activo = 1;";

  
  $conn	=	conecta_bd();
  if ($result = mysqli_query($conn,$q)) {
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $myArray[] = $row;
    }
  }

  desconectar_bd($conn);

  $jsonencoded = json_encode($myArray,JSON_UNESCAPED_UNICODE);
  $data = str_replace("\\/", "/", $jsonencoded);
  echo $data;
}
	

?>