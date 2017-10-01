'use strict';

// Document ready
$(document).on('ready', function(){

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
    	verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });

  var headerLanguage = $('.header__language'),
      headerButton = $('#header__button'),
      body = $('body')
  ;

  headerLanguage.on('click', function(e){
    $(this).toggleClass('is-active');
  });
  headerLanguage.on('click', function(e){
    e.stopPropagation();
  });

  headerButton.on('click', function(e){
    e.stopPropagation();
    $(this).find('.hamburger').toggleClass('is-active');
    body.toggleClass('is-active');
  });
  $('.header__nav-wrapper').on('click', function(e){
    e.stopPropagation();
  });

  $('select.selectric').selectric({
    disableOnMobile: false,
    nativeOnMobile: false
  });

  $(document).on('click', function(){

    if (headerLanguage.hasClass('is-active')) {
      setTimeout(function(){
        headerLanguage.removeClass('is-active');
      }, 1500);
    }

    if (body.hasClass('is-active') && headerButton.find('.hamburger').hasClass('is-active')) {
      setTimeout(function(){
        headerButton.find('.hamburger').removeClass('is-active')
        body.removeClass('is-active');
      }, 500);

    }

  });

  $('.main-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false
  });

  $(document).on('click', '.popup__close', function(){
    $.magnificPopup.close();
  });

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
        $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('resize', function() {
  var width = $(window).width();

  if (width > 767) {
    if ($('body').hasClass('is-active')) {
      $('body').removeClass('is-active');
    }
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

(function($) {
  $.fn.phAnim = function( options ) {

    // Set default option
    var settings = $.extend({}, options),
    		label,
  			ph;

    // get label elem
    function getLabel(input) {
      return $(input).parent().find('label');
    }

    // generate an id
    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    return this.each( function() {

      // check if the input has id or create one
      if( $(this).attr('id') == undefined ) {
        $(this).attr('id', makeid());
      }

      // check if elem has label or create one
      if( getLabel($(this)).length == 0 ) {
        // check if elem has placeholder
        if( $(this).attr('placeholder') != undefined ) {
          ph = $(this).attr('placeholder');
          $(this).attr('placeholder', '');
          // create a label with placeholder text
          $(this).parent().prepend('<label for='+ $(this).attr('id') +'>'+ ph +'</label>');
        }
      } else {
        // if elem has label remove placeholder
        $(this).attr('placeholder', '');
        // check label for attr or set it
        if(getLabel($(this)).attr('for') == undefined ) {
          getLabel($(this)).attr('for', $(this).attr('id'));
        }
      }

      $(this).on('focus', function() {
        label = getLabel($(this));
        label.addClass('active focusIn');
      }).on('focusout', function() {
        if( $(this).val() == '' ) {
          label.removeClass('active');
        }
        label.removeClass('focusIn');
      });
    });
  };
}(jQuery));

$(document).ready(function() {
	$('.custom-input input').phAnim();
	$('.custom-input textarea').phAnim();
});

function scrollAnimation(){
  var controller = new ScrollMagic.Controller(),
      header = $('#body .header'),
      headerTl = new TimelineMax(),
      typeTl = new TimelineMax()
  ;

  // 1 scene
  headerTl
    .to(header, 1.5, {autoAlpha: 1, top: 0, ease:Power1.easeOut})
  ;

  var headerScene = new ScrollMagic.Scene({
      triggerElement: header
    })
    .setTween(headerTl)
    .addIndicators({name: "pin scene", colorEnd: "#FFFFFF"})
    .addTo(controller);

  // console.log('test');
}

$(document).ready(scrollAnimation);
