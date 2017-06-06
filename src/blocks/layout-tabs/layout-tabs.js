$(document).ready(function(){

  // переключение «вкладок» для мобильного представления страниц (пример — стр. поиска)
  $(document).on('click', '[data-layout-tab-target]', function(e){
    e.preventDefault();
    $(this).closest('[data-layout-tab-parent]').find('.layout-tabs__tab--active').removeClass('layout-tabs__tab--active');
    $($(this).data('layout-tab-target')).addClass('layout-tabs__tab--active');
    $('[data-layout-tab-toggle]').toggleClass('layout-tabs__list-item--hidden');
  })

});
