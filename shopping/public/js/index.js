var _header = document.getElementById('header')
var _login = document.querySelector('.login')
var _search = _header.getElementsByClassName('search-wrap')
var component = document.getElementsByClassName('search-component')
var _cart = document.getElementsByClassName('cart')
var _my = document.getElementsByClassName('my')
var _nav = document.getElementsByClassName('quick-nav')
var goods_row_1 = document.getElementsByClassName('goods-row-1')
var goods_row_2 = document.getElementsByClassName('goods-row-2')
var goods_recom = document.getElementsByClassName('goods-recom')
var gid_level_arr = []
var gid_recom_arr = []
var g_arr = []
if (window.localStorage.getItem('goodsVal') == null) {
	window.localStorage.setItem('goodsVal', JSON.stringify(g_arr))
}
window.onscroll = function () {
	var h = document.documentElement.scrollTop || document.body.scrollTop
	if (h > 150) {
		_header.className = 'header scroll'
	} else {
		_header.className = 'header'
	}
}
if (localStorage.getItem('user_status') == 1) {
	_header.innerHTML = `
    <div class="classify-icon"></div>
	<div class="search-wrap">
		<div class="search-icon"></div>
		<div class="text">请输入宝贝名称</div>
	</div>
	<div class="my-icon"></div>
    `
	var my_icon = document.querySelector('.my-icon')
	my_icon.onclick = function () {
		window.location.href = '../html/my.html?num=0'
	}
} else {
	_header.innerHTML = `
    <div class="classify-icon"></div>
	<div class="search-wrap">
		<div class="search-icon"></div>
		<div class="text">请输入宝贝名称</div>
	</div>
	<div class="login">登录</div>
    `
	var u_login = document.querySelector('.login')
	u_login.onclick = function () {
		window.location.href = '../html/login.html'
	}
}
var classify = document.querySelector('.classify-icon')
classify.onclick = function () {
	window.location.href = '../html/classify.html?num=0'
}
_login.onclick = function () {
	window.location.href = '../html/login.html'
}
_cart[0].onclick = function () {
	window.location.href = '../html/cart.html'
}
_my[0].onclick = function () {
	window.location.href = '../html/my.html'
}
axios
	.get('/nav')
	.then((res) => {
		mes = res.data.list.data
		let str = ''
		for (i = 0; i < mes.length; i++) {
			let { title, image } = mes[i]
			str += `
		<ul class="item">
			<li><img src="${image}" alt="" /></li>
			<li>${title}</li>
		</ul>
        `
		}
		_nav[0].innerHTML = str
	})
	.then(() => {
		var quick_nav = document.querySelectorAll('.item')
		for (i = 0; i < quick_nav.length; i++) {
			quick_nav[i].index = i
			quick_nav[i].onclick = function () {
				window.location.href = '../html/classify.html?num=' + this.index
			}
		}
	})
axios
	.get('/goodsLevel')
	.then((res) => {
		var mes = res.data.list.data
		for (i = 0; i < mes.length; i++) {
			for (j = 0; j < mes[i].items.length; j++) {
				gid_level_arr.push(mes[i].items[j].gid)
			}
		}
		mes1 = res.data.list.data[0].items
		mes2 = res.data.list.data[1].items
		mes3 = res.data.list.data[2].items
		let str1 = ''
		let str2 = ''
		let str3 = ''
		let str4 = ''
		let str5 = ''
		let str6 = ''
		str1 = `
    <div class="goods-column">
	    <div class="goods-title">
		    ${mes1[0].title}
	    </div>
	    <div class="goods-tip">精品打折</div>
	    <div class="goods-price bg-color-0">${mes1[0].price}元</div>
	    <div class="goods-image">
		    <img src="${mes1[0].image}" alt="" />
	    </div>
    </div>
    <div class="goods-column">
		<div class="goods-list">
			<div class="goods-list-title">
            ${mes1[1].title}
			</div>
			<div class="goods-list-tip">品质精挑</div>
			<div class="goods-list-image">
				<img src="${mes1[1].image}" alt="" />
			</div>
		</div>
		<div class="goods-list">
			<div class="goods-list-title">
            ${mes1[2].title}
			</div>
			<div class="goods-list-tip">品质精挑</div>
			<div class="goods-list-image">
				<img src="${mes1[2].image}" alt="" />
			</div>
		</div>
	</div>
    `
		for (i = 3; i < mes1.length; i++) {
			str2 += `
        <div class="goods-list">
			<div class="goods-title">
				${mes1[i].title}
			</div>
			<div class="goods-image">
				<img src="${mes1[i].image}" alt="" />
				<div class="price">￥${mes1[i].price}</div>
				<div class="price line">￥576</div>
			</div>
		</div>
        `
		}
		for (i = 0; i < 2; i++) {
			str3 += `
        <div class="goods-column-2">
			<div class="goods-title">
				${mes2[i].title}
			</div>
			<div class="goods-tip">火爆开售</div>
			<div class="goods-image">
				<img src="${mes2[i].image}" alt="" />
			</div>
		</div>
        `
		}
		for (i = 2; i < mes2.length; i++) {
			str4 += `
        <div class="goods-list">
			<div class="goods-title">
				${mes2[i].title}
			</div>
			<div class="goods-image">
				<img src="${mes2[i].image}" alt="" />
				<div class="price">￥${mes2[i].price}</div>
				<div class="price line">￥138</div>
			</div>
		</div>
        `
		}
		str5 = `
    <div class="goods-column">
	    <div class="goods-title">
		    ${mes3[0].title}
	    </div>
	    <div class="goods-tip">精品打折</div>
	    <div class="goods-price bg-color-0">${mes3[0].price}元</div>
	    <div class="goods-image">
		    <img src="${mes3[0].image}" alt="" />
	    </div>
    </div>
    <div class="goods-column">
		<div class="goods-list">
			<div class="goods-list-title">
            ${mes3[1].title}
			</div>
			<div class="goods-list-tip">品质精挑</div>
			<div class="goods-list-image">
				<img src="${mes3[1].image}" alt="" />
			</div>
		</div>
		<div class="goods-list">
			<div class="goods-list-title">
            ${mes3[2].title}
			</div>
			<div class="goods-list-tip">品质精挑</div>
			<div class="goods-list-image">
				<img src="${mes3[2].image}" alt="" />
			</div>
		</div>
	</div>
    `
		for (i = 3; i < mes3.length; i++) {
			str6 += `
        <div class="goods-list">
			<div class="goods-title">
				${mes3[i].title}
			</div>
			<div class="goods-image">
				<img src="${mes3[i].image}" alt="" />
				<div class="price">￥${mes3[i].price}</div>
				<div class="price line">￥576</div>
			</div>
		</div>
        `
		}
		goods_row_1[0].innerHTML = str1
		goods_row_1[1].innerHTML = str3
		goods_row_1[2].innerHTML = str5
		goods_row_2[0].innerHTML = str2
		goods_row_2[1].innerHTML = str4
		goods_row_2[2].innerHTML = str6
	})
	.then(() => {
		axios
			.get('/recom')
			.then((res) => {
				var mes = res.data.list.data
				for (i = 0; i < mes.length; i++) {
					gid_recom_arr.push(mes[i].gid)
				}
				let str = ''
				for (i = 0; i < mes.length; i++) {
					str += `
        <div class="goods-list">
			<div class="goods-image">
				<img src="${mes[i].image}" alt="" />
			</div>
			<div class="goods-title">
				${mes[i].title}
			</div>
			<div class="goods-price">￥${mes[i].price}</div>
		</div>
        `
				}
				goods_recom[0].innerHTML = str
			})
			.then(() => {
				var goods_image = document.querySelectorAll('img')

				for (i = 9; i < 29; i++) {
					goods_image[i].index = i
					goods_image[i].onclick = function () {
						console.log(gid_level_arr[this.index - 9])
						window.location.href =
							'../html/details.html?=' +
							gid_level_arr[this.index - 9]
					}
				}
				for (i = 29; i < goods_image.length; i++) {
					goods_image[i].index = i
					goods_image[i].onclick = function () {
						window.location.href =
							'../html/details.html?=' +
							gid_recom_arr[this.index - 29]
					}
				}
			})
	})
