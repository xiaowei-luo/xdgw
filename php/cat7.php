<?php
include './link.php';
$name=$_POST['name'];
$sql1="select car_number from car where car_name='$name'";
$result1=mysqli_query($link,$sql1);
$m=mysqli_fetch_row($result1)[0];
echo $m;
mysqli_close($link);
?>