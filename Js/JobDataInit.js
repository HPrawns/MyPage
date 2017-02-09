$(function() {
	ReadJsonData();
	ProgressBlockInit();
})
var Jsondata;

Vue.component('vue-component-project', {
	template: '<div class="in-item-project-content" >' +
		'<div class="content-div-left">名称：</div><div class="content-div-right">{{ options.name }}</div>' +
		'<div class="content-div-left">周期：</div><div class="content-div-right">{{ options.cycle }}</div>' +
		'<div class="content-div-left">职责：</div><div class="content-div-right">{{ options.duty }}</div>' +
		'<div class="content-div-left">简介：</div><div class="in-item-project-content-introduce">{{ options.content}}</div>' +
		'</div>',
	props: {
		"options": {
			name: 'name',
			cycle: 'cycle',
			duty: 'duty',
			content: 'content'
		}
	}
});
Vue.component("vue-component-preblock", {
	template: '<li></li>',
	props: {}
});

//读取JSON文件的内容
function ReadJsonData() {
	$.ajax({
		type: "GET",
		url: "../JsonData/Project.json",
		dataType: "json",
		success: function(BackData) {
			new Vue({
				el: '#vue-component-project',
				data: {
					items: BackData,
				}

			});
		}
	});
}
/*点击加载按钮*/
function ProgressBlockInit() {
	new Vue({
		el: '#vue-component-preblock',
		data: {
			lgarr: {
				"c#": [],
				"net": []
			}
		},
		methods: {
			initblock: function(event, e, lg) {
			//	this.lg_event=event;
				this.lgtype = lg;
				for(var i = 0; i < e; i++) {
					this.lgarr[lg] = i;
				}
				var btn_event=$(event.toElement).length==0?$(event.originalTarget):$(event.toElement);
				$(btn_event).hide();
			}
		},
		updated: function() {
			console.log("更新时");
			var _liarr = $("li[data-type='" + this.lgtype + "']");
			$.each(_liarr, function(index, item) {
				var g = parseInt(255 - (index * _evc));
				var r = parseInt(index * _evc);
				$(item).css("background-color", "rgb(" + r + "," + g + ",60)");
				$(item).delay((index+1)*200).animate({opacity:1},700);
				
			});
			
		},
		mounted: function() {
			console.log("M时");
		}
	});
}
