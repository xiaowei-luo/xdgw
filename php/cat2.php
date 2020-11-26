<?php
include './link.php';
$username=$_POST['username'];
$uid=$_POST['uid'];
$sql1="select * from user where name='$username' and uid='$uid'";
$result1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($result1)){
	$sql6="select * from cat where username='$username'";
	$result4=mysqli_query($link,$sql6);
	$result5=mysqli_query($link,$sql6);
	$arr2=[];
	while($row5=mysqli_fetch_assoc($result5)){
			array_push($arr2,$row5);
	};
	if($row4=mysqli_fetch_assoc($result4)){
		
		echo json_encode($arr2);
		
	}else{
		echo 1;
	};
}else{
	echo 0;
};
mysqli_close($link);
?>