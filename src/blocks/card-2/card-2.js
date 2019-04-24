(function(){

  $('[data-card-2-slide-toggle]').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('btn-icon--active');
    var target = $(this).data('card-2-slide-toggle');
    $(this).closest('.card-2').find('.'+target).slideToggle();
  });

}());
