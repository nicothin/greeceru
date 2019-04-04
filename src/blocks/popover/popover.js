(function(){

  // включим попверы
  $('[data-toggle="popover"]').popover({
    html: true,
    // delay: { "show": 0, "hide": 500 }
  });

  // если поповер из инфоблока, при показе/сокрытии перещелкнем класс активности инфоблока
  $('.info-link').on('show.bs.popover hide.bs.popover', function(){
    $(this).toggleClass('info-link--active');
  });

}());
