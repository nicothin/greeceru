(function(){

  var subMenuShownClassName = 'main-nav__item--show-child';

  // Клик на переключалке видимости гл. меню (бургер и бекдроп на мобильных)
  $('#main-nav-toggler, #main-nav-backdrop').on('click', function(e){
    e.preventDefault();
    $('body').toggleClass('no-scroll');
    $('#main-nav').toggleClass('main-nav--open');
    $('#main-nav-toggler').toggleClass('burger--close');
    hideAllSubmenu();
  });

  // Показ/сокрытие подменю уровня
  $('[data-main-nav-submenu-toggler]').on('click', function(e){
    e.preventDefault();
    $('.login').removeClass('login--open');

    // если это подменю 3го уровня
    if ($(this).closest('.main-nav__sub-list').length) {
      $(this).closest('.main-nav__sub-list').find('.'+subMenuShownClassName).removeClass(subMenuShownClassName);
      $(this).closest('.main-nav__item').addClass(subMenuShownClassName);
    }
    // иначе, если подменюха уже была открыта (нужно закрывать)
    else if ($(this).closest('.main-nav__item').is('.'+subMenuShownClassName)) {
      hideAllSubmenu();
    }
    else {
      hideAllSubmenu();
      $(this).closest('.main-nav__item').addClass(subMenuShownClassName);
    }
  });

  // Показ/сокрытие подменю авторизованного пользователя
  $('[data-usermenu-toggler]').on('click', function(e){
    e.preventDefault();
    hideAllSubmenu();
    $('.login').toggleClass('login--open');
  });

  // Только сокрытие подменю (всех)
  $('[data-main-nav-submenu-hide]').on('click', function(e){
    e.preventDefault();
    hideAllSubmenu();
  });

  // Закрытие подуровней меню, если был клик вне меню
  $(document).on('click', function(e){
    if (!$(e.target).closest('.main-nav__list').length && !$(e.target).closest('.login').length) {
      hideAllSubmenu();
      $('.login').removeClass('login--open');
    }
  });

  // Сокрытие видимости всех подменю 2го уровня
  function hideAllSubmenu() {
    $('.'+subMenuShownClassName).removeClass(subMenuShownClassName);
  }

}());
