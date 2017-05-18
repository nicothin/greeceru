(function(){

  var subMenuShownClassName = 'main-nav__item--show-child';

  // клик на переключалке видимости гл. меню (бургер, на мобильных)
  $('#main-nav-toggler').on('click', function(e){
    e.preventDefault();
    $('#main-nav').toggleClass('main-nav--open');
    $('#main-nav-toggler').toggleClass('burger--close');
    all2LevelMenuHide();
  });

  // Показ/сокрытие подменю 2го уровня
  $('[data-main-nav-submenu-toggler]').on('click', function(e){
    e.preventDefault();
    var parent = $(this).closest('.main-nav__item');
    // если у родителя уже есть класс показываемого подменю 2го уровня, прячем все
    if (parent.is('.'+subMenuShownClassName)) {
      all2LevelMenuHide();
    }
    // у родителя нет класса показываемого подменю 2го уровня, прячем все и показываем нужный
    else {
      all2LevelMenuHide();
      parent.addClass(subMenuShownClassName);
    }
  });

  // Только сокрытие подменю 2го уровня (всех)
  $('[data-main-nav-submenu-hide]').on('click', function(e){
    e.preventDefault();
    all2LevelMenuHide();
  });

  // Сокрытие видимости всех подменю 2го уровня
  function all2LevelMenuHide() {
    $('.'+subMenuShownClassName).removeClass(subMenuShownClassName);
  }

}());
