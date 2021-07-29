const router = require('koa-router')()
const axios = require('axios')
//首页导航
router.get('/nav', async (ctx, next) => {
	var response = await axios.get(
		'http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f'
	)
	var list = response.data
	ctx.body = {
		errcode: 0,
		errmsg: 'ok',
		list,
	}
})
//首页产品
router.get('/goodsLevel', async (ctx, next) => {
	var response = await axios.get(
		'http://vueshop.glbuys.com/api/home/index/goodsLevel?token=1ec949a15fb709370f'
	)
	var list = response.data
	ctx.body = {
		errcode: 0,
		errmsg: 'ok',
		list,
	}
})
//推荐
router.get('/recom', async (ctx, next) => {
	var response = await axios.get(
		'http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f'
	)
	var list = response.data
	ctx.body = {
		errcode: 0,
		errmsg: 'ok',
		list,
	}
})
// 产品分类页面左侧菜单
router.get('/menu', async (ctx, next) => {
	var response = await axios.get(
		'http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f'
	)
	var list = response.data
	ctx.body = {
		errcode: 0,
		errmsg: 'ok',
		list,
	}
})
router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'Hello Koa 2!',
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json',
	}
})

module.exports = router
