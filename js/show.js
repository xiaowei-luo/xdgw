var localinNameaa=getCookie('nameaa')
if(localinNameaa){
	$('.localin-span').text(localinNameaa)
	$.ajax({
		type:"post",
		url:"../php/show.php",
		async:true,
		data:{nameaa:localinNameaa},
		success(res){
			createFdj(res)
		}
	})
}
function createFdj(data){
	let data1=JSON.parse(data)
	$('.fangda').html('')
	$('.fangda').html(`
		
				<div class="fangdaleft">
					<div class="fangdaleft-t">
						<img src="${data1.car_imghref}"/>
						<div></div>
					</div>
					<div class="fangdaleft-b">
						<div class="fangdaleft-b2">
							<img src="${data1.car_imghref}" class="fangdaleft-b-img"/>
							<img src="https://product-online.cdn.bcebos.com/1589382712972652.png?x-bce-process=image/quality,q_80/format,f_auto/interlace,i_progressive"/>
							<img src="https://product-online.cdn.bcebos.com/1588765604659697.png?x-bce-process=image/quality,q_80/format,f_auto/interlace,i_progressive"/>
							<img src="https://product-online.cdn.bcebos.com/1587545602424601.jpg?x-bce-process=image/quality,q_80/format,f_auto/interlace,i_progressive"/>
							<img src="https://product-online.cdn.bcebos.com/1587545602119070.jpg?x-bce-process=image/quality,q_80/format,f_auto/interlace,i_progressive"/>						
						</div>
					</div>
					<div class="fangdaleft-b-left">&lt</div>
					<div class="fangdaleft-b-right">&gt</div>
				</div>
				<div class="fangdaright">
					<h1>${data1.car_name}</h1>
					<h2>${data1.car_jieshao}</h2>
					<h3>${data1.car_manyidu}</h3>
					<div class="fangdaright-p">
						<h4>${data1.car_price}</h4>
						<h5>
							<span>领卷</span>
							<i>满1000减250</i>
							<a>点击领取</a>
						</h5>
						<h5>
							<span>促销</span>
							<span>包邮秒杀</span>
							<span>9月30日限时秒杀</span>
						</h5>
						<h6>
							<span>服务</span>
							<span>7天无理由退货,小度商城售后</span>
						</h6>
						<h6>
							<span>发货</span>
							<span>预计10月1日发货</span>
						</h6>
					</div>
					<div class="fangdaright-kucun">
						<span>当前库存</span>
						<i>${data1.car_number}</i>
						<u>件</u>
					</div>
					<div class="fangdaright-num">
						<span>选择数量:</span>
						<span>-</span><input type="text" value="1"/><span>+</span>
					</div>
					<div class="fangdaright-btn">
						<div class="fangdaright-btn-car">
							加入购物车
						</div>
						<div class="fangdaright-btn-buy">
							立即购买
						</div>
					</div>
				</div>
				<div class="fangda-ke">
					<img src="${data1.car_imghref}"/>
				</div>
		
	`)
	
	
	var infoBox=document.querySelector('.fangda')
	new Fangdajing(infoBox)
	let fangdaleftboff=1
	$('.fangdaleft-b-right').click(function(){
		if(fangdaleftboff==1){
			$(this).css({
				fontWeight:"normol",
				border:"1px solid darkgray"
			})
			$('.fangdaleft-b-left').css({
				fontWeight:"bold",
				border:"2px solid darkgray"
			})
			$('.fangdaleft-b2').css('margin-left','-80px')
			fangdaleftboff=0
		}
	})
	$('.fangdaleft-b-left').click(function(){
		if(fangdaleftboff==0){
			$(this).css({
				fontWeight:"normol",
				border:"1px solid darkgray"
			})
			$('.fangdaleft-b-right').css({
				fontWeight:"bold",
				border:"2px solid darkgray"
			})
			$('.fangdaleft-b2').css('margin-left','0px')
			fangdaleftboff=1
		}
	})
	$('.fangdaright-num span:nth-of-type(2)').click(function(){
		let _thisnum=parseInt($(this).next()[0].value)
		if(_thisnum>1){
			_thisnum--
			$(this).next()[0].value=_thisnum
			$('.fangdaright-num span:nth-of-type(3)').css('color','#000000')
			if(_thisnum==1){
				$(this).css('color','#cccccc')
			}
		}
	})
	$('.fangdaright-num span:nth-of-type(3)').click(function(){
		
		let _thisnum1=parseInt($(this).prev()[0].value)
		if(_thisnum1<data1.car_number){
			_thisnum1++
			$(this).prev()[0].value=_thisnum1
			$('.fangdaright-num span:nth-of-type(2)').css('color','#000000')
			if(_thisnum1==data1.car_number){
				$(this).css('color','#cccccc')
			}
			
		}
	})
	$('.fangdaright-num input[type="text"]').on('change',function(){
		let reg=/\d/
		if(reg.test($(this)[0].value)){
			if(Math.abs($(this)[0].value)<=data1.car_number){
				$(this)[0].value=Math.ceil(Math.abs($(this)[0].value))
				if($(this)[0].value==0){
					$(this)[0].value=1
				}else if($(this)[0].value==data1.car_number){
					$('.fangdaright-num span:nth-of-type(2)').css('color','#000000')
					$('.fangdaright-num span:nth-of-type(3)').css('color','#cccccc')
				}else if($(this)[0].value==1){
					$('.fangdaright-num span:nth-of-type(2)').css('color','#cccccc')
					$('.fangdaright-num span:nth-of-type(3)').css('color','#000000')
				}else{
					$('.fangdaright-num span:nth-of-type(2)').css('color','#000000')
				}
			}else{
				$(this)[0].value=data1.car_number
				$('.fangdaright-num span:nth-of-type(2)').css('color','#000000')
					$('.fangdaright-num span:nth-of-type(3)').css('color','#cccccc')
			}
			
		}else{
			$(this)[0].value=1
			$('.fangdaright-num span:nth-of-type(2)').css('color','#cccccc')
			$('.fangdaright-num span:nth-of-type(3)').css('color','#000000')
		}
		
	})
	//添加购物车点击事件
	$('.fangdaright-btn-car').click(function(){
		let cardata=getCookie('car')
		let jsondata=JSON.stringify([{
				"id":data1.car_id,
				"nums":$('.fangdaright-num input[type="text"]')[0].value,
				"names":data1.car_name
			}])
		//判断cookie是否存在car,有就修改，没有就添加
		if(data1.car_number>0){
		if(cardata){
			//获取购物车json对象
			let jsondata2=JSON.parse(getCookie('car'))
			//要添加的json对象
			let jsondata3=JSON.parse(jsondata)
			//设置一个合并json对象的判断条件
			let jsonoff=0
			//遍历购物车json对象，如果有和要添加的json对象的id相同的成员，只需要把两者的nums相加
			for(let index in jsondata2){
				if(jsondata2[index].id==jsondata3[0].id){
					jsonoff=1
					if($('.fangdaright-num input[type="text"]')[0].value==data1.car_number){
						jsondata2[index].nums=Number(jsondata3[0].nums)
					}else{
						jsondata2[index].nums=Number(jsondata2[index].nums)+Number(jsondata3[0].nums)
					}
					let jsondata6=JSON.stringify(jsondata2)
					deleteCookie('car')
					setCookie('car',jsondata6,2000)
					window.location.href='cat.html'
				}
				if(index==jsondata2.length-1){
					//如果没有，合并两个json对象，添加到cookie里去
					if(jsonoff==0){
						let jsondata4=[...jsondata2,...jsondata3]
						let jsondata5=JSON.stringify(jsondata4)
						deleteCookie('car')
						setCookie('car',jsondata5,2000)
						window.location.href='cat.html'
					}
				}
			}	
		}else{
			setCookie('car',jsondata,2000)
			window.location.href='cat.html'
		}
		}else{
			alert('该商品卖完了！！看看别的吧')
			location.href='../html/pagination.html'
		}
	})
	//立即购买点击事件
	$('.fangdaright-btn-buy').click(function(){
		let useraa=getCookie('user')
		if(useraa){
			let cardata=getCookie('car')
			let jsondata=JSON.stringify([{
					"id":data1.car_id,
					"nums":$('.fangdaright-num input[type="text"]')[0].value,
					"names":data1.car_name
				}])
			//判断cookie是否存在car,有就修改，没有就添加
			if(data1.car_number>0){
			if(cardata){
				//获取购物车json对象
				let jsondata2=JSON.parse(getCookie('car'))
				//要添加的json对象
				let jsondata3=JSON.parse(jsondata)
				//设置一个合并json对象的判断条件
				let jsonoff=0
				//遍历购物车json对象，如果有和要添加的json对象的id相同的成员，只需要把两者的nums相加
				for(let index in jsondata2){
					if(jsondata2[index].id==jsondata3[0].id){
						jsonoff=1
						if($('.fangdaright-num input[type="text"]')[0].value==data1.car_number){
							jsondata2[index].nums=Number(jsondata3[0].nums)
						}else{
							jsondata2[index].nums=Number(jsondata2[index].nums)+Number(jsondata3[0].nums)
						}
						let jsondata6=JSON.stringify(jsondata2)
						deleteCookie('car')
						setCookie('car',jsondata6,2000)
						window.location.href='cat.html'
					}
					if(index==jsondata2.length-1){
						//如果没有，合并两个json对象，添加到cookie里去
						if(jsonoff==0){
							let jsondata4=[...jsondata2,...jsondata3]
							let jsondata5=JSON.stringify(jsondata4)
							deleteCookie('car')
							setCookie('car',jsondata5,2000)
							window.location.href='cat.html'
						}
					}
				}
			}else{
				setCookie('car',jsondata,2000)
				window.location.href='cat.html'
			}
			}else{
				alert('这个商品卖完了！！！看看别的吧')
				location.href='../html/pagination.html'
			}
		}else{
			alert('请先登录')
			window.location.href='login.html'
		}
	})
}
















/*end*/