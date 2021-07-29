var _gid = location.search.split('=')[1]
var _home = document.getElementsByClassName('home')
var _my = document.getElementsByClassName('my')
var cart_list = document.querySelector('.cart-main')
var _spot = document.querySelector('.spot')
var _order = document.querySelector('.orderend-btn')
var mes = localStorage.getItem('goodsVal')
var str = ''

_home[0].onclick = function () {
	window.location.href = '../html/index.html'
}
_my[0].onclick = function () {
	window.location.href = '../html/my.html'
}
mes = JSON.parse(mes)
if (mes.length > 0) {
	for (i = 0; i < mes.length; i++) {
		str += `
    <div class="cart-list">
    <div class="select-btn "></div>
	<div class="image-wrap">
		<div class="image">
			<img
				src="${mes[i].g_img}"
			/>
		</div>
		<div class="del">删除</div>
	</div>
	<div class="goods-wrap">
		<div class="goods-title">${mes[i].g_title}</div>
		<div class="goods-attr">
			<span>颜色：${mes[i].g_color} </span><span>尺寸： ${mes[i].g_size}</span>
		</div>
		<div class="buy-wrap">
			<div class="price">${mes[i].g_price}</div>
			<div class="amount-input-wrap">
				<div class="btn dec">-</div>
				<div class="amount-input">
					<input type="tel" value="${mes[i].g_cont}" />
				</div>
				<div class="btn inc">+</div>
			</div>
		</div>
	</div>
    </div>
    `
	}
	cart_list.innerHTML = `
    <div class="sub-header">
		<div class="back"></div>
		<div class="title">购物车</div>
	</div>
    ${str}
	<div class="orderend-wrap">
		<div class="select-area">
			<div class="select-wrap">
				<div class="select-btn"></div>
				<div class="select-text">全选</div>
			</div>
			<div class="total">
				运费: <span>￥10</span> 合计: <span>￥0</span>
			</div>
		</div>
		<div class="orderend-btn disable">去结算</div>
	</div>
    `
	var _dec = document.querySelectorAll('.dec')
	var _inc = document.querySelectorAll('.inc')
	var _amount = document.querySelectorAll('.amount-input')
	var _back = document.querySelector('.back')
	var _order = document.querySelector('.orderend-btn')
	var _select = document.querySelectorAll('.select-btn')
	var cart_list = document.querySelectorAll('.cart-list')
	var _del = document.querySelectorAll('.del')
	var all_price = 0
	_back.onclick = function () {
		window.location.href = 'details.html?gid=' + _gid
	}
	if (_gid != '') {
		_back.style.display = ''
	} else {
		_back.style.display = 'none'
	}
	//调整数量+删除商品
	for (i = 0; i < cart_list.length; i++) {
		_del[i].index = i
		_dec[i].onclick = function () {
			if (this.parentNode.children[1].children[0].value > 1) {
				this.parentNode.children[1].children[0].value--
			} else {
				this.parentNode.children[1].children[0].value = 1
			}
			sum()
		}
		_inc[i].onclick = function () {
			this.parentNode.children[1].children[0].value++
			sum()
		}
		_del[i].onclick = function () {
			this.parentNode.parentNode.parentNode.removeChild(
				this.parentNode.parentNode
			)
			mes.splice(this.index, 1)
			window.localStorage.setItem('goodsVal', JSON.stringify(mes))
			window.location.reload()
			sum()
		}
	}
	_spot.style.display = ''
	_order.classList.remove('disable')
	//进入页面默认全选
	for (i = 0; i < _select.length; i++) {
		_select[i].classList.add('active')
	}
	//选中
	for (i = 0; i < _select.length; i++) {
		_select[i].onclick = function () {
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				this.classList.add('active')
			}
			ischeck()
			sum()
		}
	}

	//全选按钮判断
	function ischeck() {
		for (i = 0; i < _select.length - 1; i++) {
			if (_select[i].classList.contains('active')) {
				_select[_select.length - 1].classList.add('active')
			} else {
				_select[_select.length - 1].classList.remove('active')
				break
			}
		}
	}
	//总价
	function sum() {
		for (i = 0; i < cart_list.length; i++) {
			if (
				cart_list[i]
					.querySelector('.select-btn')
					.classList.contains('active')
			) {
				all_price +=
					cart_list[i]
						.querySelector('.price')
						.innerHTML.split('￥')[1] *
					cart_list[i].querySelector('input').value
			}
		}
		document.querySelector('.total').querySelectorAll('span')[1].innerHTML =
			'￥' + all_price
		all_price = 0
	}
	sum()
	_order.onclick = function () {
		var request = new XMLHttpRequest()
		request.open('get', '../data/user.json')
		request.send(null)
		request.onload = function () {
			if (request.status == 200) {
				var json = JSON.parse(request.responseText)
				console.log(json.state)
			}
		}
	}
} else {
	cart_list.innerHTML = `
    <div class="sub-header">
		<div class="back"></div>
		<div class="title">购物车</div>
	</div>
	<div class="orderend-wrap">
		<div class="select-area">
			<div class="select-wrap">
				<div class="select-btn"></div>
				<div class="select-text">全选</div>
			</div>
			<div class="total">
				运费: <span>￥0</span> 合计: <span>￥0</span>
			</div>
		</div>
		<div class="orderend-btn disable">去结算</div>
	</div>
    `
	var _back = document.querySelector('.back')
	_back.onclick = function () {
		window.location.href = 'details.html?gid=' + _gid
	}
}
