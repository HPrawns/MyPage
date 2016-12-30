var data = {
	about: "/MyPage/index.html",
	blog: "/MyPage/Blog/BlogList.html",
	works: "/MyPage/Work/WorkList.html",
	git: ""
}
Vue.component('main-menu',{
	template: '<div class="" id="ol_div_head">' +
		'<div class="top_div"><a  v-bind:href="about" >About</a></div>' +
		'<div class="top_div"><a v-bind:href="blog"   >BLOG</a></div>' +
		'<div class="top_div"><a v-bind:href="works"   >Works</a></div>' +
		'<div class="top_div"><a v-bind:href="git"   >Git</a></div>' +
		'</div>',
		data:function(){return data;}
});
new Vue({
	el: '#mainmenu'
})