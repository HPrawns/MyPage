//$(function() {
//	ReadJsonData();
//	ProgressBlockInit();
//})
//var Jsondata;
//

//Vue.component("vue-component-preblock", {
//	template: '<li></li>',
//	props: {}
//});
var JobData = {
	InitProData: function() {
		var _baseList = []; //基础数据变量 读取来自JSON文件的数据
		$.ajax({
			type: "GET",
			url: "../JsonData/Project.json",
			dataType: "json",
			async: false,
			success: function(BackData) {
				_baseList = BackData;
//				console.log(_baseList);
			}
		});
		/*加载项目经验数据*/
		this.InitProject();

		/*加载技能数据*/
		this.InitSkill();
		/*挂载根实例*/
		new Vue({
			el: "#vue-component-job",
			data: {
				baseinfo: _baseList.base,
				project: _baseList.project,
				skill: _baseList.skill,
				other: _baseList.other
			}
		});

	},
	InitProject: function() {
		Vue.component('vue-component-project', {
			template: '<div class="in-item-project-content"><a v-bind:name="datas.code"></a>' +
				'<div class="in-item-content-div"><div class="content-div-left">名称：</div><div class="content-div-right">{{ datas.name }}</div></div>' +
				'<div class="in-item-content-div"><div class="content-div-left">周期：</div><div class="content-div-right">{{ datas.cycle }}</div></div>' +
				'<div class="in-item-content-div"><div class="content-div-left">职责：</div><div class="content-div-right">{{ datas.duty }}</div></div>' +
				'<div class="in-item-project-content-info" >项目描述：</div><div class="in-item-content-div-info"><div class="in-item-project-content-introduce"   v-html="datas.content"> </div></div>' +
				'</div>',
			props: ['datas']
		});
	},
	//技能
	InitSkill: function() {
		Vue.component('vue-component-skill', {
			template: '<div><div class="item-skill-content-block">' +
				'<div class="in-item-skill-body">{{datas.type}}</div>' +
				'<div class="in-item-skill-body">{{monthToyear}}</div>' +
				'<div class="in-item-skill-body in-item-skill-body-block">' +
				'<ul class="block-ul">' +
				'<li class=""  v-for="(item,index) in blockarr"   v-bind:data-type=datas.type ></li></ul>' +
				'<input type="button" value="加载" class="block-button" v-on:click="initblock($event,datas.pro)" />' +
				'</div></div><hr /></div>',
			props: ['datas'],
			data: function() {
				return {
					len: 0
				}
			},
			methods: {
				initblock: function(event, count) {
					var btn_event = $(event.toElement).length == 0 ? $(event.originalTarget) : $(event.toElement);
					$(btn_event).hide();
					this.len = count;

				}
			},
			updated: function() {
				var _evc = 256 / 100;
				var _liarr = $("li[data-type='" +this.datas.type + "']");
				$.each(_liarr, function(index, item) {
					var g = parseInt(255 - (index * _evc))-40;		//代表绿色的色值 越高 越亮
					var r = parseInt(index * _evc);				//代表红色的色值 越高 越暗
					$(item).css("background-color", "rgb(" + r + "," + g + ",90)");
					$(item).delay((index + 1) * 200).animate({
						opacity: 1
					}, 700);

				});
			},
			computed: {
				monthToyear: function() {
					var _y = parseInt(this.datas.pro / 12);
					var _m = this.datas.pro % 12;
					if(_y == 0) {
						return _m + "个月";
					}
					if(_m == 0) {
						return _y + "年";
					}
					return _y + "年" + _m + "个月";
				},
				blockarr: function() {
					var _arr = [];
					for(var i = 0; i < this.len; i++) {
						_arr[i] = i;
					}
					return _arr;
				}
			}
		});

	}

}

////读取JSON文件的内容
//function ReadJsonData() {
//	$.ajax({
//		type: "GET",
//		url: "../JsonData/Project.json",
//		dataType: "json",
//		success: function(BackData) {
//			new Vue({
//				el: '#vue-component-project',
//				data: {
//					items: BackData,
//				}
//
//			});
//		}
//	});
//}
///*点击加载按钮*/
//function ProgressBlockInit() {
//	new Vue({
//		el: '#vue-component-preblock',
//		data: {
//			lgarr: {
//				"c#": [],
//				"net": []
//			}
//		},
//		methods: {
//			initblock: function(event, e, lg) {
//				//	this.lg_event=event;
//				this.lgtype = lg;
//				for(var i = 0; i < e; i++) {
//					this.lgarr[lg] = i;
//				}
//				var btn_event = $(event.toElement).length == 0 ? $(event.originalTarget) : $(event.toElement);
//				$(btn_event).hide();
//			}
//		},
//		updated: function() {
//			console.log("更新时");
//			var _evc = 256 / 16;
//			var _liarr = $("li[data-type='" + this.lgtype + "']");
//			$.each(_liarr, function(index, item) {
//				var g = parseInt(255 - (index * _evc));
//				var r = parseInt(index * _evc);
//				$(item).css("background-color", "rgb(" + r + "," + g + ",60)");
//				$(item).delay((index + 1) * 200).animate({
//					opacity: 1
//				}, 700);
//
//			});
//
//		},
//		mounted: function() {
//			console.log("M时");
//		}
//	});
//}