<?php
include './link.php';
$name=$_POST['name'];
$num=$_POST['num'];
$sql1="select car_number from car where car_name='$name'";
$result1=mysqli_query($link,$sql1);
$m=mysqli_fetch_row($result1)[0];
$n=$m-$num;
$sql2="update car set car_number=$n where car_name='$name'";
mysqli_query($link,$sql2);
mysqli_close($link);
?>