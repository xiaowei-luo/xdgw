<?php
include './link.php';
$nameaa=$_POST['nameaa'];
$sql1="select car_name from car where car_name='$nameaa'";
$result1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($result1)){
	echo 1;
}else{
	echo 0;
};
mysqli_close($link);
?>