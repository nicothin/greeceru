(function(){

  // Реакции на клик по кнопкам (слайд-эффект для блоков ниже)
  $('[data-card-3-slide-toggle]').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('btn-icon--active');
    var target = $(this).data('card-3-slide-toggle');
    $(this).closest('.card-3').find('.'+target).slideToggle();
  });

}());
