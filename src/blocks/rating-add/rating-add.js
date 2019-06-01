(function(){

  $('.rating-add__btn-next').on('click', ratingNextStep);
  $('.rating-add__btn-back, .rating-add__like-back').on('click', ratingBackStep);

  function ratingNextStep() {
    var currentStep = $('.rating-add__step--active');
    var nextStep = $(currentStep).next();
    $(currentStep).removeClass('rating-add__step--active');
    $(nextStep).addClass('rating-add__step--active');
  }

  function ratingBackStep() {
    var currentStep = $('.rating-add__step--active');
    var prevStep = $(currentStep).prev();
    $(currentStep).removeClass('rating-add__step--active');
    $(prevStep).addClass('rating-add__step--active');
  }

}());
