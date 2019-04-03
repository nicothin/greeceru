$( document ).ready(function() {

  // фиксация сайдбара на странице объекта
  var Sticky = new hcSticky('.object-price-data', {
    stickTo: '.layout-object__aside',
    top: 56,
    responsive: {
      969: {
        disable: true
      }
    }
  });


  // Клик на кнопке показа формы поиска (мобилка)
  $('#search-form-2-trigger').on('click', function(){
    $('#search-form-2-form').toggleClass('search-form-2__form--shown');
  });

  // Поля формы с выбором кол-ва
  var fieldsNum = document.querySelectorAll( '.field-num' );
  if(fieldsNum.length) {
    Array.prototype.forEach.call( fieldsNum, function( field ) {
      const input = field.querySelector('.field-num__input');
      const text = field.querySelector('.field-num__text-num');
      const valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity;
      const valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity;
      const valueStep = input.getAttribute('step') ? +input.getAttribute('step') : 1;
      field.addEventListener('click', function(event){
        if(event.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
          let num = parseInt(input.value);
          if(isNaN(num)) num = 0;
          if(event.target.classList.contains('field-num__btn--plus')) {
            if (num < valueMax) input.value = num + valueStep;
          }
          if(event.target.classList.contains('field-num__btn--minus')) {
            if (num > valueMin) input.value = num - valueStep;
          }
          if(text) {
            text.innerText = new Intl.NumberFormat('en-IN').format(input.value);
          }
        }
      });
    });
  }

  // Работа аккордеона
  $('.accordeon__btn').on('click', function(e){
    e.stopPropagation();
    $(this).closest('.accordeon').toggleClass('open').find('.accordeon__drop').slideToggle();
  });

  // Переключение вкладок в форме добавления локации
  $(document).on('click', '.steps-add__item.steps-add__item--done', function (e) {
    e.preventDefault();
    if($(this.hash).is(':hidden')) {
      $('.add-form__part:visible').hide();
      $(this.hash).fadeIn();
      $('.steps-add__item').removeClass('steps-add__item--active');
      $(this).addClass('steps-add__item--active');
    }
    checkVisibleSendBtn();
    checkDisabledBackBtn();
  });

  // Сортировка фото
  $( "#sortable-phohos" ).sortable().disableSelection();

  // Показ/сокрытие подсказки на карте
  $('#map-help-toggler').on('change', function(){
    if($(this).is(':checked')) {
      $('#map-help').addClass('add-form__map-help-wrap--shown');
    }
    else {
      $('#map-help').removeClass('add-form__map-help-wrap--shown');
    }
  });

  // Наведение на карту
  $('#map-help').hover(function(){
    $('#map-help-toggler').prop('checked', false);
    $(this).removeClass('add-form__map-help-wrap--shown');
  });

  // клик на Next
  $('[data-add-form-next]').on('click',function(){
    if( $(window).scrollTop() > 60 ) {
      $('body,html').animate({'scrollTop':0}, 250);
      $('body').delay(250).queue(function () {
        unnecessaryAnimation();
        console.log(222);
        $(this).dequeue();
      });
    }
    else {
      $(window).scrollTop(0);
      unnecessaryAnimation();
    }
  });
  function unnecessaryAnimation(){
    var thisItemLink = $('.steps-add__item--active');
    var nextItemLink = thisItemLink.closest('.steps-add__item-wrap').next().find('.steps-add__item');
    // Убираем класс активности, добавляем класс завершенности (содержит 1 цикл анимации)
    thisItemLink.removeClass('steps-add__item--active').addClass('steps-add__item--done').delay(300).queue(function () {
      $(thisItemLink.attr('href')).hide();
      $(nextItemLink.attr('href')).fadeIn();
      nextItemLink.addClass('steps-add__item--active steps-add__item--done');
      checkVisibleSendBtn();
      checkDisabledBackBtn();
      $(this).dequeue();
    });
  }

  // Клик на Back
  $('[data-add-form-back]').on('click',function(){
    if( $(window).scrollTop() > 60 ) {
      $('body,html').animate({'scrollTop':0}, 250);
      $('body').delay(250).queue(function () {
        clickOnBackBtn();
        $(this).dequeue();
      });
    }
    else {
      $(window).scrollTop(0);
      clickOnBackBtn();
    }
  });
  function clickOnBackBtn(){
    var thisItemLink = $('.steps-add__item--active');
    var prevItemLink = thisItemLink.closest('.steps-add__item-wrap').prev().find('.steps-add__item');
    thisItemLink.removeClass('steps-add__item--active').closest('.steps-add__item-wrap').prev().find('.steps-add__item').addClass('steps-add__item--active');
    $(thisItemLink.attr('href')).hide();
    $(prevItemLink.attr('href')).fadeIn();
    checkVisibleSendBtn();
    checkDisabledBackBtn();
  }

  // Проверка нужно ли блокировать кнопку Back
  function checkDisabledBackBtn(){
    if( !$('.steps-add__item--active').closest('.steps-add__item-wrap').prev().length ){
      $('[data-add-form-back]').attr('disabled', true);
    }
    else {
      $('[data-add-form-back]').attr('disabled', false);
    }
  }

  // Проверка нужно ли показывать кнопку отправки вместо Next
  function checkVisibleSendBtn(){
    if( !$('.steps-add__item--active').closest('.steps-add__item-wrap').next().length ){
      $('[data-add-form-next]').hide();
      $('[data-add-form-send]').show();
      $('.steps-add__item--active').addClass('steps-add__item--done');
    }
    else {
      $('[data-add-form-next]').show();
      $('[data-add-form-send]').hide();
    }
  }

  // ВРЕМЕННО: блокировка кнопки отправки формы
  $('[data-add-form-send]').on('click', function(e){e.preventDefault();});





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
  /*  // Alekos: Временно убрал инициализацию календаря - перенёс на нужные страницы.
  $('#shedule-calendar').dateRangePicker({
    inline: true,
    container: '#shedule-calendar',
    extraClass: 'inline-wrapper--modal',
    alwaysOpen: true,
    singleMonth: true,
    showShortcuts: false,
    showTopbar: false,
    startDate: '2017-08-20',
  });
  */

  // карусели в блоках Top Rated
  var $topRatedCarousel = $('.top-rated__list--carousel');
  var topRatedCarouselSettings = {
    margin: 15,
    autoWidth: true,
    dots: false,
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
  $('a[href^="#"]:not([data-toggle]):not([data-no-scroll])').on('click',function(e){
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
  /* //Alekos: Перенёс инициализацию слайдеров на internal property только для недвижимости на продажу
     // там же обрабатываются события от слайдеров и пересчитываются параметры кредита.
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
  */

  // выбор дат в блоке сайдбара c jQuery UI calendar
  // var array = ["2017-08-14","2017-08-15","2017-08-16"]
  // $("#datepicker-1, #datepicker-2").datepicker({
  //   beforeShowDay: function(date){
  //     var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
  //     return [ array.indexOf(string) == -1 ]
  //   }
  // });

  // выбор дат в блоке сайдбара c jQuery Date Range Picker
  /* //Alekos: Перенёс инициализацию календарей на нужные страницы.
  $("#datepicker-1").dateRangePicker({
    container: '#availability-date-start',
    extraClass: 'date-picker-wrapper--aside  date-picker-wrapper--aside-start',
    autoClose: true,
    singleDate : true,
    singleMonth: true,
    showShortcuts: false,
    startDate: '2017-08-20',
    showTopbar: false,
  });
  $("#datepicker-2").dateRangePicker({
    container: '#availability-date-end',
    extraClass: 'date-picker-wrapper--aside  date-picker-wrapper--aside-end',
    autoClose: true,
    singleDate : true,
    singleMonth: true,
    showShortcuts: false,
    startDate: '2017-08-20',
    showTopbar: false,
  });

  // выбор дат в модальном окне c jQuery Date Range Picker
  $("#datepicker-3").dateRangePicker({
    container: '#modal-availability-date-start',
    extraClass: 'date-picker-wrapper--modal  date-picker-wrapper--modal-start',
    autoClose: true,
    singleDate : true,
    singleMonth: true,
    showShortcuts: false,
    startDate: '2017-08-20',
    showTopbar: false,
  }).on('datepicker-open',function(){ // на мобилке два поля друг под другом, так что придется добавлять/убирать класс-модификатор, увеличивающий z-index
      $(this).closest('.field-text').addClass('field-text--datapicker-active');
  }).on('datepicker-closed',function(){
    $(this).closest('.field-text').removeClass('field-text--datapicker-active');
  });
  $("#datepicker-4").dateRangePicker({
    container: '#modal-availability-date-end',
    extraClass: 'date-picker-wrapper--modal  date-picker-wrapper--modal-end',
    autoClose: true,
    singleDate : true,
    singleMonth: true,
    showShortcuts: false,
    startDate: '2017-08-20',
    showTopbar: false,
  });

  // инлайновый календарь для страницы выбора дат при добавлении цен за конкретные даты
  $('#calendar-prices').dateRangePicker({
    inline: true,
    container: '#calendar-prices',
    alwaysOpen: true,
    singleMonth: true,
    showShortcuts: false,
    showTopbar: false,
    startDate: '2017-08-20',
  });
  */


});
