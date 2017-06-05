$( document ).ready(function() {

  // узнаем ширину скролла
  var div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  // отмена закрытия бутстраповского дропдауна с чекбоксами
  $(document).on('click', '.field-drop-checkboxes__drop', function (e) {
    e.stopPropagation();
  });

  // бутстраповские тултипы
  // $('[data-toggle="tooltip"]').tooltip();
  function tooltipsInit(){
    var containerWidth = $(window).width() + scrollWidth;
    if(containerWidth >= 1170) {
      $('[data-toggle="tooltip"]').tooltip();
    } else {
      $('[data-toggle="tooltip"]').tooltip('destroy');
    }
  }
  var tooltipsTimeoutId;
  $(window).resize( function() {
    clearTimeout(tooltipsTimeoutId);
    tooltipsTimeoutId = setTimeout(tooltipsInit, 200);
  });
  tooltipsInit();

  // включение полифила для object-fit: cover; в днищебраузерах
  objectFitImages();

  // включение датапикера в модальном окне и блокировка нескольких дат
  var blockedDates = ["2017-05-12","2017-05-13","2017-05-14","2017-05-15","2017-05-16"]
  $('#modal-datepicker').datepicker({
    beforeShowDay: function(date){
      var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
      return [ blockedDates.indexOf(string) == -1 ]
    }
  });

  // карусели в блоках Top Rated
  var $topRatedCarousel = $('.top-rated__list--carousel');
  var topRatedCarouselSettings = {
    margin: 15,
    autoWidth: true,
    // loop: true,
  };
  function topRatedCarouselInit(){
    var containerWidth = $(window).width() + scrollWidth;
    // console.log('$(document).width(): '+containerWidth);
    if(containerWidth <= 969) {
      $topRatedCarousel.owlCarousel( topRatedCarouselSettings );
    } else {
      $topRatedCarousel.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
      $topRatedCarousel.find('.owl-stage-outer').children().unwrap();
    }
  }
  var topRatedTimeoutId;
  $(window).resize( function() {
    clearTimeout(topRatedTimeoutId);
    topRatedTimeoutId = setTimeout(topRatedCarouselInit, 200);
  });
  topRatedCarouselInit();

  // карусель отзывов
  $('#feedback-slider').owlCarousel({
    responsive : {
      0 : {
        autoWidth: true,
        loop: true,
      },
      1170 : {
        autoWidth: false,
        items: 3,
        loop: true,
      },
    }
  });
  $('#feedback-slider-next').on('click', function(e){
    e.preventDefault();
    $('#feedback-slider').trigger('next.owl.carousel');
  });
  $('#feedback-slider-prev').on('click', function(e){
    e.preventDefault();
    $('#feedback-slider').trigger('prev.owl.carousel');
  });

  // дроп фильтра товаров
  $('#filter-drop-toggler').on('click', function(){
    $('#filter-drop').toggleClass('filter__drop--open');
    $('#filter-wrapper').toggleClass('filter-wrapper--open');
  });

});
