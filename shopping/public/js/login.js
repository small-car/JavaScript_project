var _back = document.getElementsByClassName('back')
var van_switch = document.getElementsByClassName('van-switch')
var switch_node = document.getElementsByClassName('van-switch_node')
var password_input = document.getElementsByTagName('input')[1]
var fastreg = document.getElementsByClassName('fastreg-wrap')
var reg = fastreg[0].getElementsByTagName('div')
var sure = document.querySelector('.sure-btn')
var flag = !flag
_back[0].onclick = function () {
	window.location.href = 'javascript:history.go(-1)'
}
van_switch[0].onclick = function () {
	if (flag) {
		van_switch[0].style.backgroundColor = 'rgb(235, 22, 37)'
		switch_node[0].style.transform = ' translateX(1em)'
		password_input.type = 'text'
	} else {
		van_switch[0].removeAttribute('style')
		switch_node[0].style.transform = 'none'
		password_input.type = 'password'
	}
	flag = !flag
}
reg[1].onclick = function () {
	window.location.href = '../html/reg.html'
}
sure.onclick = function () {
	var cellphone = document.querySelectorAll('input')[0].value
	var password = document.querySelectorAll('input')[1].value
	axios
		.post(
			'http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f',
			'cellphone=' + cellphone + '&' + 'password=' + password
		)
		.then((res) => {
			var mes = res.data.status
			if (mes == 0) {
				document.querySelector('.van-toast').style.display = 'block'
				setTimeout(function () {
					document.querySelector('.van-toast').style.display = 'none'
				}, 2000)
			} else {
				localStorage.setItem('user_status', 1)
				localStorage.setItem('cellphone', cellphone)
				localStorage.setItem('password', password)
				window.location.href = 'javascript:history.go(-1)'
			}
		})
}
