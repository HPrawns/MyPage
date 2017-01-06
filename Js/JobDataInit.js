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
	template: '<li class="block-li"  ></li>',
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

function ProgressBlockInit() {

	new Vue({
		el: '#vue-component-preblock',
		data: {
			arrs: [],
		},
		methods: {
			initblock: function(event, e, lg) {

				this.arrs = [];
				for(var i = 0; i < e; i++) {
					this.arrs[i] = i;
				}
				
				
				var _btnevent = event.target;

				var _lilist = $(_btnevent).prev()[0];
				
				console.log($("li[data-type='c#']"));
				
				
//				$("[data-type='" + lg + "']").each(function(index,item){
//					console.log($(item));
//				})

			}
		}
	});

	var _arr = $(".block-li");
	var _evc = 256 / 16;
	$.each(_arr, function(index, item) {
		var g = parseInt(255 - (index * _evc));
		var r = parseInt(index * _evc);
		$(item).css("background-color", "rgb(" + r + "," + g + ",60)");
	});
}