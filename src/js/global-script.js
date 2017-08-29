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
      $('[data-toggle="tooltip"]:not(.tooltip-all)').tooltip();
    } else {
      $('[data-toggle="tooltip"]:not(.tooltip-all)').tooltip('destroy');
    }
  }
  var tooltipsTimeoutId;
  $(window).resize( function() {
    clearTimeout(tooltipsTimeoutId);
    tooltipsTimeoutId = setTimeout(tooltipsInit, 200);
  });
  tooltipsInit();
  $('.tooltip-all').tooltip();

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
  $('[data-filter-drop-toggler]').on('click', function(e){
    e.preventDefault();
    $('#filter-drop').toggleClass('modal-mobile--open').toggleClass('filter__drop--open');
    $('#filter-wrapper').toggleClass('filter-wrapper--open-drop');
  });

  // карусель фоток в блоке над картой
  $('.card-map__carousel.owl-carousel').owlCarousel({
    items: 1,
    nav: true,
  });

  // карусель фоток в блоке локации
  $('.card__photo-carousel.owl-carousel').owlCarousel({
    items: 1,
    nav: true,
    lazyLoad: true,
    loop: true,
  });

  // блоки, висящие над картой (клик для смены представления и модального окна на мобилке)
  $('[data-card-map-toggle]').on('click', function(e){
    e.preventDefault();
    var parent = $(this).closest('.card-map-wrap');
    $(parent).find('.card-map-wrap__item').toggleClass('card-map-wrap__item--shown');
    var locationId = $(this).closest('[data-location-id]').data('location-id');
    $('body').toggleClass('modal-map-open');
  });
  // переключение видимости модального окна, заменяющего собой блок на карте
  $('[data-modal-mobile-toggle]').on('click', function(e){
    e.preventDefault();
    var modal = $(this).closest('.modal-map');
    var locationId = $(modal).data('location-id-mobile');
    var parent = $('.card-map-wrap').filter('[data-location-id='+locationId+']');
    $('body').toggleClass('modal-map-open');
    $(parent).find('.card-map-wrap__item').toggleClass('card-map-wrap__item--shown');
  });
  // закрытие видимости модального окна, заменяющего собой блок на карте
  $('[data-modal-mobile-close]').on('click', function(e){
    e.preventDefault();
    var modal = $(this).closest('.modal-map');
    var locationId = $(modal).data('location-id-mobile');
    var parent = $('.card-map-wrap').filter('[data-location-id='+locationId+']');
    $('body').removeClass('modal-map-open');
    $(parent).find('.card-map-wrap__item').removeClass('card-map-wrap__item--shown');
  });

  // карусель в контенте
  var contentCarousel = $('.gallery-content__carousel.owl-carousel');
  $(contentCarousel).owlCarousel({
    items: 1,
    nav: true,
    autoHeight: true,
  });

  // плавный скролл для якорных ссылок
  $('a[href^="#"]:not([data-toggle])').on('click',function(e){
    var target_position = $(this.hash).offset().top - 56; // 56 — высота хедера, прибитого к верху вьюпорта
    $('body,html').animate({'scrollTop':target_position},350);
  });

  // оставнока воспроизведения видео при закрытии модального окна
  $('.modal--video').on('hidden.bs.modal', function (e) {
    var src = $(this).find('iframe').attr('src');
    $(this).find('iframe').attr('src', '');
    $(this).find('iframe').attr('src', src);
  });

  // карусель фоток в блоке internal-property
  $('.main-pict__carousel.owl-carousel').owlCarousel({
    items: 1,
    nav: true,
    autoHeight: true,
  });

  // карусель фоток в блоке internal-property
  $('.gallery-modal__carousel.owl-carousel').owlCarousel({
    items: 1,
    nav: true,
    autoHeight: true,
  });

  // карусель фоток в блоке internal-property
  $('.gallery-modal__carousel-prew.owl-carousel').owlCarousel({
    items: 5,
    // center: true,
    nav: false,
    autoWidth:true,
    margin: 20,
  });

  // переключение видимости блоков в сайдбаре
  $('.aside-block__header-toggler').on('click', function(){
    $(this).closest('.aside-block--collapsable').toggleClass('aside-block--collapse');
  });

  // слайдеры для блока mortgage в сайдбаре
  var handle1 = $( "#custom-handle-1 .field-range-jquery-ui__num" );
  $( "#slider-1" ).slider({
    create: function() { handle1.text( $( this ).slider( "value" ) + ' %' ); },
    slide: function( event, ui ) { handle1.text( ui.value + ' %' ); }
  });
  var handle2 = $( "#custom-handle-2 .field-range-jquery-ui__num" );
  $( "#slider-2" ).slider({
    create: function() { handle2.text( $( this ).slider( "value" ) + ' years' ); },
    slide: function( event, ui ) { handle2.text( ui.value + ' years' ); }
  });
  var handle3 = $( "#custom-handle-3 .field-range-jquery-ui__num" );
  $( "#slider-3" ).slider({
    create: function() { handle3.text( $( this ).slider( "value" ) + ' %' ); },
    slide: function( event, ui ) { handle3.text( ui.value + ' %' ); }
  });

  // выбор дат в блоке сайдбара
  var array = ["2017-08-14","2017-08-15","2017-08-16"]
  $("#datepicker-1, #datepicker-2").datepicker({
    beforeShowDay: function(date){
      var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
      return [ array.indexOf(string) == -1 ]
    }
  });

  // инлайновый календарь для страницы выбора дат при добавлении цен за конкретные даты
  // $('#calendar-prices000').datepicker();
  $('#calendar-prices').dateRangePicker({
    inline: true,
    container: '#calendar-prices',
    alwaysOpen: true,
    singleMonth: true,
    // showShortcuts: false,
    showTopbar: false,
    startDate: '2017-08-20',
  });

});
