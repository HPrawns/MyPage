var BlogList = {
	Config: {
		PageSize: 5,
		PageIndex: 0, //总数组总的下标
		PageCount: 0, //总页数
		DataListCount: 0,
		DataList: [], //所有数据
	},
	InitData: function() {
		var _config = this.Config;
		$.ajax({
			type: "GET",
			url: "../JsonData/BlogList.json",
			dataType: "json",
			async: false,
			success: function(BackData) {
				_config.DataList = BackData;
				_config.DataListCount = BackData.length;
				_config.PageCount = _config.DataListCount % _config.PageSize == 0 ?
					_config.DataListCount / _config.PageSize : parseInt((_config.DataListCount / _config.PageSize) + 1)
			}
		});

		Vue.component('blog-item', {
			template: '<div class="blog-item">' +
				'<div class="blog-item-t">' +
				'<div class="blog-item-title">{{blogs.title}}</div>' +
				'<div class="blog-item-tag">{{blogs.tag}}</div>' +
				'</div>' +
				'<hr>' +
				'<div class="blog-item-content">{{blogs.content}}</div>' +
				'<div class="blog-item-foot">{{blogs.date}}</div>' +
				'</div>',
			props: ['blogs']
		});

		var _this = this;
		_this.CreatePage();
		var blogvm = new Vue({
			el: '#vue-component-bloglist',
			data: {
				datalist: _this.GetPageData(0)
			},
			methods: {
				teston: function() {

				},
				DataListPage: function(obj) {
					this.datalist = obj;
					//console.log(obj[0]);
				}
			}

		});
	},
	CreatePage: function() {
		var _this = this;
		Vue.component('blog-page', {
			template: '<div class="blog-item-page"><ul>' +
				'<li><a v-on:click="gopage($event,0)"   class="blog-item-page-a">首页</a></li>' +
				'<li v-on:click="gopage($event,nowpage-2)"><a  class="blog-item-page-a">上一页</a></li>' +
				'<li v-for="(item,index) in showpage()"   class="q"  v-bind:nowpage="item" ><a v-on:click="gopage($event,item-1)"  class="blog-item-page-a" >{{item}}</a></li>' +
				'<li v-on:click="gopage($event,nowpage)"><a  class="blog-item-page-a">下一页</a></li>' +
				'<li class=""><a v-on:click="gopage($event,pagecount-1)"  class="blog-item-page-a">末页</a></li>' +
				'<li><a>总共{{datacount}}条</a></li>' +
				'</ul></div>',
			props: ['bloglist'],
			data: function() {
				return {
					datacount: _this.Config.DataListCount,
					pageindex: 0,
					pagecount: _this.Config.PageCount,
					nowpage: 1,
					showlen: 5, //显示的页码数量 5个
				}
			},
			methods: {
				gopage: function(event, pI) {
					if(pI < 0) {
						pI = 0;
					}
					if(pI >= this.pagecount) {
						pI = this.pagecount - 1;
					}
					this.pageindex = (pI * _this.Config.PageSize);
					this.nowpage = pI + 1;
					var _pagedata = _this.GetPageData(pI);

					this.$emit('gopage', _pagedata);
				},
				showpage: function() {
					var _arr = [];
					_arr.push(this.nowpage);
					var _alen = _arr.length;
					var i = 1;
					for(; i <= this.showlen - _alen; i++) {
						if(this.nowpage - i > 0) {
							_arr.unshift(this.nowpage - i);
						}
						if(this.nowpage + i <= this.pagecount) {
							_arr.push(this.nowpage + i);
						}
						if(_arr.length >= this.showlen) {
							break;
						}
					}
					return _arr;
				},
				activepage: function() {
					var _d = document.querySelectorAll(".blog-item-page li[class]");
					for(var i = 0; i < _d.length; i++) {
						if(_d[i].getAttribute("nowpage") == this.nowpage) {
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
	/*返回分页数据*/
	GetPageData: function(pI) {
		this.Config.PageIndex = pI * this.Config.PageSize;
		var _m = this.Config.PageIndex + this.Config.PageSize;
		return this.Config.DataList.slice(this.Config.PageIndex, _m);
	}
}