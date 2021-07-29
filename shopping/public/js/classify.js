var _back = document.getElementsByClassName('back')
var _nav = document.getElementById('nav')
var _count = document.getElementById('count')
var _wrap = document.querySelector('.classify-wrap')
var _content = document.querySelector('.goods-content-main')
var _good_list = document.getElementsByTagName('ul')
var gid_arr_0 = []
var gid_arr = []
var num = location.search.split('=')[1]
_back[0].onclick = function () {
	window.location.href = '../html/index.html'
}
// 商品分类点击跳转
function classify(num) {
	axios
		.get('/menu')
		.then((res) => {
			mes = res.data.list.data
			var str = ''
			for (i = 0; i < mes.length; i++) {
				str += `
        <div class='classify-item' >${mes[i].title}</div>
        `
			}
			_nav.innerHTML = str
			document.querySelector('.classify-item').classList.add('active')
		})
		.then(() => {
			BetterScroll.createBScroll(_wrap, { click: true })
			var tag = document.querySelectorAll('.classify-item')
			// 初始化页面
			for (i = 0; i < tag.length; i++) {
				tag[i].classList.remove('active')
			}
			tag[num].classList.add('active')
			var _cid = parseInt(num) + 492
			axios
				.get(
					'http://vueshop.glbuys.com/api/home/category/show?token=1ec949a15fb709370f',
					{
						params: {
							cid: _cid,
						},
					}
				)
				.then((res) => {
					var mes = res.data.data
					var str = ''
					var str1 = ''
					if (res.data.status == 1) {
						for (i = 0; i < mes.length; i++) {
							if (mes[i].goods != null) {
								for (j = 0; j < mes[i].goods.length; j++) {
									var mes1 = mes[i].goods[j]
									gid_arr_0.push(mes1.gid)
									str1 += `
                                    <ul>
                                    	<li><img src="${mes1.image}" alt="" /></li>
                                    	<li>${mes1.title}</li>
                                    </ul>
		                             `
								}
							}
							str += `
                                         <div class="goods-wrap">
                                	        <div class="classify-name">${mes[i].title}</div>
                                	        <div class="goods-items-wrap">
                                		    ${str1}
                                	        </div>
                                        </div>
                                 `
							str1 = ''
						}
					} else {
						str = `
                                    <div class="no-data" style="">没有相关商品！</div>
                                `
					}
					_count.innerHTML = str
				})
				.then(() => {
					BetterScroll.createBScroll(_content, { click: true })
					var all_goods = document.querySelectorAll('ul')
					for (i = 0; i < all_goods.length; i++) {
						all_goods[i].index = i
						all_goods[i].onclick = function () {
							window.location.href =
								'../html/details.html?gid=' +
								gid_arr_0[this.index]
						}
					}
				})
			//点击跳转
			for (i = 0; i < tag.length; i++) {
				tag[i].index = i
				tag[i].onclick = function () {
					gid_arr = []
					for (j = 0; j < tag.length; j++) {
						tag[j].classList.remove('active')
					}
					this.classList.add('active')
					var _cid = parseInt(this.index) + 492
					axios
						.get(
							'http://vueshop.glbuys.com/api/home/category/show?token=1ec949a15fb709370f',
							{
								params: {
									cid: _cid,
								},
							}
						)
						.then((res) => {
							var mes = res.data.data
							var str = ''
							var str1 = ''
							if (res.data.status == 1) {
								for (i = 0; i < mes.length; i++) {
									if (mes[i].goods != null) {
										for (
											j = 0;
											j < mes[i].goods.length;
											j++
										) {
											var mes1 = mes[i].goods[j]
											gid_arr.push(mes1.gid)
											str1 += `
                                    <ul>
                                    	<li><img src="${mes1.image}" alt="" /></li>
                                    	<li>${mes1.title}</li>
                                    </ul>
		                             `
										}
									}
									str += `
                                         <div class="goods-wrap">
                                	        <div class="classify-name">${mes[i].title}</div>
                                	        <div class="goods-items-wrap">
                                		    ${str1}
                                	        </div>
                                        </div>
                                 `
									str1 = ''
								}
							} else {
								str = `
                                    <div class="no-data" style="">没有相关商品！</div>
                                `
							}
							_count.innerHTML = str
						})
						.then(() => {
							var _content = document.querySelector(
								'.goods-content-main'
							)

							BetterScroll.createBScroll(_content, {
								click: true,
							})

							var all = document.querySelectorAll('ul')
							for (i = 0; i < all.length; i++) {
								all[i].index = i
								all[i].onclick = function () {
									window.location.href =
										'../html/details.html?gid=' +
										gid_arr[this.index]
								}
							}
						})
				}
			}
		})
}
classify(num)
