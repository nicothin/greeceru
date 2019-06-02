(function(){

  // кнопки вперед-назад
  $('.rating-add__btn-next, .rating-add__label').on('click', ratingNextStep);
  $('.rating-add__btn-back, .rating-add__like-back').on('click', ratingBackStep);

  // звездочки рейтинга
  $('.rating-add__label').on('mouseenter', function(){
    var labels = $(this).closest('.rating-add__stars').find('.rating-add__label');
    var nowIndex = $(this).index();
    var starIndex = (nowIndex + 1) / 2;
    console.log(nowIndex);
    $(this).closest('.rating-add__stars').attr('data-num', starIndex);
    var pict = $(this).closest('.rating-add__rate-wrap').find('.rating-add__rate-emo');
    $(pict).removeClass('rating-add__rate-emo--active').filter(':eq('+starIndex+')').addClass('rating-add__rate-emo--active');
    $(labels).removeAttr('data-js-hover');
    $(labels).each(function(){
      if ($(this).index() <= nowIndex) $(this).attr('data-js-hover', '')
    });
  });
  // звездочки рейтинга
  $('.rating-add__label').on('mouseleave', function(){
    $(this).closest('.rating-add__stars').attr('data-num', '0');
    var labels = $(this).closest('.rating-add__stars').find('.rating-add__label');
    $(labels).removeAttr('data-js-hover');
    var pict = $(this).closest('.rating-add__rate-wrap').find('.rating-add__rate-emo');
    var hasSelected = $(this).closest('.rating-add__rate-wrap').find('.rating-add__rate-emo--selected');
    if(hasSelected.length) {
      $(pict).removeClass('rating-add__rate-emo--active');
      $(hasSelected).addClass('rating-add__rate-emo--active');
    }
    else {
      $(pict).removeClass('rating-add__rate-emo--active').filter(':first').addClass('rating-add__rate-emo--active');
    }
  });
  // звездочки рейтинга
  $('.rating-add__stars input').on('change', function(){
    var labels = $(this).closest('.rating-add__stars').find('.rating-add__label');
    var nowIndex = $(this).index() + 1;
    var starIndex = (nowIndex + 1) / 2;
    $(this).closest('.rating-add__stars').attr('data-selected-num', starIndex);
    $(labels).removeAttr('data-js-active');
    var pict = $(this).closest('.rating-add__rate-wrap').find('.rating-add__rate-emo');
    $(pict).removeClass('rating-add__rate-emo--selected').filter(':eq('+starIndex+')').addClass('rating-add__rate-emo--selected');
    $(labels).each(function(){
      if ($(this).index() <= nowIndex) $(this).attr('data-js-active', '')
    });
  });

  function ratingNextStep() {
    var currentStep = $('.rating-add__step--active');
    var nextStep = $(currentStep).next();
    var nextTitle = $(nextStep).data('title');
    var nextSubtitle = $(nextStep).data('subtitle');
    $('.rating-add__title').html(nextTitle);
    $('.rating-add__title-descr').html(nextSubtitle);
    $(currentStep).removeClass('rating-add__step--active');
    $(nextStep).addClass('rating-add__step--active');
  }

  function ratingBackStep() {
    var currentStep = $('.rating-add__step--active');
    var prevStep = $(currentStep).prev();
    var prevTitle = $(prevStep).data('title');
    var prevSubtitle = $(prevStep).data('subtitle');
    $('.rating-add__title').html(prevTitle);
    $('.rating-add__title-descr').html(prevSubtitle);
    $(currentStep).removeClass('rating-add__step--active');
    $(prevStep).addClass('rating-add__step--active');
  }

}());
