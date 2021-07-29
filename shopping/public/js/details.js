var _title = document.querySelector('title')
var _gid = location.search.split('=')[1]
var _back = document.getElementsByClassName('back')
var _page = document.querySelector('.page')
var van_toast = document.querySelector('.van-toast')
var _tab = document.getElementsByClassName('tab-name')
var _cart = document.querySelector('.cart-icon')
var _spot = document.querySelector('.spot')
var mes1 = ''
_back[0].onclick = function () {
	window.location.href = 'javascript:history.go(-1)'
}
function goods(_gid) {
	axios
		.get(
			'http://vueshop.glbuys.com/api/home/goods/info?type=details&token=1ec949a15fb709370f',
			{
				params: {
					gid: _gid,
				},
			}
		)
		.then((res) => {
			var _swiper = ''
			var mes = res.data.data
			var str = ''
			var bullet = ''
			for (i = 0; i < mes.images.length; i++) {
				str += `
                <div class="swiper-slide">
					<img src="${mes.images[i]}" alt="" />
				</div>
                `
				bullet += `
                <div class="swiper-pagination-bullet"></div>
                `
			}
			_title.innerHTML = mes.title
			_swiper = `
        <div
			class="
				swpier-wrap
				swiper-container swiper-container-horizontal
			"
            id="swiper-container"
		>
			<div class="swiper-wrapper">
				${str}
			</div>
				<div
					class="
						swiper-pagination
						swiper-pagination-clickable
						swiper-pagination-bullets
					"
				>
					${bullet}
				</div>
			</div>
            <div class="goods-ele-main">
            <div class="goods-title">${mes.title}</div>
            <div class="price">￥${mes.price}</div>
            <ul class="sales-wrap">
                <li>快递：${mes.freight}元</li>
                <li>月销量${mes.sales}件</li>
            </ul>
        </div>
        `
			_page.innerHTML = _swiper
		})
		.then(() => {
			var ele = document.querySelector('.goods-ele-main')
			axios
				.get(
					'http://vueshop.glbuys.com/api/home/reviews/index?token=1ec949a15fb709370f',
					{
						params: {
							gid: _gid,
							page: 1,
						},
					}
				)
				.then((res) => {
					mes1 = res.data
					var review = document.createElement('div')
					review.classList.add('reviews-main')
					_page.appendChild(review)
					var _review = document.querySelector('.reviews-main')
					var review_list = ''
					if (mes1.status == 0) {
						_review.innerHTML = `
                        <div class="reviews-title">商品评价（0）</div>
                        <div>
                            <div class="reviews-wrap" style="display: none;"></div>
                            <div class="no-data">暂无评价！</div>
                        </div>
                `
					} else {
						for (i = 0; i < mes1.data.length; i++) {
							review_list += `
                        <div class="uinfo">
                            <div class="head"><img src="${mes1.data[i].head}" alt=""></div>
                            <div class="nickname">${mes1.data[i].nickname}</div>
                        </div>
                        <div class="reviews-content">${mes1.data[i].content}</div>
                        <div class="reviews-date">${mes1.data[i].times}</div>
                     `
						}

						_review.innerHTML = `
                        <div class="reviews-title">商品评价（${mes1.data.length}）</div>
                        <div>
                            <div class="reviews-wrap">
                                <div class="reviews-list">
                                    ${review_list}
                                </div>
                            </div>
                            <div class="reviews-more">查看更多评价</div>
                        </div>
                `
					}
				})
				.then(() => {
					_page.innerHTML += `
		    <div class="bottom-btn-wrap">
		        <div class="btn fav">收藏</div>
		        <div class="btn cart">加入购物车</div>
		    </div>
		    <div class="mask" style="display: none;"></div>
		    `
				})
				.then(() => {
					axios
						.get(
							'http://vueshop.glbuys.com/api/home/goods/info?type=details&token=1ec949a15fb709370f',
							{
								params: {
									gid: _gid,
								},
							}
						)
						.then((res) => {
							var mes = res.data.data
							var cont = `
                            <div class="cart-panel down">
						        <div class="goods-info">
							        <div class="close-panel-wrap">
								        <div class="spot"></div>
								        <div class="line"></div>
								        <div class="close"></div>
							        </div>
							        <div class="goods-img"><img src="${mes.images[0]}" alt="" /></div>
							        <div class="goods-wrap">
                						<div class="goods-title">${mes.title}</div>
                						<div class="price">￥${mes.price}</div>
                						<div class="goods-code">商品编码：${mes.gid}</div>
                					</div>
                				</div>
                				<div class="attr-wrap">
                					
                				</div>
                				<div class="amount-wrap">
                					<div class="amount-name">购买数量</div>
                					<div class="amount-input-wrap">
                						<div class="btn dec active">-</div>
                						<div class="amount-input">
                							<input type="tel" value="1" />
                						</div>
                						<div class="btn inc">+</div>
                					</div>
                				</div>
                				<div class="sure-btn">确定</div>
                			</div>
                            `
							_page.innerHTML += cont
						})
						.then(() => {
							axios
								.get(
									'http://vueshop.glbuys.com/api/home/goods/info?type=spec&token=1ec949a15fb709370f',
									{
										params: {
											gid: _gid,
										},
									}
								)
								.then((res) => {
									var cont = ''
									var cont1 = ''
									var mes = res.data.data
									for (i = 0; i < mes.length; i++) {
										for (
											j = 0;
											j < mes[i].values.length;
											j++
										) {
											var mes1 = mes[i].values[j]
											cont1 += `
                                    <span class="val">${mes1.value}</span>
                                    `
										}
										cont += `
                                    <div class="attr-list">
                                        <div class="attr-name">${mes[i].title}</div>
                                        <div class="val-wrap">
                                            ${cont1}
                                        </div>
                                    </div>
                                    `
										cont1 = ''
									}
									var _list =
										document.querySelector('.attr-wrap')
									_list.innerHTML = cont
								})

								.then(() => {
									var cart_icon =
										document.querySelector('.cart-icon')
									var _cart = document.querySelector('.cart')
									var _panel =
										document.querySelector('.cart-panel')
									var _mask = document.querySelector('.mask')
									var _close =
										document.querySelector('.close')
									var _sure =
										document.querySelector('.sure-btn')
									var _attr =
										document.querySelectorAll('.val-wrap')
									var _text =
										document.querySelector(
											'.van-toast__text'
										)
									var _fav = document.querySelector('.fav')
									var van_toast =
										document.querySelector('.van-toast')
									var _more =
										document.querySelector('.reviews-more')
									var val1 = _attr[0].querySelectorAll('.val')
									var val2 = _attr[1].querySelectorAll('.val')
									var _dec = document.querySelector('.dec')
									var _inc = document.querySelector('.inc')
									var _amount = document
										.querySelector('.amount-input')
										.querySelector('input')
									var cont = 0
									var data = localStorage.getItem('goodsVal')
									data = JSON.parse(data)
									if (data.length == 0) {
										_spot.style.display = 'none'
									} else {
										_spot.style.display = ''
									}
									cart_icon.onclick = function () {
										window.location.href =
											'../html/cart.html?gid=' + _gid
									}
									if (_more != null) {
										_more.onclick = function () {
											for (i = 0; i < _tab.length; i++) {
												_tab[i].classList.remove(
													'active'
												)
											}
											_tab[2].classList.add('active')
											evaluate(_gid)
										}
									}
									_fav.onclick = function () {
										van_toast.style.display = ''
										_text.innerHTML = '请登录会员'
										setTimeout(function () {
											van_toast.style.display = 'none'
										}, 2000)
									}
									_cart.onclick = function () {
										_panel.className = 'cart-panel up'
										_mask.style.display = ''
									}
									_mask.onclick = function () {
										_panel.className = 'cart-panel down'
										_mask.style.display = 'none'
									}
									_close.onclick = function () {
										_panel.className = 'cart-panel down'
										_mask.style.display = 'none'
									}

									for (i = 0; i < val1.length; i++) {
										val1[i].onclick = function () {
											for (j = 0; j < val1.length; j++) {
												val1[j].classList.remove(
													'active'
												)
											}
											this.classList.add('active')
										}
									}

									for (i = 0; i < val2.length; i++) {
										val2[i].onclick = function () {
											for (j = 0; j < val2.length; j++) {
												val2[j].classList.remove(
													'active'
												)
											}
											this.classList.add('active')
										}
									}
									_dec.onclick = function () {
										_amount.value =
											parseInt(_amount.value) - 1
										if (_amount.value <= 1) {
											_amount.value = 1
											_dec.classList.add('active')
										}
									}
									_inc.onclick = function () {
										_amount.value =
											parseInt(_amount.value) + 1
										_dec.classList.remove('active')
									}
									_sure.onclick = function () {
										var str1 = _attr[0].innerHTML
										var str2 = _attr[1].innerHTML
										var flag1 = str1.indexOf('active') != -1
										var flag2 = str2.indexOf('active') != -1
										if (flag1 == false) {
											van_toast.style.display = ''
											_text.innerHTML = '请选择颜色'
											setTimeout(function () {
												van_toast.style.display = 'none'
											}, 2000)
										} else if (flag2 == false) {
											van_toast.style.display = ''
											_text.innerHTML = '请选择尺寸'
											setTimeout(function () {
												van_toast.style.display = 'none'
											}, 2000)
										} else {
											var img = document
												.querySelector('.goods-img')
												.querySelector('img').src
											var title =
												document.querySelector(
													'.goods-title'
												).innerHTML
											var price =
												document.querySelector(
													'.price'
												).innerHTML
											var color =
												_attr[0].querySelector(
													'.active'
												).innerHTML
											var size =
												_attr[1].querySelector(
													'.active'
												).innerHTML
											cont = parseInt(_amount.value)

											var goodsVal = {
												g_img: img,
												g_title: title,
												g_price: price,
												g_color: color,
												g_size: size,
												g_cont: cont,
											}
											data.push(goodsVal)
											window.localStorage.setItem(
												'goodsVal',
												JSON.stringify(data)
											)
											var spot =
												document.querySelector('.spot')
											spot.style.display = ''
										}
									}
								})
								.then(() => {
									var shoppingSwiper = new Swiper(
										'#swiper-container',
										{
											loop: true,
											speed: 300,
											autoplay: 3000,
											pagination: '.swiper-pagination',
											paginationClickable: true,
										}
									)
								})
						})
				})
		})
}
function details(_gid) {
	axios
		.get(
			'http://vueshop.glbuys.com/api/home/goods/info?type=details&token=1ec949a15fb709370f',
			{
				params: {
					gid: _gid,
				},
			}
		)
		.then((res) => {
			mes = res.data.data

			_page.innerHTML = `
            <div class='content'>${mes.bodys}</div>
            `
		})
}
function evaluate(_gid) {
	axios
		.get(
			'http://vueshop.glbuys.com/api/home/goods/info?type=details&token=1ec949a15fb709370f',
			{
				params: {
					gid: _gid,
				},
			}
		)
		.then((res) => {
			mes = res.data.data
			var review_list = ''
			if (mes1.status == 0) {
				_page.innerHTML = `
                <div class="reviews-main">
                    <div class="reviews-title">商品评价（0）</div>
                    <div>
                        <div class="reviews-wrap" style="display: none;"></div>
                        <div class="no-data">暂无评价！</div>
                    </div>
                </div>
                `
			} else {
				for (i = 0; i < mes1.data.length; i++) {
					review_list += `
                     <div class="uinfo">
                        <div class="head"><img src="${mes1.data[i].head}" alt=""></div>
                        <div class="nickname">${mes1.data[i].nickname}</div>
                    </div>
                    <div class="reviews-content">${mes1.data[i].content}</div>
                    <div class="reviews-date">${mes1.data[i].times}</div>
                     `
				}
				_page.innerHTML = `
            <div class='reviews-main' style="padding-bottom: .5rem;">
                <div class="reviews-title">商品评价（${mes1.data.length}）</div>
                <div class="reviews-wrap">
                    <div class="reviews-list">
                        ${review_list}
                    </div>
                </div>
            </div>
            `
			}
		})
}
goods(_gid)
_tab[0].onclick = function () {
	for (i = 0; i < _tab.length; i++) {
		_tab[i].classList.remove('active')
	}
	_tab[0].classList.add('active')
	goods(_gid)
}
_tab[1].onclick = function () {
	for (i = 0; i < _tab.length; i++) {
		_tab[i].classList.remove('active')
	}
	_tab[1].classList.add('active')
	details(_gid)
}
_tab[2].onclick = function () {
	for (i = 0; i < _tab.length; i++) {
		_tab[i].classList.remove('active')
	}
	_tab[2].classList.add('active')
	evaluate(_gid)
}
