(function ($) {
  window.wb = (function () {
    var settings = {
      prefix: "wb-",
    };

    function isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    }

    function navbarDropdowns(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );
      var prefix = s.prefix;
      if (isTouchDevice()) {
        $("." + prefix + "parent").on("click touch", function (e) {
          e.stopPropagation();
          $(this)
            .siblings()
            .children("." + prefix + "dropdown-nav")
            .removeClass(prefix + "show");
          $(this)
            .children("." + prefix + "dropdown-nav")
            .toggleClass(prefix + "show");
          if (
            $(this)
              .children("." + prefix + "dropdown-nav")
              .hasClass(prefix + "show")
          ) {
            e.preventDefault();
          }
        });
        $("body")
          .not("." + prefix + "parent")
          .on("click touch", function (e) {
            $("." + prefix + "dropdown-nav").removeClass(prefix + "show");
          });
      }
    }

    function mobilemenu(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );
      var prefix = s.prefix;
      // console.log("mobilemenu init");
      var revealBtn = $("." + prefix + "reveal-mobile-menu");
      revealBtn.on("click touch", function (e) {
        var menu = $(this).attr("href");
        $(this).toggleClass(prefix + "on");
        $(menu).toggleClass(prefix + "show");
        e.preventDefault();
      });

      $("." + prefix + "reveal-menu-icon").each(function () {
        var button = $(this);
        button.on("click touch", function (e) {
          $(this).toggleClass(prefix + "on");
          $(this)
            .parent("." + prefix + "mm-parent")
            .toggleClass(prefix + "show");
          e.preventDefault();
          e.stopPropagation();
        });
      });
    }

    function scrolltop(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );
      var prefix = s.prefix;

      var btn = $("." + prefix + "scroll-top");
      $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
          btn.addClass(prefix + "-show");
        } else {
          btn.removeClass(prefix + "-show");
        }
      });

      btn.on("click touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("html, body").animate({ scrollTop: 0 }, 500);
      });
    }

    function audioplayer(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );

      var prefix = s.prefix;
      var audioplayer = $("a." + prefix + "audio-player");

      if (audioplayer.length) {
        $.each(audioplayer, function () {
          var url = $(this).attr("href");
          var player;
          var valid = false;
          if (/\.mp3$/gim.test(url)) valid = true;
          if (/\.m4a$/gim.test(url)) valid = true;
          if (valid) {
            player =
              "<div class='" +
              prefix +
              "audio-player " +
              prefix +
              " -embeded-audio-player'>";
            player +=
              "<span class='" +
              prefix +
              "audio-player-title'>" +
              $(this).html() +
              "</span>";
            player += "<audio controls  class='" + prefix + "embeded-audio'>";
            player += "<source src='" + url + "' type='audio/mpeg'>";
            player += "</audio>";
            player += "</div>";
            $(this).replaceWith(player);
          }
        });
      }
    }

    function pwImages(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );
      var prefix = s.prefix;
      $("img[class*=align_")
        .parent()
        .addClass(prefix + "clear-after");
    }

    function init(params) {
      var s = $.extend(
        {
          prefix: settings.prefix,
        },
        params
      );
      mobilemenu(s);
      scrolltop(s);
      navbarDropdowns(s);
    }
    return {
      init: init,
      mobilemenu: mobilemenu,
      scrolltop: scrolltop,
      pwimages: pwImages,
      navbardropdowns: navbarDropdowns,
      audioplayer: audioplayer,
    };
  })();

  $(function () {
    window.wb.init();
    window.wb.pwimages();
    $("img.lazy, img.lazy-load").lazy({
      effect: "fadeIn",
      effectTime: 800,
      treshold: 0,
    });
  });
})(jQuery);
