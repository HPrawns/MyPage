var PageInit = {
	//主菜单
	MainMenu: function() {
		Vue.component('main-menu', {
			template: '<div class="" id="ol-div-head">' +
				'<div class="top-div"><a  v-bind:href="job" >Job</a></div>' +
				'<div class="top-div"><a v-bind:href="defaults"   >Works</a></div>' +
				'<div class="top-div"><a v-bind:href="blog"   >Blog</a></div>' +
				'<div class="top-div"><a v-bind:href="defaults"   >Git</a></div>' +
				'</div>',
			data: function() {
				return {
					works: "/MyPage/Work/Works.html",
					blog: "/MyPage/Blog/BlogList.html",
					job: "/MyPage/Job/Job.html",
					git: "",
					defaults:"/MyPage/default.html"
				}
			}
		});
		new Vue({
			el: '#mainmenu'
		})
	},
	//返回顶部
	BackTop:function(){
		
		$(".top-menu-btn").on("click",function(){
//			console.log("213213213");
			$("html,body").animate({ scrollTop: 0},800);
		});
	}
	
}
