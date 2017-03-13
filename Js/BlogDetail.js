$(function(){
	pageheight();
	
})
function pageheight(){
	var pg=$('.detail-out-div').height();
	var wd=$(window).height();
	if(pg<wd){
		$('.detail-content-div').height(wd);
	}
}
