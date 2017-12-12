jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});

    (function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var chatEnable = 0;
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.minimize').click(function() {
            $('#open_chat').click();
        });
        $('.close').click(function() {
            // body...
            // alert('aa');
            // $(".chat_window").toggle(function () { $(this).animate({ height: "300px" }, 200); });
            // $('#form').toggle();
            if($(".messages").css("display") == 'block'){
                $(".chat_window").css('height','57px');
            } else {
                if(chatEnable == 1) {
                    $(".chat_window").css('height', '450px');
                } else {
                    $(".chat_window").css('height', '360px');
                }
            }
            $(".chatcontent").toggle();
            
        });
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        $('#form').validator().on('submit', function (e) {
            e.preventDefault();
            chatEnable = 1;
            $('#form').css("display", "none");
            var name = $("#inputName").val();
            sendMessage('Hi ' + name + ',\n   How can I help you today? Regards, Insurance Doctor Support :)');
            $(".message_input").prop("disabled", false);
            $(".chat_window").css('height', '450px');
        })
        //sendMessage('Hi There,\n   How can I help you today? Regards, Insurance Doctor Support :)');
        // setTimeout(function () {
        //     return sendMessage('Hi Sandy! How are you?');
        // }, 1000);
        // return setTimeout(function () {
        //     return sendMessage('I\'m fine, thank you!');
        // }, 2000);
        $(".chat_window").css('height', '360px');
        $(".chatcontent").css('position', 'relative');

        $(".message_input").prop("disabled", true);
        // $('.messages').css("display", "none");
        // $('#form').css("display", "block");
        $('.navbar-toggle').click(function (e) {
            $('.btn-circle').toggleClass('btn-primary-outline');
        });

        $(".navbar a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 900, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if

      });

        $(document).on('click', '#open_chat', function () {
            if ( $('.chat_window').css('display') == 'none' )
                $('.chat_window').css('display','block');
            else
                $('.chat_window').css('display','none');
            return false;
        });

        // $(document).on('change', '.quote-form-element', function () {
        //     // event.preventDefault();
        //     if($(this).val()) {
        //         $(this).css('border','1px solid greenyellow');
        //     } else {
        //         $(this).css('border','1px solid #ccc');
        //         // alert('aa');
        //     }         
        // });

        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
            event.preventDefault(); 
            event.stopPropagation(); 
            $(this).parent().siblings().removeClass('open');
            $(this).parent().toggleClass('open');   
        });

        // $('.selectpicker').selectpicker();
        $('#open_chat').click();

        // auto input completion while typing
        

    });
}.call(this));

$(document).on('mouseover', ".destinations li", function(e) {
    // code from mouseover hover function goes here
    $(this).addClass('hover');
	$(this).find('button').removeClass('icon-tick');
	$(this).find('button').addClass('icon-cross');
});

$(document).on('mouseout', ".destinations li", function(e) {
     // code from mouseout hover function goes here
	$(this).removeClass('hover');
	$(this).find('button').addClass('icon-tick');
	$(this).find('button').removeClass('icon-cross');
});

$(document).on("click", ".destinations li", function() {
	$(this).remove();
});

// document.on('click', '.icon-cross',function() {
// 	console.log($(this).parent());
// 	$(this).parent().remove();
// });