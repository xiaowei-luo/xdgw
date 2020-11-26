<?php
include './link.php';
$num11=$_POST['num11'];
$sql1="select * from car limit $num11";
$result1=mysqli_query($link,$sql1);
$ar1=[];
while($row=mysqli_fetch_assoc($result1)){
	array_push($ar1,$row);
}
echo json_encode($ar1);






mysqli_close($link);
?>