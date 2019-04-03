// document.addEventListener('DOMContentLoaded', function(){});

(function(){

  $('[data-show-help-center]').on('click', function(e){
    e.preventDefault();
    $('.help-center').toggleClass('help-center--open');
    $('.page').toggleClass('page--no-scroll');
    if($('.page').hasClass('page--no-scroll')) {
      $('.page-header').css({'padding-right': getScrollbarWidth()});
    }
    else {
      $('.page-header').css({'padding-right': 0});
    }
  });

  function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

}());
