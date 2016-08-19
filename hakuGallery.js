(function($) {
	
	$.fn.hakuGallery = function() {
    var images = this;
	
      // INITIATE THE GALLERY
      init = function(img) {
	
		//CREATE DIVS
		$('#overlay, #haku-gallery').remove();
		
        $('<div id="haku-gallery"></div>')
          .appendTo('body');
		  
        $('<div id="hg-overlay"></div>')
          .appendTo('#haku-gallery')
		  .click(exit);
		  
        $('<div id="hg-selected-img"></div>')
			.delay()
			.appendTo('#haku-gallery');
			
        $('<div id="hg-preview-img"></div>')
			.appendTo('#haku-gallery');
	
        // LOAD ALL THE IMAGES
        $.each(images, function() {
			$('<img>')
            .attr('src', $(this).attr('src'))
            .hide()
            .load(function() {
              $(this)
                .fadeIn();
            })
            .appendTo('#hg-preview-img')
            .click(function() {
              initImage(this);
            });
        });
        $('<div class="navUp">&lt;</div><div class="navDown">&gt;</div>')
          .hide()
          .fadeIn()
          .appendTo('#hg-preview-img')
          .hover(function() {
            previews(this);
          });
        if(img) {initImage(img);}
      } // END OF INIT GALLERY
	
      // EXIT HAKUGALLERY
      exit = function() {
        $('#haku-gallery').fadeOut('fast', function() {
          $(this).remove();
        });
      }
	
      initImage = function(img) {
        $('#hg-selected-img')
          .fadeOut(function() {
            $('#hg-selected-img img')
            .remove();
			
            $('<img>')
            .attr('src', $(img).attr('src'))
            .css({
              'max-height': $(window).height() * 0.95, 
              'max-width': $(window).width() * 0.8,
            })
            .load(function() {
            $('#hg-selected-img')
            .css({
				'top': $(window).height() * 0.01,
				'left': $(window).width() * 0.15,
				'top': $(window).height() * 0.5
            })
                .fadeIn();
            })
            .appendTo('#hg-selected-img');
          });
		  
		$('#hg-preview-img')
		.css({
			'left': $(window).width() * 0.03
		});
      }
	
      previews = function(elements) {
		var pos = $('#hg-preview-img').scrollTop();
        var dir = $(elements).hasClass('navUp') ? -1 : 1;
        var newp = pos + dir * $(window).height();
        var endp = $('#hg-preview-img')[0].scrollHeight - $(window).height();
        var move = dir === -1 ? (newp > 0 ? newp : 0) : (newp < endp ? newp : endp);

        if(pos !== move) {
          $('#hg-preview-img').animate({scrollTop: move}, 500);
        }
      };
	
    // CHANGE CURSOR TO POINTER
    images.css('cursor', 'pointer');
	
    // ON IMAGE CLICK
    images.click(function() {
      init(this);
    });
	
  };

})(jQuery);
