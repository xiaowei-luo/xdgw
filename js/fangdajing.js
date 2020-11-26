class Fangdajing{
	constructor(ele){
		this.ele=ele
		this.leftBox=this.ele.querySelector('.fangdaleft-t')
		this.leftImg=this.leftBox.children[0]
		this.mask=this.leftBox.children[1]
		this.rightBox=this.ele.querySelector('.fangda-ke')
		this.rightImg=this.rightBox.children[0]
		this.changeBox=this.ele.querySelector('.fangdaleft-b2')
		this.changeImgs=this.changeBox.children
		this.autoMain()
	}
	
	autoMain(){
		var _this=this
		var index1=0
		for(let i=0;i<_this.changeImgs.length;i++){
			_this.changeImgs[i].onclick=function(){
				_this.changeImgs[index1].className=''
				this.className='fangdaleft-b-img'
				index1=i
				_this.leftImg.src=this.src
				_this.rightImg.src=this.src
			}
		}
		_this.leftBox.onmouseover=function(e){
			var e=e||window.event
			_this.rightBox.style.display='block'
			_this.mask.style.opacity='0.3'
			//获取leftBox和鼠标分别相对于页面的位置,以及leftBox的左上边框
			var boxX=this.offsetLeft+_this.ele.offsetLeft+_this.ele.clientLeft
			var boxY=this.offsetTop+_this.ele.offsetTop+_this.ele.clientTop
			
			var mouseX=e.pageX
			var mouseY=e.pageY
			var borderX=this.clientLeft
			var borderY=this.clientTop
			//相减获得一个鼠标再leftBox中的相对位置
			var x=mouseX-boxX-borderX
			var y=Number(mouseY-boxY-borderY)-60
			
			//减去mask宽度一半得到一个margin值
			var xx=x-(parseFloat(_this.getStyle(this.children[1],'width'))/2)
			var yy=y-(parseFloat(_this.getStyle(this.children[1],'height'))/2)
			//获取mask边界值
			var minX=0
			var minY=0
			var maxX=_this.leftBox.clientWidth-_this.leftBox.children[1].offsetWidth
			var maxY=_this.leftBox.clientHeight-_this.leftBox.children[1].offsetHeight
			if(xx<minX){
				this.children[1].style.left=minX+'px'
				_this.rightImg.style.marginLeft=minX+'px'
			}else if(xx>maxX){
				this.children[1].style.left=maxX+'px'
				_this.rightImg.style.marginLeft=maxX+'px'
			}else{
				this.children[1].style.left=xx+'px'
				_this.rightImg.style.marginLeft=-xx*2+'px'
			}
			if(yy<minY){
				this.children[1].style.top=minY+'px'
				_this.rightImg.style.marginTop=-minY*2+'px'
			}else if(yy>maxY){
				this.children[1].style.top=maxY+'px'
				_this.rightImg.style.marginTop=-maxY*2+'px'
			}else{
				this.children[1].style.top=yy+'px'
				_this.rightImg.style.marginTop=-yy*2+'px'
			}
			
		}
		_this.leftBox.onmousemove=function(e){
			var e=e||window.event
			//获取leftBox和鼠标分别相对于页面的位置,以及leftBox的左上边框
			var boxX=this.offsetLeft+_this.ele.offsetLeft+_this.ele.clientLeft
			var boxY=this.offsetTop+_this.ele.offsetTop+_this.ele.clientTop
			var mouseX=e.pageX
			var mouseY=e.pageY
			var borderX=this.clientLeft
			var borderY=this.clientTop
			//相减获得一个鼠标再leftBox中的相对位置
			var x=mouseX-boxX-borderX
			var y=mouseY-boxY-borderY
			//减去mask宽度一半得到一个margin值
			var xx=x-(parseFloat(_this.getStyle(this.children[1],'width'))/2)
			var yy=y-(parseFloat(_this.getStyle(this.children[1],'height'))/2)-60
			//获取mask边界值
			var minX=0
			var minY=0
			var maxX=_this.leftBox.clientWidth-_this.leftBox.children[1].offsetWidth
			var maxY=_this.leftBox.clientHeight-_this.leftBox.children[1].offsetHeight
			if(xx<minX){
				this.children[1].style.left=minX+'px'
				_this.rightImg.style.marginLeft=minX+'px'
			}else if(xx>maxX){
				this.children[1].style.left=maxX+'px'
				_this.rightImg.style.marginLeft=-maxX*2+'px'
			}else{
				this.children[1].style.left=xx+'px'
				_this.rightImg.style.marginLeft=-xx*2+'px'
			}
			if(yy<minY){
				this.children[1].style.top=minY+'px'
				_this.rightImg.style.marginTop=-minY*2+'px'
			}else if(yy>maxY){
				this.children[1].style.top=maxY+'px'
				_this.rightImg.style.marginTop=-maxY*2+'px'
			}else{
				this.children[1].style.top=yy+'px'
				_this.rightImg.style.marginTop=-yy*2+'px'
			}
		}
		_this.leftBox.onmouseout=function(){
			_this.rightBox.style.display='none'
			_this.leftBox.children[1].style.opacity=0
		}
	}
	getStyle(ele,attrName){
		return window.getComputedStyle(ele)[attrName]||ele.currentStyle[attrName]
	}
}

	

