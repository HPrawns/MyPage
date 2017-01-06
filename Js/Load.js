(function(x) {
	var ele = document.getElementById("div-load");
	window.onscroll = function() {
		var scrollTop = 0,
			bodyScrollTop = 0,
			documentScrollTop = 0;
		if(document.body) {
			bodyScrollTop = document.body.scrollTop;
		}
		if(document.documentElement) {
			documentScrollTop = document.documentElement.scrollTop;
		}
		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

		var scrollHeight = 0,
			bodyScrollHeight = 0,
			documentScrollHeight = 0;
		if(document.body) {
			bodyScrollHeight = document.body.scrollHeight;
		}
		if(document.documentElement) {
			documentScrollHeight = document.documentElement.scrollHeight;
		}
		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

		var windowHeight = 0;
		if(document.compatMode == "CSS1Compat") {
			windowHeight = document.documentElement.clientHeight;
		} else {
			windowHeight = document.body.clientHeight;
		}
		if(scrollTop + windowHeight == scrollHeight) {
			ele.classList.add("loading");
		}
	}
	ele.addEventListener("transitionend",function(e){
		var op=ele.ownerDocument.defaultView.getComputedStyle(ele, null)['opacity'];
		if(op==0){
			ele.classList.remove("loading");
		}
	});

})("");