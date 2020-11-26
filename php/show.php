<?php
include './link.php';
$nameaa=$_POST['nameaa'];
$sql1="select * from car where car_name='$nameaa'";
$result1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($result1)){
	echo json_encode($row1);
}else{
	echo 0;
};
mysqli_close($link);
?>