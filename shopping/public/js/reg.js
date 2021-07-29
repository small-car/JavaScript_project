var _back = document.getElementsByClassName('back')
var van_switch = document.getElementsByClassName('van-switch')
var switch_node = document.getElementsByClassName('van-switch_node')
var code_input = document.getElementsByTagName('input')[0]
var phone_input = document.getElementsByTagName('input')[1]
var code_input = document.getElementsByTagName('input')[2]
var password_input = document.getElementsByTagName('input')[3]
var code_btn = document.getElementById('code-btn')
var vcode = document.getElementsByClassName('vcode-img')
var code = vcode[0].getElementsByTagName('img')
var flag = !flag
var random = parseInt(Math.random() * 100000000)
_back[0].onclick = function () {
	window.location.href = 'javascript:history.go(-1)'
}
vcode[0].onclick = function () {
	random += parseInt(Math.random() * 10)
	var _code =
		'http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&random=' +
		random
	code[0].src = _code
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
phone_input.addEventListener('keyup', function (e) {
	if (phone_input.value.length == 11) {
		code_btn.classList.add('success')
		var code_time = 10
		code_btn.addEventListener('click', function (e) {
			function settime(obj) {}
		})
	} else {
		code_btn.classList.remove('success')
	}
})
