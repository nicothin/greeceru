$( document ).ready(function() {

  // отмена закрытия дропдауна с чекбоксами
  $(document).on('click', '.field-drop-checkboxes__drop', function (e) {
    e.stopPropagation();
  });

  // включение тултипов
  $('[data-toggle="tooltip"]').tooltip();

  // включение полифила для object-fit: cover; в днищебраузерах
  objectFitImages();

});
