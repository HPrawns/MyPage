var BlogList = {
	InitData: function(pagesize) { //初始化, 通过读取json文件返回数据 并计算好总页数
		var data = {};
		data.datalist = [];
		data.datalistcount = 0;
		data.pagecount = 0;
		data.pagesize = pagesize == undefined ? 5 : pagesize;
		$.ajax({
			type: "GET",
			url: "../JsonData/BlogList.json",
			dataType: "json",
			async: false,
			success: function(BackData) {
				data.datalist = BackData.sort(function(a,b){return  Date.parse(b.date)-Date.parse(a.date);});
				data.datalistcount = BackData.length;
				data.pagecount = data.datalistcount % data.pagesize == 0 ?
					data.datalistcount / data.pagesize : parseInt((data.datalistcount / data.pagesize) + 1);
			}
		});
		return data;
	},
	InitVue: function() {
		var idata = this.InitData(5);
		//博客列表
		Vue.component('blog-item', {
			template: '<div class="blog-item">' +
				'<div class="blog-item-t">' +
				'<div class="blog-item-title">{{blogs.title}}</div><div class="blog-item-author">{{blogs.date}}</div>' +
				'<div class="blog-item-tag">{{blogs.tag}}</div>' +
				'</div>' +
				'<hr>' +
				'<div class="blog-item-content">{{ContentHandle}}</div>' +
				'<div class="blog-item-read" v-on:click="GoRead($event,blogs.ourl)">阅读原文</div>' +
				'</div>',
			props: ['blogs'],
			computed:{
				ContentHandle:function(){	//字太多用..号代替
					if(this.blogs.content.length>=269){	
					return this.blogs.content.substring(0,260)+".................";
					}
					return this.blogs.content;
				}
				
			},
			methods:{
				GoRead:function(event,url){
					window.open("BlogDetail/"+url);
//					console.log(url);
				}
			}
			
		});
		var _this = this;
		_this.CreatePage();		//初始化分页组件

		_this.TagSearch();		//初始化快捷标签组件
		//父对象
		var blogvm = new Vue({
			el: '#vue-component-bloglist',
			data: {
				PrototypeData:idata.datalist,		//原始数据 不会被覆盖
				BlogData: {
					DataList: idata.datalist, //全部数据缓存
					DataListCount: idata.datalistcount, //总数据条数
					PageCount: idata.pagecount, //总数据页数
					DataIndex: 0, //当前数据下标,相对于总数据
					PageIndex: 1, //当前页码
					PageSize: idata.pagesize, //每页显示条数	
					NowList: [], //当前页面数据的集合
				},
				TagTypeList: [], //标签类型集合  已去重
			},
			methods: {
				DataListPage: function(obj) { //分页更新父实例的数据集合
					this.BlogData.NowList = this.GetPageData(obj);
				},
				TagList: function(tags) { //标签更新数据 点击标签的查询,相当于一个条件的查询 将覆盖原有属性
					//	console.log(tags);
					this.BlogData.DataList = this.PrototypeData.filter(function(v, i, a) {
						return v.tag == tags;
					});
					this.BlogData.DataListCount = this.BlogData.DataList.length;
					this.BlogData.DataIndex = 0;
					this.BlogData.PageIndex = 1;
					this.BlogData.PageCount = this.BlogData.DataList % this.BlogData.PageSize == 0 ?
						this.BlogData.DataListCount / this.BlogData.PageSize : parseInt((this.BlogData.DataListCount / this.BlogData.PageSize) + 1);
					this.BlogData.NowList = this.GetPageData(0);
				},
				GetTagTypeData: function() {		//获取数据中的标签  去重放入集合
					var _arry = [];
					this.BlogData.DataList.forEach(function(v, i, a) {
						if(_arry.indexOf(v.tag) == -1) {
							_arry.push(v.tag);
						}
					});
					_arry.sort(function(a, b) {
						return a.length - b.length;
					});
					return _arry;

				},
				GetPageData: function(pI) {		//分页返回数据 类似后台的数据处理
					this.BlogData.DataIndex = pI * this.BlogData.PageSize;
					var _m = this.BlogData.DataIndex + this.BlogData.PageSize;
					return this.BlogData.DataList.slice(this.BlogData.DataIndex, _m);
				}
			},
			computed: {

			},
			created: function() {		//生命周期中 初始化 基本数据
				this.TagTypeList = this.GetTagTypeData();
				this.BlogData.NowList = this.GetPageData(0);
			},
			mounted: function() {}

		});
	},
	CreatePage: function() {
		//分页组件
		var _this = this;
		Vue.component('blog-page', {
			template: '<div class="blog-item-page"><ul>' +
				'<li><a v-on:click="gopage($event,0)"   class="blog-item-page-a">首页</a></li>' +
				'<li v-on:click="gopage($event,blogdata.PageIndex-2)"><a  class="blog-item-page-a">上一页</a></li>' +
				'<li v-for="(item,index) in showpage()"   class="q"  v-bind:nowpage="item" ><a v-on:click="gopage($event,item-1)"  class="blog-item-page-a" >{{item}}</a></li>' +
				'<li v-on:click="gopage($event,blogdata.PageIndex)"><a  class="blog-item-page-a">下一页</a></li>' +
				'<li class=""><a v-on:click="gopage($event,blogdata.PageCount-1)"  class="blog-item-page-a">末页</a></li>' +
				'<li><a>总共{{this.blogdata.DataListCount}}条</a></li>' +
				'</ul></div>',
			props: {
				blogdata: {},
			},
			data: function() {
				return {
					showlen: 5, //显示的页码数量 5个
				}
			},
			methods: {
				gopage: function(event, pI) {		//页面跳转所进入的方法
					if(pI < 0) {
						pI = 0;
					}
					if(pI >= this.blogdata.PageCount) {
						pI = this.blogdata.PageCount - 1;
					}
					this.blogdata.DataIndex = (pI * this.blogdata.PageSize); //数据下标
					this.blogdata.PageIndex = pI + 1; //页面下标
					this.$emit('gopage', pI); //触发父对象监听的方法 用于把数据传回到父对象
				},
				//用于计算 当前页在所显示的页码中的位置
				showpage: function() {
					var _arr = [];
					_arr.push(this.blogdata.PageIndex);
					var _alen = _arr.length;
					var i = 1;
					for(; i <= this.showlen - _alen; i++) {
						if(this.blogdata.PageIndex - i > 0) { //向当前页面前面 寻找 是否有前页
							_arr.unshift(this.blogdata.PageIndex - i);
						}
						if(this.blogdata.PageIndex + i <= this.blogdata.PageCount) { //向当前页码后面寻找是否有后页
							_arr.push(this.blogdata.PageIndex + i);
						}
						if(_arr.length >= this.showlen) { //填充到5个页码结束
							break;
						}
					}
					return _arr;
				},
				activepage: function() { //选中的页码 高亮  添加对应类
					var _d = document.querySelectorAll(".blog-item-page li[class]");
					for(var i = 0; i < _d.length; i++) {
						if(_d[i].getAttribute("nowpage") == this.blogdata.PageIndex) {
							_d[i].className = "blog-item-page-index";
						} else {
							_d[i].className = "";
						}
					}
				},
			},
			mounted: function() {
				this.activepage();
			},
			updated: function() {
				this.activepage();
			}
		});
	},
	TagSearch: function() { //标签组件
		Vue.component('tag-search', {
			template: '<div class="tag-search-item" v-on:click="tagsearch($event,tags)"  >{{tags}}</div>',
			props: ['tags'],
			methods: {
				tagsearch: function(event, tag) {
					this.$emit('tagsearch', tag);
				}
			},
			data: function() {
				return {

				}
			}
		});

	}
}