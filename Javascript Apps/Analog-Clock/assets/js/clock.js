$(document).ready(function(){

  
	var hHand = $("#clock .hHand");
	var mHand = $("#clock .mHand");
	var sHand = $("#clock .sHand");

	setInterval(function(){

		var now = new Date();

		if (now.getHours() >= 12 ) {
			hours = now.getHours() - 12;
		}else { hours = now.getHours(); }
		
		minutes = now.getMinutes();
		seconds = now.getSeconds();

		var degSeconds = (seconds * 360 ) / 60; /* per seconds = 6 degree */
		var degMinutes = (minutes * 360 ) / 60 + (degSeconds / 60);
		var degHours = (hours * 360 ) / 12 + (degMinutes / 12);

		hHand.css("transform","translate(-50%,-100%) rotate("+ degHours +"deg)");
		mHand.css("transform","translate(-50%,-100%) rotate("+ degMinutes +"deg)");
		sHand.css("transform","translate(-50%,-100%) rotate("+ degSeconds +"deg)");

	}, 1000);

	
});