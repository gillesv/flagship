$(document).ready(function() {
	// dead simple paging
	var $app = $("#app"),
		activepageclass = "active-page-",
		activepage = "info",
		pagesequence = ["info", "about", "bio"],
		overlayerOpen = false;
	
	// check URL hash
	if(window.location.hash.toString() === '') {
		$app.toggleClass(activepageclass + activepage, true);
	} else {
		var hash = window.location.hash.toString().split("#").join('').toString();
		
		// valid hash? 
		switch(hash) {
			case "info":
			case "bio":
			case "about":
				activepage = hash;
			break;
			case "about-history":
				activepage = "about";
				overlayerOpen = true;
			break;
			default: 
				activepage = "info";
			break;
		}
		
		$app.toggleClass(activepageclass + activepage, true);
		$('#about').toggleClass('showOverlayer', overlayerOpen);
	}
	
	// language nav
	$('nav.langswitch a').click(function(evt) {
		evt.preventDefault();
		
		var href = $(this).attr("href").toString();
		
		if(overlayerOpen) {
			href = href + "#" + activepage + "-history";
		}else {
			href = href + "#" + activepage;
		}
		
		window.location = href;		
	});
	
	// main nav
	$('nav#topnav a').click(function(evt) {
		evt.preventDefault();
		
		var href = $(this).attr("href").toString().split("#").join("").toString();
		
		$app.toggleClass(activepageclass + activepage, false);
		$app.toggleClass(activepageclass + href, true);
		
		$('#about').toggleClass('showOverlayer', false);	// hide overlayer
		
		activepage = href;		
	});
	
	// open/close overlayer	
	$('#about .button.info').click(function(evt) {
		evt.preventDefault();
		
		overlayerOpen = true;
		
		$('#about').toggleClass('showOverlayer', overlayerOpen);
	});
	
	$('#history .button.back').click(function(evt) {
		evt.preventDefault();
		
		overlayerOpen = false;
		
		$('#about').toggleClass('showOverlayer', overlayerOpen);
	});
	
	// swiping
	var hammertime = new Hammer(document.getElementById('app'), {});
	
	hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL});
	
	hammertime.on('swipe', function(evt) {
		var index = pagesequence.indexOf(activepage);
	
		if(evt.offsetDirection == 2) {
			// swipe right
			index ++;
		} else if(evt.offsetDirection == 4) {
			// swipe left
			index --;
		}
		
		if(index < 0) {
			index = pagesequence.length - 1;
		}
		
		if(index > pagesequence.length - 1) {
			index = 0;
		}
		
		overlayerOpen = false;
		$('#about').toggleClass('showOverlayer', overlayerOpen);
		
		$app.toggleClass(activepageclass + activepage, false);
		
		activepage = pagesequence[index].toString();
		
		$app.toggleClass(activepageclass + activepage, true);
		
	});
});

// RAF fallback by http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();