(function(){

  // Реакции на клик по кнопкам (слайд-эффект для блоков ниже)
  $('[data-card-2-slide-toggle]').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('btn-icon--active');
    var target = $(this).data('card-2-slide-toggle');
    $(this).closest('.card-2').find('.'+target).slideToggle();
  });

  // Фиксируем высоту для всех элементов с кастомным скроллом внутри карточки (для плавности слайд-эффекта)
  $('.card-2__offers-list-wrap').each(function(){
    optionHeight = getSize($(this));
    console.log(optionHeight);
    $(this).height(optionHeight.height);

    function getSize(target) {
      var $wrap = $("<div />").appendTo($("body"));
      $wrap.css({
        "position":   "absolute !important",
        "visibility": "hidden !important",
        "display":    "block !important"
      });
      $clone = $(target).clone().appendTo($wrap);
      sizes = {
        "width": $clone.width(),
        "height": $clone.height()
      };
      $wrap.remove();
      return sizes;
    }
  });

}());

