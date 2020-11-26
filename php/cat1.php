<?php
/*连接数据库*/
include './link.php';
/*得到前端传递的用户名，并在user表中查询，并且与uid安全码比较，如果有这个名字，安全码比较成功，我们才做下一步操作*/
$username=$_POST['username'];
$uid=$_POST['uid'];
$sql1="select * from user where name='$username' and uid='$uid'";
$result1=mysqli_query($link,$sql1);
if($row1=mysqli_fetch_assoc($result1)){
	/*好了，现在我们用户名是存在的，那么进行下一步操作，*/
	/*获取下离线商品id和数量，并通过id从car表种获取相关数据，通过id和cat中id比较，有就换数量，么有就整个加进去*/
	for($i=0;$i<count($_POST['car']);$i++){
		$car_id=trim(json_encode($_POST['car'][$i][0]),'"');
		$car_num=trim(json_encode($_POST['car'][$i][1]),'"');
		/*查询cat表，有该id，把数量替换，没有的话，获取必要信息，添加进去*/
		$sql3="select * from cat where car_id='$car_id' and username='$username'";
		$result3=mysqli_query($link,$sql3);
		if($row3=mysqli_fetch_assoc($result3)){
			$sql4="update cat set car_num='$car_num' where car_id='$car_id' and username='$username'";
			mysqli_query($link,$sql4);
		}else{
			$sql2="select * from car where car_id='$car_id'";
			$result2=mysqli_query($link,$sql2);
			/*把必要信息添加到cat表中*/
			if($row2=mysqli_fetch_assoc($result2)){
				$car_id2=$row2['car_id'];
				$car_imghref=$row2['car_imghref'];
				$car_name=$row2['car_name'];
				$car_price=$row2['car_price'];
				$car_select=$row2['car_select'];
				$sql5="insert into cat(username,car_id,car_imghref,car_name,car_price,car_select,car_num) values('$username','$car_id2','$car_imghref','$car_name','$car_price','$car_select','$car_num')";
				mysqli_query($link,$sql5);
			};
		};	
	};
	$sql6="select * from cat where username='$username'";
	$result4=mysqli_query($link,$sql6);
	$arr2=[];
	while($row4=mysqli_fetch_assoc($result4)){
		array_push($arr2,$row4);
	};
	if(count($arr2)>0){
		echo json_encode($arr2);
	}else{
		echo 1;
	};
	
}else{
	echo 0;
};
	



mysqli_close($link);
?>