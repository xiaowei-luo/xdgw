//判断是否登录
var useruu=getCookie('user')
var uiduu=getCookie('uid')
if(useruu){
	let caruu=getCookie('car')
	if(caruu){
		let car1=JSON.parse(getCookie('car'))
		let acar1=new Array()
		for(let index in car1){
			acar1[index]=new Array()
			acar1[index].push(car1[index].id)
			acar1[index].push(car1[index].nums)
		}
		//发起ajax请求,
		$.ajax({
			type:"post",
			url:"../php/cat1.php",
			async:true,
			data:{car:acar1,username:useruu,uid:uiduu},
			success(res){
				if(res==0){
					alert('不要在法律的边缘游走哟！！！，再撞库我就要打110了！！！')
					deleteCookie('user')
					window.location.href='../html/login.html'
				}else if(res==1){
					$('.gouwuche').css('height','400px')
					$('.gouwuche').css('background',' url(../img/cat/kong.png) no-repeat center 30px')
					$('.gouwuche').css('background-size','20%')
					$('.gouwuche').html('')
					$('.gouwuche').html($(`
						<div class="kongkongkong">您的购物车是空的</div>
						<div class="kongkonggo">去逛逛</div>
					`))
					$('.kongkonggo').click(function(){
						window.location.href='../html/list.html'
					})
				}else{
					let cardata=JSON.parse(res)
					console.log(cardata)
					createGwc1(cardata)
				}
			}
		})
	}else{
		//发起ajax请求,
		$.ajax({
			type:"post",
			url:"../php/cat2.php",
			async:true,
			data:{username:useruu,uid:uiduu},
			success(res){
				if(res==0){
					alert('不要在法律的边缘游走哟！！！，再撞库我就要打110了！！！')
					deleteCookie('user')
					window.location.href='../html/login.html'
				}else if(res==1){
					$('.gouwuche').css('height','400px')
					$('.gouwuche').css('background',' url(../img/cat/kong.png) no-repeat center 30px')
					$('.gouwuche').css('background-size','20%')
					$('.gouwuche').html('')
					$('.gouwuche').html($(`
						<div class="kongkongkong">您的购物车是空的</div>
						<div class="kongkonggo">去逛逛</div>
					`))
					$('.kongkonggo').click(function(){
						window.location.href='../html/list.html'
					})
				}else{
					let cardata=JSON.parse(res)
					console.log(cardata)
					createGwc1(cardata)
				}
			}
		})
	}
}else{
	let caruu=getCookie('car')
	if(caruu){
		let car1=JSON.parse(getCookie('car'))
		let acar1=new Array()
		for(let index in car1){
			acar1.push(car1[index].id)
		}
		//发起ajax请求,
		$.ajax({
			type:"post",
			url:"../php/cat3.php",
			async:true,
			data:{car:acar1},
			success(res){
				let cardata=JSON.parse(res)
				console.log(cardata)
				createGwc1(cardata)	
			}
		})
	}else{
		$('.gouwuche').css('height','400px')
		$('.gouwuche').css('background',' url(../img/cat/kong.png) no-repeat center 30px')
		$('.gouwuche').css('background-size','20%')
		$('.gouwuche').html('')
		$('.gouwuche').html($(`
			<div class="kongkongkong">您的购物车是空的</div>
			<div class="kongkonggo">去逛逛</div>
		`))
		$('.kongkonggo').click(function(){
			window.location.href='../html/list.html'
		})
	}
}


//这个函数在有商品cookie，或数据库中有商品或两者都有发挥作用
function createGwc1(data){
	//添加主要固定内容
	$('.gouwuche').html($(`
		<div class="gouwuchehead">
			<div class="quanxuaninput">
				<input type="checkbox"/>
			</div>
			<div class="quanxuan1">全选</div>
			<div class="shangping1">商品</div>
			<div class="danjia1">单价</div>
			<div class="shuliang1">数量</div>
			<div class="xiaoji1">小计</div>
			<div class="caozuo1">操作</div>
		</div>
		<div class="gouwuchebody"></div>
		<div class="gouwuchefoot">
			<div class="spzong">共<span></span>件商品,已选择<span></span>件</div>
			<div class="quxiadan">立即购买</div>
			<div class="spzongjia">总价:<span>￥</span><span></span></div>
		</div>
	`))
	let data33=new Array()
	let data11=getCookie('car')
	let data22
	if(data11){
			data22=JSON.parse(data11)
	}
	for(let index in data){
		data33[index]=new Object()
		data33[index].id=data[index].car_id
		data33[index].nums=data[index].car_num||data[index].nums||data22[index].nums||0
		data33[index].names=data[index].car_name
		let a1=Number(data[index].car_price.substr(1))
		$('.gouwuchebody').append($(`
			<div class="gouwuchelist">
					
				<div class="quanxuaninput">
					<input type="checkbox" checked/>
				</div>
				<div class="quanxuan1">
					<img src="${data[index].car_imghref}"/>
				</div>
				<div class="shangping1">${data[index].car_name}</div>
				<div class="danjia1">${data[index].car_price}</div>
				<div class="shuliang1">
					<span>-</span><input type="text" value="${data[index].car_num||data22[index].nums||data[index].nums||1}"/><span>+</span>
				</div>
				<div class="xiaoji1">
					<span>￥</span>
					<span>${a1*data[index].car_num||a1}</span>
				</div>
				<div class="caozuo1">
					<span>删除</span>
				</div>
				
			</div>
		`))
	}
	let data44=JSON.stringify(data33)
	setCookie('car',data44,2000)
	zongji()
	zongshang()
	xuanshang()
	zdxiaoji()
	jianhao()
	//数量加减功能
	$('.shuliang1 span:nth-of-type(1)').click(function(){
		let qqq=$(this).parent().prev().prev().text()
		let shushu=getnums(qqq)
		let _thisnum=parseInt($(this).next()[0].value)
		if(_thisnum>1){
			_thisnum--
			$(this).next()[0].value=_thisnum
			$(this).next().next().css('color','#000000')
			if(_thisnum==1){
				$(this).css('color','#cccccc')
			}
		}
		let _that=$(this)
		xiaoji(_that)
		zongji()
		zongshang()
		xuanshang()
		xiucookie(_that)
	})
	$('.shuliang1 span:nth-of-type(2)').click(function(){
		let qqq=$(this).parent().prev().prev().text()
		let shushu=getnums(qqq)
		let _thisnum1=parseInt($(this).prev()[0].value)
		if(_thisnum1<shushu){
			_thisnum1++
			$(this).prev()[0].value=_thisnum1
			$(this).prev().prev().css('color','#000000')
			if(_thisnum1==shushu){
				$(this).css('color','#cccccc')
			}
			
		}else{
			$(this).css('color','#cccccc')
		}
		let _that=$(this)
		xiaoji(_that)
		zongji()
		zongshang()
		xuanshang()
		xiucookie(_that)
	})
	$('.shuliang1 input[type="text"]').on('change',function(){
		let qqq=$(this).parent().prev().prev().text()
		let shushu=getnums(qqq)
		let reg=/\d/
		if(reg.test($(this)[0].value)){
			if(Math.abs($(this)[0].value)<=shushu){
				$(this)[0].value=Math.ceil(Math.abs($(this)[0].value))
				if($(this)[0].value==0){
					$(this)[0].value=1
				}else if($(this)[0].value==shushu){
					$(this).prev().css('color','#000000')
					$(this).next().css('color','#cccccc')
				}else if($(this)[0].value==1){
					$(this).prev().css('color','#cccccc')
					$(this).next().css('color','#000000')
				}else{
					$(this).prev().css('color','#000000')
				}
			}else{
				$(this)[0].value=shushu
				$(this).prev().css('color','#000000')
				$(this).next().css('color','#cccccc')
			}
			
		}else{
			$(this)[0].value=1
			$(this).prev().css('color','#cccccc')
			$(this).next().css('color','#000000')
		}
		let _that=$(this)
		xiaoji(_that)
		zongji()
		zongshang()
		xuanshang()
		xiucookie(_that)
	})
	//选择框选中功能
	$('.gouwuchelist .quanxuaninput input').on('change',function(){
		zongji()
		zongshang()
		xuanshang()
		quanxx()
	})
	//删除功能
	$('.gouwuchelist .caozuo1').click(function(){
		if(useruu){
			$(this).parent().remove()
			let data2=$(this).parent().children().first().next().next().text()
			console.log(data2)
			//删除数据库该条数据
			$.ajax({
				type:"post",
				url:"../php/cat4.php",
				async:true,
				data:{name:data2,user:useruu},
				success(res){
					
						let data1=JSON.parse(getCookie('car'))
						for(let index in data1){
							if(data1[index].names==data2){
								data1.splice(index,1)
							}
						}
						deleteCookie('car')
						if(data1.length>=1){
							let data3=JSON.stringify(data1)
							setCookie('car',data3,2000)
						}
						location.reload()
					
				}
			})
			
		}else{
			$(this).parent().remove()
			let data2=$(this).parent().children().first().next().next().text()
			let data1=JSON.parse(getCookie('car'))
			for(let index in data1){
				if(data1[index].names==data2){
					data1.splice(index,1)
				}
			}
			deleteCookie('car')
			if(data1.length>=1){
				let data3=JSON.stringify(data1)
				setCookie('car',data3,2000)
			}
			location.reload()
		}
		
	})
	//全选功能
	$('.gouwuchehead .quanxuaninput input').on('change',function(){
		if($(this)[0].checked){
			for(let i=0;i<$('.gouwuchelist .quanxuaninput input').length;i++){
				$('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked=true
			}
			
		}else{
			for(let i=0;i<$('.gouwuchelist .quanxuaninput input').length;i++){
				$('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked=false
			}
		}
		zongji()
		zongshang()
		xuanshang()
	})
	//购买功能
	$('.quxiadan').click(function(){
		let user=getCookie('user')
		let uid=getCookie('uid')
		if(user){
			/*  1.获取选中商品的car_name和数量
				2.删除本地cookie对应的值
				3.删除cat表中的car_name行
				4.减少car表中对应的num数量
			*/
			let arr1=new Array()
			let cc=0
			for(let i=0;i<$('.gouwuchelist .quanxuaninput input').length;i++){
				arr1[cc]=new Object()
				if($('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked==true){
					let aa=$('.gouwuchelist .quanxuaninput input:eq('+i+')').parent().next().next().text()
					let bb=$('.gouwuchelist .quanxuaninput input:eq('+i+')').parent().next().next().next().next().children().first().next()[0].value
					arr1[cc].names=aa
					arr1[cc].nums=bb
					cc++
				}
			}
			let arr2=JSON.stringify(arr1)
			
			let bdc1=getCookie('car')
			let bdc2=JSON.parse(bdc1)
			for(let index in arr1){
				for(let index2 in bdc2){
					if(arr1[index].names==bdc2[index2].names){
						bdc2.splice(index2,1)
						$.ajax({
							type:"post",
							url:"../php/cat4.php",
							async:true,
							data:{name:arr1[index].names,user:useruu}
						})
						$.ajax({
							type:"post",
							url:"../php/cat6.php",
							async:true,
							data:{name:arr1[index].names,num:arr1[index].nums}
						})
					}
				}
			}
			deleteCookie('car')
			if(bdc2.length>=1){
				let bdc3=JSON.stringify(bdc2)
				setCookie('car',bdc3,2000)
			}
			alert('购买成功！！！')
			location.reload()
			
		}else{
			alert('您还没有登录，请先登录！！！')
			window.location.href='../html/login.html'
		}
	})
	quanxx()
}




function xiaoji(that){
	let pr=Number(that.parent().prev().text().substr(1))
	let shu=Number(that.parent().children().first().next()[0].value)
	that.parent().next().children().first().next().text((pr*shu).toFixed(2))
}
function zongji(){
	let hehehe=0
	let pr,shu
	for(let i=0;i<$('.gouwuchelist .danjia1').length;i++){
		if($('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked){
			pr=Number($('.gouwuchelist .danjia1:eq('+i+')').text().substr(1))
			shu=Number($('.gouwuchelist .danjia1:eq('+i+')').next().children().first().next()[0].value)
			hehehe+=pr*shu
		}
		
	}
	$('.spzongjia span:eq(1)').text(hehehe.toFixed(2))
}
function zongshang(){
	let hehehe=0
	for(let i=0;i<$('.gouwuchelist .shuliang1 input').length;i++){
		hehehe+=Number($('.gouwuchelist .shuliang1 input:eq('+i+')')[0].value)
	}
	$('.spzong span:eq(0)').text(hehehe)
}
function xuanshang(){
	let hehehe=0
	
	for(let i=0;i<$('.gouwuchelist .shuliang1 input').length;i++){
		if($('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked){
			hehehe+=Number($('.gouwuchelist .shuliang1 input:eq('+i+')')[0].value)
		}
	}
	$('.spzong span:eq(1)').text(hehehe)
}
function quanxx(){
	
	let off=0
	for(let i=0;i<$('.gouwuchelist .quanxuaninput input').length;i++){
		if($('.gouwuchelist .quanxuaninput input:eq('+i+')')[0].checked==false){
			off=1
		}
	}
	if(off==0){
		$('.gouwuchehead .quanxuaninput input')[0].checked=true
	}else{
		$('.gouwuchehead .quanxuaninput input')[0].checked=false
	}
}
function xiucookie(that){
	let shu=Number(that.parent().children().first().next()[0].value)
	let nameuu=that.parent().parent().children().first().next().next().text()
	let data33=getCookie('car')
	let data44=JSON.parse(data33)
	for(let index in data44){
		if(data44[index].names==nameuu){
			data44[index].nums=shu
		}
	}
	deleteCookie('car')
	let data55=JSON.stringify(data44)
	setCookie('car',data55,2000)
	$.ajax({
		type:"post",
		url:"../php/cat5.php",
		async:true,
		data:{num:shu,name:nameuu,user:useruu}
	})
}

function zdxiaoji(){
	let aa,bb,cc
	for(let i=0;i<$('.gouwuchelist .xiaoji1').length;i++){
		aa=Number($('.gouwuchelist .xiaoji1:eq('+i+')').prev().prev().text().substr(1))
		bb=Number($('.gouwuchelist .xiaoji1:eq('+i+')').prev().children().first().next()[0].value)
		cc=(aa*bb).toFixed(2)
		$('.gouwuchelist .xiaoji1:eq('+i+')').children().first().next().text(cc)
	}
}
function jianhao(){
	let bb
	for(let i=0;i<$('.gouwuchelist .xiaoji1').length;i++){
		bb=Number($('.gouwuchelist .xiaoji1:eq('+i+')').prev().children().first().next()[0].value)
		if(bb>1){
			$('.gouwuchelist .xiaoji1:eq('+i+')').prev().children().first().css('color','#000000')
		}
		
	}
}

function getnums(name1){
	let aa
	$.ajax({
		type:"post",
		url:"../php/cat7.php",
		async:false,
		data:{name:name1},
		success(res){
			aa=res
		}
	})
	return aa
}






/*end*/
