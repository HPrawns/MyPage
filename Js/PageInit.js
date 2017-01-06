Vue.component('main-menu', {
	template: '<div class="" id="ol-div-head">' +
		'<div class="top-div"><a  v-bind:href="about" >About</a></div>' +
		'<div class="top-div"><a v-bind:href="blog"   >BLOG</a></div>' +
		'<div class="top-div"><a v-bind:href="job"   >Job</a></div>' +
		'<div class="top-div"><a v-bind:href="git"   >Git</a></div>' +
		'</div>',
	data: function() {
		return {
			about: "/MyPage/index.html",
			blog: "/MyPage/Blog/BlogList.html",
			job: "/MyPage/Job/Job.html",
			git: ""
		}
	}
});
new Vue({
	el: '#mainmenu'
})