$( document ).ready(function() {

  // отмена закрытия дропдауна с чекбоксами
  $(document).on('click', '.field-drop-checkboxes__drop', function (e) {
    e.stopPropagation();
  });

  // включение тултипов
  $('[data-toggle="tooltip"]').tooltip();

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

});
