<?php
include './link.php';
$name=$_POST['name'];
$pass=$_POST['pass'];
$sql1="select * from user where name='$name' and pass='$pass'";
$resule1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($resule1)){
	echo 1;
}else{
	echo 0;
};
mysqli_close($link);
?>