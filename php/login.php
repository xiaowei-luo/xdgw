<?php
include './link.php';
$name=$_POST['name'];
$sql1="select * from user where name='$name'";
$resule1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($resule1)){
	echo 1;
}else{
	echo 0;
};
mysqli_close($link);
?>