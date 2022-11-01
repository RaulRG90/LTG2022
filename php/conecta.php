<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function conecta_bd(){
	$servidor = "192.168.103.20";
	$usuario = "S2.k@Rz";  //usario de la base de datos
	$clave = "Xr24*@z3"; // passwoord de la base de datos
	//$bd = "querylibrosr";
	//$usuario = "tsieteco_dUCKSTE";  //usario de la base de datos
	//$clave = "pc8PN@^MI*"; // passwoord de la base de datos
	$bd = "piloto";

	$conn=mysqli_connect($servidor,$usuario,$clave, $bd);

	if(mysqli_connect_errno()){
		echo mysqli_connect_error();
		exit(0);
	}
	# Seleccion de BD
	return $conn;
}

function getSQL($sql){
	$res;
	$conn	=	conecta_bd();
	$rs = mysqli_query($conn, $sql);
	$array = array();
	if ($rs) {
		$array = array();
		while ($fila = mysqli_fetch_assoc($rs)) {
			$array[] = array_map('utf8_encode', $fila);
		}
		$res = json_encode($array, JSON_NUMERIC_CHECK);
	}else{
		$res = null;
		echo mysqli_error($conn);
	}
	mysqli_close($conn);

	return $res;
}

function putSQL($sql){
	$res;
	$conn	=	conecta_bd();
	$rs = mysqli_query($conn, $sql);
	if ($rs) {
		$array = true;
		$res = json_encode($array, JSON_NUMERIC_CHECK);
	}else{
		$array = false;
		$res = json_encode($array, JSON_NUMERIC_CHECK);
		echo mysqli_error($conn);
	}
	mysqli_close($conn);
	return $res;
}

function getSQL2($sql){
	$res;
	$conn	=	conecta_bd();
	$rs = mysqli_query($conn, $sql);
	$count = mysqli_num_rows($rs);
	$array = array();
	if ($rs) {
		$array = array();
		while ($fila = mysqli_fetch_assoc($rs)) {
			$array[] = array_map('utf8_encode', $fila);
		}
		$res = json_encode($array, JSON_NUMERIC_CHECK);
	}else{
		$res = null;
		echo mysqli_error($conn);
	}
	mysqli_close($conn);
	$data['res']=$res;
	$data['count']=$count;
	return $data;
}

function desconectar_bd($enlace){
	mysqli_close($enlace);
};

?>
