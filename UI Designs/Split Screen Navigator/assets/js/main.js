
(function($){

	$(function(){
		
		$("#show .item").mouseenter(function() {
			hoverResize($(this));
		});

		$("#show .item").mouseenter(function() {
			$(this).click(function(){
				clicked($(this));
			});
		});

	});

	function hoverResize(x) {
		
		var onHover = x.attr('data');

		var first = $("#show .item[data='1']");
		var second = $("#show .item[data='2']");
		var third = $("#show .item[data='3']");
		
		console.log("Hovered on " + onHover + "st/th/rd item.");
		
		if (onHover == 1){
			second.css('left','44%');
			third.css('left','72%');
			first.addClass('hovered').removeClass('noHovered');
			second.addClass('noHovered').removeClass('hovered');
			third.addClass('noHovered').removeClass('hovered');
			

		} else if (onHover == 2){
			second.css('left','28%');
			third.css('left','72%');
			second.addClass('hovered').removeClass('noHovered');
			first.addClass('noHovered').removeClass('hovered');
			third.addClass('noHovered').removeClass('hovered');

		} else if (onHover == 3){
			second.css('left','28%');
			third.css('left','56%');
			third.addClass('hovered').removeClass('noHovered');
			first.addClass('noHovered').removeClass('hovered');
			second.addClass('noHovered').removeClass('hovered');
		}
		
	}

	function clicked(x) {
		
		var clicked = x.attr('data');
		var first = $("#show .item[data='1']");
		var second = $("#show .item[data='2']");
		var third = $("#show .item[data='3']");

		if (clicked == 1) {
			first.addClass('clicked');
			second.addClass('noClicked');
			third.addClass('noClicked');
		}
		if (clicked == 2) {
			first.addClass('noClicked');
			second.addClass('clicked');
			third.addClass('noClicked');
		}
		if (clicked == 3) {
			first.addClass('noClicked');
			second.addClass('noClicked');
			third.addClass('clicked');
		}



		
	}

})(jQuery);