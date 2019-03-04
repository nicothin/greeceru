// document.addEventListener('DOMContentLoaded', function(){});

(function(){

  $('[data-show-help-center]').on('click', function(e){
    e.preventDefault();
    $('.help-center').toggleClass('help-center--open');
    $('.page').toggleClass('page--no-scroll');
  });

}());
