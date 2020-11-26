//图片轮播
var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,
	loop : true,
	pagination: {
    	 el: '.swiper-pagination',
    	 clickable :true,
  	},
  	 navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
})
//图片轮播结束（插件就是好用）
//热卖推荐js开始
var remaidata
getRemai(2,28)
$('.remaiul ul li').click(function(){
	var remaiulli1=28
	var remaiulli2=178
	var remaiulli3=378
	var remaiulli4=578
	var remaiulli5=710
	$('.remaiul ul li h1').removeClass('remaiulh1')
	$(this).children().first().prop('class','remaiulh1')
	$('.remaibottom').html('')
	if($(this).children().first().text()=='小度家族'){
		getRemai(2,28)
	}else if($(this).children().first().text()=='智能硬件'){
		getRemai(remaiulli1,remaiulli2)
		
	}else if($(this).children().first().text()=='品质生活'){
		getRemai(remaiulli2,remaiulli3)
	}else if($(this).children().first().text()=='母婴玩具'){
		getRemai(remaiulli3,remaiulli4)
	}else if($(this).children().first().text()=='精选商品'){
		getRemai(remaiulli4,remaiulli5)
	}
	
})

$('body').delegate('.listshopsout>a','click',function(){
	let nameA=$(this).children().children().first().next().children().first().text()
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
$('body').delegate('.listshops-div>a','click',function(){
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
function getRemai(a,b){
	$.ajax({
		type:"post",
		url:"../php/list.php",
		async:true,
		data:{kaishi:a,jieshu:b},
		success(res){
			remaidata=JSON.parse(res)
			for(let index in remaidata){
				$('.remaibottom').append(`
					
					<div class="remaia">
						<img src="${remaidata[index].car_imghref}"/>
						<h1>${remaidata[index].car_name}</h1>
						<h2>${remaidata[index].car_jieshao}</h2>
						<h3>${remaidata[index].car_price}</h3>
						<h4>${remaidata[index].car_manyidu}</h4>
						<h5>
							<p>${remaidata[index].car_comment}</p>
							<i>${remaidata[index].car_user}</i>
						</h5>
						<h6>小度</h6>
					</div>
				`)
			}
		}
	})
	
}
