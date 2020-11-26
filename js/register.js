var box2=document.querySelector('.box2')
var user=box2.querySelector('input[name="user"]')
var pass=box2.querySelector('input[name="pass"]')
var phone=box2.querySelector('input[name="phone"]')
var zhuce=box2.querySelector('input[type="submit"]')
var check=box2.querySelector('input[type="checkbox"]')
var i1=box2.querySelectorAll('i')[0]
var i2=box2.querySelectorAll('i')[1]
var i3=box2.querySelectorAll('i')[2]
var i4=box2.querySelectorAll('i')[3]
user.onblur=function(){
	let reg=/^[a-zA-Z0-9]{6,10}$/
	if(user.value){
		if(!reg.test(this.value)){
			i1.innerText='用户名不符合规则'
		}else{
			let aaa=new promiseAjax({
				url:'../php/login.php',
				type:'post',
				data:`name=${user.value}`
			})
			aaa.then(function(v){
				if(v==1){
					i1.innerText='该用户名被占用，请重新输入'
					user.focus()
					user.value=''
				}else if(v==0){
					i1.innerText='该用户名可用√'
				}
			})
		}
	}
	
}
phone.onblur=function(){
	let reg=/^1[3456789]\d{9}$/
	if(phone.value){
		if(!reg.test(this.value)){
			i2.innerText='手机号不符合规则'
		}else{
			i2.innerText='手机号符合规则'
		}
	}
	
}
pass.onblur=function(){
	let reg=/^[a-zA-Z0-9]{6,10}$/
	if(pass.value){
		if(!reg.test(this.value)){
			i3.innerText='密码不符合规则'
		}else{
			i3.innerText='密码符合规则'
		}
	}
	
}
zhuce.onclick=function(){
	if(!user.value){
		i1.innerText='请输入要注册的用户名'
		user.focus()
		return
	}
	if(!phone.value){
		i2.innerText='请输入手机号'
		phone.focus()
		return
	}
	if(!pass.value){
		i3.innerText='请设置密码'
		pass.focus()
		return
	}
	if(check.checked==false){
		i4.innerText='请仔细阅读协议并勾选'
		return
	}else{
		i4.innerText=''
		let aaa=new promiseAjax({
						url:'../php/register.php',
						type:'post',
						data:`name=${user.value}&phone=${phone.value}&pass=${pass.value}`
					})
		aaa.then(function(v){
			if(v==1){
				abc()
				alert('您注册成功了，赶快去登陆吧！！！')
			}else{
				abc()
				alert('服务器故障，注册失败')
			}
		})
	}
}
function abc(){
	user.value=''
	phone.value=''
	pass.value=''
	check.checked=false
	i1.innerText=''
	i2.innerText=''
	i3.innerText=''
	i4.innerText=''
}
check.onchange=function(){
	if(check.checked){
		zhuce.style.backgroundColor='#3f89ec'
		i4.innerText=''
	}else{
		zhuce.style.backgroundColor='#becdfc'
		i4.innerText='请仔细阅读协议并勾选'
	}
}
