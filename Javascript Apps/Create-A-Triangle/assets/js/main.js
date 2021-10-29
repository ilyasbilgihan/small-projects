(function($){

	$(function(){

		createTriangle (6,8,10);

		$('.setLengths').click(function(){
			var a = $('#enterEdgesLength input[name="val1"]').val();
			var b = $('#enterEdgesLength input[name="val2"]').val();
			var c = $('#enterEdgesLength input[name="val3"]').val();
			
			if ( a == '' || b == '' || c == '') {

				$('#info span.success').removeClass('show');
				$('#info span.error').addClass('show');
				$('#triangle .edge').removeClass('show');
				setTimeout(function(){ $('#info span.error').removeClass('show'); }, 2000);

			}else {
				createTriangle (parseInt(a), parseInt(b), parseInt(c));
			}
		});
		
	});

	function createTriangle (a, b, c){
		
		if (a + b <= c) {

			$('#info span.success').removeClass('show');
			$('#info span.warning').addClass('show');
			$('#triangle .edge').removeClass('show');
			setTimeout(function(){ $('#info span.warning').removeClass('show'); }, 2000);

		}else if (a + c <= b) {

			$('#info span.success').removeClass('show');
			$('#info span.warning').addClass('show');
			$('#triangle .edge').removeClass('show');
			setTimeout(function(){ $('#info span.warning').removeClass('show'); }, 2000);

		}else if (b + c <= a) {

			$('#info span.success').removeClass('show');
			$('#info span.warning').addClass('show');
			$('#triangle .edge').removeClass('show');
			setTimeout(function(){ $('#info span.warning').removeClass('show'); }, 2000);

		}else {
			a = a * 40;
			b = b * 40;
			c = c * 40;
			
			var degreeBtoA = toDegrees( Math.acos( ( kare(c) - kare(a) - kare(b) ) / ( -2 * ( a * b ) ) ) );
			var degreeBtoC = toDegrees( Math.acos( ( kare(a) - kare(c) - kare(b) ) / ( -2 * ( c * b ) ) ) );
			var degreeAtoC = toDegrees( Math.acos( ( kare(b) - kare(c) - kare(a) ) / ( -2 * ( c * a ) ) ) );

			var parentHeight = c * Math.sin(degreeBtoC / (180 / Math.PI));
			$('#triangle').css({'width': b + 'px','height': parentHeight + 'px'});

			$('.edge.one').css({'width': a + 'px','transform': 'rotate(-'+degreeBtoA+'deg)'});
			$('.edge.two').css('width', b + 'px');
			$('.edge.three').css({'width': c + 'px','transform': 'rotate('+degreeBtoC+'deg)'});

			$('.edge.one').attr('data-length', a / 40);
			$('.edge.two').attr('data-length', b / 40);
			$('.edge.three').attr('data-length', c / 40);
			$('.edge.one span').css('transform', 'translate(50%,-50%) rotate('+degreeBtoA+'deg)');
			$('.edge.three span').css('transform', 'translate(50%,-50%) rotate(-'+degreeBtoC+'deg)');

			$('#triangle .edge').addClass('show');
			$('#info span.warning').removeClass('show');
			$('#info span.success').addClass('show');
			setTimeout(function(){ $('#enterEdgesLength p').addClass('show'); }, 500);
			$('#enterEdgesLength p').removeClass('show');
			setTimeout(function(){ $('#info span.success').removeClass('show'); }, 2000);

			var degrees = 'm(BAC) = ~'+ degreeAtoC.toFixed(2) +'&deg; | m(ACB) = ~'+ degreeBtoC.toFixed(2) +'&deg; | m(CBA) = ~'+ degreeBtoA.toFixed(2) +'&deg;';
			$('#enterEdgesLength p').html(degrees);
			
		}

	}

	function kare(x){
		return Math.pow(x, 2);
	}

	function toDegrees (angle) {
	  	return angle * (180 / Math.PI);
	}
	


})(jQuery);