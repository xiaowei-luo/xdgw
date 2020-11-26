<?php
include './link.php';
$kaishi=$_POST['kaishi'];
$jieshu=$_POST['jieshu'];
$sql1="select * from car where car_id>=$kaishi and car_id<=$jieshu";
$result1=mysqli_query($link,$sql1);
$ar1=[];
while($row=mysqli_fetch_assoc($result1)){
	array_push($ar1,$row);
}
echo json_encode($ar1);

mysqli_close($link);
?>