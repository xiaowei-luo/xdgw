<?php
include './link.php';
$name=$_POST['name'];
$phone=$_POST['phone'];
$pass=$_POST['pass'];
$bbb=rand(100000,1000000000);
$uid="u$bbb";
$sql1="insert into user values('$name','$pass','$phone','$uid')";
$resule1=mysqli_query($link,$sql1);
$sql2="select * from user where name='$name'";
$resule2=mysqli_query($link,$sql2);
if($row1=mysqli_fetch_assoc($resule2)){
	echo 1;
}else{
	echo 0;
};
mysqli_close($link);
?>