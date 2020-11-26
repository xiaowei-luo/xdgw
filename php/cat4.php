<?php
include './link.php';
$name=$_POST['name'];
$user=$_POST['user'];
$sql1="delete from cat where car_name='$name' and username='$user'";
mysqli_query($link,$sql1);
mysqli_close($link);
?>