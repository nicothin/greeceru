$('.field-selectric-wrap .field-selectric').selectric({
  disableOnMobile: false,
  maxHeight: 220,
  onBeforeOpen: function () {
    // открытие кастомного селекта должно закрывать бутстраповские дропы
    $('.field-drop-checkboxes').removeClass('open');
  },
});
