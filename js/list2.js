var dsq1
//获取页面向上滚动的距离
var ttt1
window.onscroll=function(){
	var tttt1=$('.headout').css('margin-left')
	ttt1=$(window).scrollTop()
	if($(window).scrollTop()>110){
		$('.headout2').css({
			position:'fixed',
			top:'0px',
			left:tttt1
		})
		$('.retop').css('display','block')
	}else{
		$('.headout2').css({
			position:'relative',
			top:'0px',
			left:'0px'
		})
		$('.retop').css('display','none')
	}
}
$('.retop').click(function(){
	dsq1=setInterval(function(){
		//创建每次要走的步长
		let speed=Math.ceil(ttt1/10)
		//把计算之后的距离值赋给文档对象
		$(window).scrollTop(ttt1-speed)
		if(ttt1<=0){
			clearInterval(dsq1)
		}
	},50)
})
