(function($) {
'use strict';



   
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 70) {
            $('.main-navigation').addClass('header-white');
        } else {
            $('.main-navigation').removeClass('header-white');
        }
    });



  
  $('.testimonial-wrap').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },{
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      
      ]
  });

  

  $('.videoplay').modalVideo();

  

    
  // SCROLL TO TOP
  
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 70) {
        $('.scroll-to-top').addClass('reveal');
    } else {
        $('.scroll-to-top').removeClass('reveal');
    }
});
 

 
    
  // AOS.init({
  //       disable: false, 
  //       initClassName: 'aos-init', 
  //       animatedClassName: 'aos-animate',
  //       useClassNames: false,
  //       debounceDelay: 50, 
  //       throttleDelay: 99, 
  //       easing: 'ease',
  //       once: false, 
  //       mirror: false, 
  //   });




  /*START GOOGLE MAP*/
  function initialize() {
    var mapOptions = {
      zoom: 15,
      scrollwheel: false,
      center: new google.maps.LatLng(40.7127837, -74.00594130000002)
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      icon: 'assets/img/map_pin.png',
      map: map
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);	
  /*END GOOGLE MAP*/	

 

})(jQuery); // End of use strict
