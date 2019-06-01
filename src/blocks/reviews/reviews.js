(function(){

  $('.reviews__more-wrap .more-link').on('click', function(e){
    e.preventDefault();
    $(this).closest('.reviews').find('.reviews__list .reviews__item--hidden').slideDown();
  })

}());
