$(document).ready(function() {
	// dead simple paging
	var $app = $("#app"),
		activepageclass = "active-page-",
		activepage = "info",
		pagesequence = ["info", "about", "bio"],
		overlayerOpen = false;
	
	// check URL hash
	if(window.location.hash.toString() === '') {
		showPage();
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
		
		showPage();
		
		if(overlayerOpen) {
			showOverlayer();
		}
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
	$('nav#topnav a, a.infolink').click(function(evt) {
		evt.preventDefault();
		
		var href = $(this).attr("href").toString().split("#").join("").toString();
		
		hidePage();
		activepage = href;
		showPage();
		
		hideOverlayer();
	});
	
	// open/close overlayer	
	$('#about .button.info').click(function(evt) {
		evt.preventDefault();
		
		showOverlayer();
	});
	
	$('#history .button.back').click(function(evt) {
		evt.preventDefault();
		
		hideOverlayer();
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
		
		hideOverlayer();		
		hidePage();
		
		activepage = pagesequence[index].toString();
		showPage();
	});
	
	// function show/hide page
	function showPage() {
		$app.toggleClass(activepageclass + activepage, true);
		
		$('#' + activepage).toggleClass("active", true);
		
		window.location.hash = "#" + activepage;
	}
	
	function hidePage() {
		$app.toggleClass(activepageclass + activepage, false);
		
		$('#' + activepage).toggleClass("active", false);
	}
	
	// function show/hide overlayer
	function showOverlayer() {
		overlayerOpen = true;
		$('#about').toggleClass('showOverlayer', true);
	}
	
	function hideOverlayer() {
		overlayerOpen = false;
		$('#about').toggleClass('showOverlayer', false);
	}
	
	
	// fancybox
	$(".fancybox").fancybox({
		helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(24, 0, 4, 0.85)'
	            }
	        }
	    }
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