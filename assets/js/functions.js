$(document).ready(function() {
	// dead simple paging
	var $app = $("#app"),
		activepageclass = "active-page-",
		activepage = "about";
	
	$('nav a').click(function(evt) {
		evt.preventDefault();
		
		var href = $(this).attr("href").toString().split("#").join("").toString();
		
		$app.toggleClass(activepageclass + activepage, false);
		$app.toggleClass(activepageclass + href, true);
		
		$('#about').toggleClass('showOverlayer', false);	// hide overlayer
		
		activepage = href;		
	});
	
	$('#about .button.info').click(function(evt) {
		evt.preventDefault();
		
		$('#about').toggleClass('showOverlayer', true);
	});
	
	$('#history .button.back').click(function(evt) {
		evt.preventDefault();
		
		$('#about').toggleClass('showOverlayer', false);
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