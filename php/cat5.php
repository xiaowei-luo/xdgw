<?php
include './link.php';
$num=$_POST['num'];
$name=$POST['name'];
$user=$POST['user'];
$sql1="update cat set car_num='$num' where car_name='$name' and username='$user'";
mysqli_query($link,$sql1);
mysqli_close($link);
?>