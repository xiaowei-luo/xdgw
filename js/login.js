var deng=document.querySelector('.deng')
var user=deng.querySelector('input[name="user"]')
var pass=deng.querySelector('input[name="pass"]')
var login=deng.querySelector('input[type="button"]')
var i1=deng.querySelectorAll('i')[0]
var i2=deng.querySelectorAll('i')[1]
user.focus()
user.onblur=function(){
	let aaa=new promiseAjax({
		url:'../php/login.php',
		type:'post',
		data:`name=${user.value}`
	})
	aaa.then(function(v){
		if(v==0){
			if(user.value){
				i1.innerText='用户不存在'
				user.focus()
				user.value=''
			}
			
		}else if(v==1){
			i1.innerText='用户存在通过√'
			pass.onblur=function(){
				i2.innerText=''
				login.onclick=function(){
					let aaa=new promiseAjax({
						url:'../php/login1.php',
						type:'post',
						data:`name=${user.value}&pass=${pass.value}`
					})
					aaa.then(function(v){
						if(v==0){
							i2.innerText='密码不正确'
							pass.focus()
							pass.value=''
						}else if(v==1){
							setCookie('user',user.value,2000)
							$.ajax({
								type:"post",
								url:"../php/login3.php",
								async:true,
								data:{name:user.value},
								success(res){
									let userId=JSON.parse(res)
									console.log(userId)
									setCookie('uid',userId.uid,2000)
									location.href='list.html'
								}
							})
							
						}
					})
					
					
				}
			}
			
			
			
		}
	})
}
