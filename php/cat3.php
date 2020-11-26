<?php
include './link.php';
$arr2=[];
for($i=0;$i<count($_POST['car']);$i++){
	$car_id=$_POST['car'][$i];
	$sql2="select * from car where car_id='$car_id'";
	$result2=mysqli_query($link,$sql2);
	$result3=mysqli_query($link,$sql2);
	while($row3=mysqli_fetch_assoc($result3)){
			array_push($arr2,$row3);
	};
};		
if($row2=mysqli_fetch_assoc($result2)){
	echo json_encode($arr2);	
}else{
	echo 1;
};

mysqli_close($link);
?>