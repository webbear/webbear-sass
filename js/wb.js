(function($){
  window.wb = (function() {
    var settings = {
      prefix: "wb"
    };
    function mobilemenu(params) {
      var s = $.extend({
        prefix: settings.prefix
      }, params);
      var prefix = s.prefix;
      // console.log("mobilemenu init");
      var revealBtn = $("." + prefix + "-reveal-mobile-menu");
      revealBtn.on("click touch", function(e) {
        var menu = $(this).attr("href");
        $(this).toggleClass(prefix + "-on");
        $(menu).toggleClass(prefix + "-show");
        e.preventDefault();
      });

      $("." +prefix + "-reveal-menu-icon").each(function() {
        var button = $(this);
        button.on("click touch", function(e) {
          $(this).toggleClass(prefix + "-on");
          $(this).parent("." + prefix + "-mm-parent").toggleClass(prefix + "-show");
          e.preventDefault();
          e.stopPropagation();
        });
      });
    }

    function scrolltop(params) {
      var s = $.extend({
        prefix: settings.prefix
      }, params);
      var prefix = s.prefix;

      var btn = $("." + prefix + "-scroll-top");
      $(window).scroll(function() {
        if ($(window).scrollTop() > 400) {
          btn.addClass(prefix + '-show');
        } else {
          btn.removeClass(prefix + '-show');
        }
      });

      btn.on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('html, body').animate({ scrollTop: 0 }, 500);
      });
    }

    function pwImages(params) {
      var s = $.extend({
        prefix: settings.prefix
      }, params);
      var prefix = s.prefix;
      $("img[class*=align_").parent().addClass(prefix + "-clear-after");
    }

    function init(params) {
      var s = $.extend({
        prefix: settings.prefix
      }, params);
      mobilemenu(s);
      scrolltop(s);
    }
    return {
      init: init,
      mobilemenu: mobilemenu,
      scrolltop: scrolltop,
      pwimages: pwImages
    };
  })();

  $(function(){

    window.wb.init();
    window.wb.pwimages()
    $('img.lazy, img.lazy-load').lazy({
      effect: "fadeIn",
      effectTime: 800,
      treshold: 0
    });

  });

})(jQuery);