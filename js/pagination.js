/*定时器js*/
function daojishi(){
            //获取当前时间
            var dt1=new Date()
            //设置结束时间
            var dt2=new Date('2021,8,7 00:00:00')
            //计算时间差
            var t1=parseInt((dt2-dt1)/1000)
            //剩下的天数
            var day=Math.floor(t1/(60*60*24))
            //时
            var hh=parseInt((t1-day*60*60*24)/3600)
            //判断小时是否小于10
            if(hh<10){
                hh='0'+hh
            }
            //分
            var mm=parseInt((t1-day*60*60*24-hh*3600)/60)
            if(mm<10){
                mm='0'+mm
            }
            //秒
            var ss=t1-day*60*60*24-hh*3600-mm*60
            if(ss<10){
                ss='0'+ss
            }
            $('.jishidao span:eq(5)').text(hh)
            $('.jishidao span:eq(7)').text(mm)
            $('.jishidao span:eq(9)').text(ss)
        }
        //添加定时器，让fn1函数每间隔一秒钟执行一次
setInterval(daojishi,1000)

/*分页器*/
$.ajax({
    type:"post",
    url:"../php/pagination.php",
    async:true,
    data:{num11:0},
    success(res){
        let data2=JSON.parse(res)
        createPage(data2)
    }
})
 $('.m-style').pagination({
 			totalData: 700,
 			showData: 20,
            pageCount: 35,
            current:1,
            prevCls: 'prev',
            nextCls: 'next',
            prevContent: '上一页',
            nextContent: '下一页',
            activeCls: 'active',
            coping: true,
            isHide: false,
            homePage: '首页',
            endPage: '末页',
            keepShowPN: true,
            count: 3,
            jump: true,
            jumpIptCls: 'jump-ipt',	
			jumpBtnCls: 'jump-btn',	
			jumpBtn: '跳转',
            callback: function(api){
                let numPage=(api.getCurrent()-1)*20
                $.ajax({
                	type:"post",
                	url:"../php/pagination.php",
                	async:true,
                	data:{num11:numPage},
                	success(res){
                		let data2=JSON.parse(res)
                		createPage(data2)
                	}
                })
            }
})
function createPage(data){
	if(data){
		$('.fengyepage').html('')
		for(let index in data){
			$('.fengyepage').append($(`
			
				<div class="fpbox">
					<div class="fpbox-left">
						<img src="${data[index].car_imghref}"/>
					</div>
					<div class="fpbox-right">
						<h1>${data[index].car_name}</h1>
						<h2>${data[index].car_jieshao}</h2>
						<i>限量100个</i>
						<h4>${data[index].car_price}</h4>
						<div class="jindubox2">
							<div class="jindubox">
								<div class="jinduson"></div>
							</div>
							<div class="jinduyishou">已售<span>60</span>%</div>
						</div>
						<div class="fpqiang">立即抢购</div>
					</div>
				</div>
			
			`))
			$('.jinduson:eq('+index+')').css('width',(100-data[index].car_number)+'px')
			$('.jinduyishou span:eq('+index+')').text(100-data[index].car_number)
		}
		
		$('.fpbox').click(function(){
			setCookie('nameaa',$(this).children().first().next().children().first().text(),2000)
			window.location.href='../html/show.html'
		})
	}
}

