var _nickname = document.querySelector('.nickname')
var _btn = document.querySelector('.btn')
var _home = document.querySelector('.home')
var _cart = document.querySelector('.cart')
var overlay = document.querySelector('.van-overlay')
var dialog = document.querySelector('.van-dialog')
var van_button = document.querySelectorAll('.van-button__text')
var status = localStorage.getItem('user_status')
var cellphone = localStorage.getItem('cellphone')
var password = localStorage.getItem('password')
_home.onclick = function () {
	window.location.href = '../html/index.html'
}
_cart.onclick = function () {
	window.location.href = '../html/cart.html'
}
if (status == 1) {
	_btn.innerHTML = '安全退出'
	axios
		.post(
			'http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f',
			'cellphone=' + cellphone + '&' + 'password=' + password
		)
		.then((res) => {
			_nickname.innerHTML = res.data.data.nickname
		})
	_btn.onclick = function () {
		overlay.style.display = ''
		dialog.style.display = ''
		van_button[0].onclick = function () {
			overlay.style.display = 'none'
			dialog.style.display = 'none'
		}
		van_button[1].onclick = function () {
			localStorage.removeItem('user_status')
			localStorage.removeItem('cellphone')
			localStorage.removeItem('password')
			window.location.reload()
		}
	}
} else {
	_nickname.innerHTML = '昵称'
	_btn.innerHTML = '登录/注册'
	_btn.onclick = function () {
		window.location.href = '../html/login.html'
	}
}
