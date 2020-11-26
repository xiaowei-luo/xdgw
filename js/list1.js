var aaa=getCookie('user')
if(aaa){
	$('.headright').html(`<a href="cat.html"><span class="iconfont">&#xe64f;</span>购物车</a>
						<div class="username"><i>${aaa}</i>
						<ol class="ol1">
							<li><a href="#">我的订单</a></li>
							<li><a href="#">我的福利</a></li>
							<li><a href="#">收货地址</a></li>
							<li><a href="#">售后服务</a></li>
							<li><a href="#">DU码通道</a></li>
							<li class='tui'><a href="#">退出</a></li>
						</ol>
					</div>
	`)
	$('.username').on('mouseover',function(){
		$('.ol1').css('display','block')
	})
	$('.username').on('mouseout',function(){
		$('.ol1').css('display','none')
	})
	$('.tui').click(function(){
		deleteCookie('user')
		deleteCookie('uid')
		location.reload()
	})
}else{
	$('.headright').html(`
		<a href="cat.html"><span class="iconfont">&#xe64f;</span>购物车</a>
		<a href="login.html">登录</a>
		<a href="register.html">注册</a>	
	`)
}
$('.fix a:nth-of-type(4)').on('mouseover',function(){
	$('.fix a:nth-of-type(4) span').css('display','none')
	$('.fix a:nth-of-type(4) i').css('display','block')
})
$('.fix a:nth-of-type(4)').on('mouseout',function(){
	$('.fix a:nth-of-type(4) span').css('display','block')
	$('.fix a:nth-of-type(4) i').css('display','none')
})
$('.retop').on('mouseover',function(){
	$('.retop span').css('display','none')
	$('.retop i').css('display','block')
})
$('.retop').on('mouseout',function(){
	$('.retop span').css('display','block')
	$('.retop i').css('display','none')
})
var num=new Array()
var num2=new Array()
var jsonname=new Array()
var index2
$('.dada').on('mouseout',function(){
	$('.head2shopout').css('display','none')
})
$('.dada').on('mouseover',function(){
	$('.head2shopout').css('display','block')
	$('.head2shopul').css('margin-left','0px')
	$('.head2shopleft').css('color','rgb(221, 221, 221)')
	$('.head2shopul').html('')
	let $that=$(this)
	let imgsrc1,shopname1,shopprice1
	$.ajax({
		url:"../js/sanji.json",
		type:'post',
		async:true,
		success:function(data){
			for(let index in data){
				if(num.length<3){
					jsonname.push(data[index].name)
					num.push(data[index].shop.length-5)
					num2.push(data[index].shop.length-5)
				}
				if($that.text()==data[index].name){
					index2=index
					$('.head2shopul').css('width',data[index].shop.length*220+'px')
					if(data[index].shop.length>5){
						$('.head2shopbutton').css('display','block')
						$('.head2shopright').css('color','rgb(51, 51, 51)')
					}else{
						$('.head2shopbutton').css('display','none')
					}
					for(let i=0;i<data[index].shop.length;i++){
					 	imgsrc1=data[index].shop[i].imgsrc
					 	shopname1=data[index].shop[i].shopname
					 	shopprice1=data[index].shop[i].shopprice
					 	$('.head2shopul').append(`
					 			<li>
									<a href="#" class="remaia">
										<img src="${imgsrc1}"/>
										<h1>${shopname1}</h1>
										<h2>￥<span>${shopprice1}</span></h2>
									</a>
								</li>
					 	`)
					 }
					
				}	
			}	
		}
	})
})
let num3,num4
let abc=0	
$('.head2shopout').on('mouseleave',function(){
	$('.head2shopout').css('display','none')
})
$('.head2shopout').on('mouseenter',function(){
	$('.head2shopout').css('display','block')
	let bbc
	abc=0
	for(let i=0;i<jsonname.length;i++){
		if($('.sanji li:eq('+i+')').text()==jsonname[index2]){
			bbc=i
		}
	}
	
	num3=num[bbc]	
	num4=num2[bbc]
})	
$('.head2shopleft').click(tiaoLeft)
$('.head2shopright').click(tiaoRight)				
function tiaoRight(){
	if(num3>0&&num3<=num4){
		abc-=220
		$('.head2shopul').css('margin-left',abc+'px')
		$('.head2shopleft').css('color','rgb(51, 51, 51)')
		num3--
		if(num3==0){
			$('.head2shopright').css('color','rgb(221, 221, 221)')
		}
	}
}
function tiaoLeft(){
	if(num3<num4&&num3>=0){
		abc+=220
		$('.head2shopul').css('margin-left',abc+'px')
		$('.head2shopright').css('color','rgb(51, 51, 51)')
		num3++
		if(num3==num4){
			$('.head2shopleft').css('color','rgb(221, 221, 221)')
		}
	}
}
$('body').delegate('.remaia','click',function(){
	let nameA=$(this).children().first().next().text() 
	$.ajax({
		type:"post",
		url:"../php/list2.php",
		async:true,
		data:{nameaa:nameA},
		success(res){
			if(res==1){
				setCookie('nameaa',nameA,2000)
				window.location.href='show.html'
			}
		}
	})
	
})