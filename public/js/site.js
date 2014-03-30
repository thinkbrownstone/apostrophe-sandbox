// Truly site-specific JS
//
// YOU SHOULD USE .on ON THE BODY, to avoid problems recognizing events
// on elements added later. Example:
//
// RIGHT
//
// // I work with content added later
// $(function() {
//   $('body').on('click', '.my-selector', function() { ... })
// }
//
// WRONG
//
// // I won't work with content added dynamically!
// $(function() {
//   $('.my-selector').click(function() { ... })
// });
//
// If this doesn't work for your needs, listen for the 'aposReady'
// event on the body element, and update your event handlers on other
// elements whenever your receive it, taking care NOT to double-bind.
// Use jQuery's $.data to figure out if you've bound this element already.
//
// Example:
//
// $('body').on('aposReady', function() {
//   $('.my-fancy-things').each(function() {
//     var $thing = $(this);
//     if (!$thing.data('aposLive')) {
//       $thing.data('aposLive', true);
//       // Do stuff with $thing that's so amazing you can't do it with
//       // event handlers on 'body' filtered by a selector
//     }
//   });
// });

$(function() {

    /* Site-wide JS goes here
    ------------------------------------------------------------ */

    /*
        applies a class to an element at a specified window scroll position, throttled to check every 50ms
        onStart and onEnd events to apply different styling
    */
    var StickyElement = function (element, data) {
        this.element = element;
        this.className = data.className;
        this.startAltStyle = data.startAltStyle || 0;
        this.addSpecialClass = data.addSpecialClass || function () { };
        this.removeSpecialClass = data.removeSpecialClass || function () { };
        this.throttleDuration = data.throttle || 50;
        this.isThrottled = false;

        if (this.element.length !== 0) {
            this.init();
        }
    };

    StickyElement.prototype.init = function () {
        var self = this;

        $(window).bind("scroll", function () {
            if (self.isThrottled) {
                return;
            }
            self.isThrottled = true;
            setTimeout(function () {
                self.checkScroll();
                self.isThrottled = false;
            }, self.throttleDuration);
        });
    };

    StickyElement.prototype.checkScroll = function () {
        var winScroll = $(window).scrollTop();
        if (winScroll >= this.startAltStyle) {
            this.addSpecialClass();
        } else {
            this.removeSpecialClass();
        }
    };

    (function($){
        if ($('.site-header').length) {
            var nav = new StickyElement($('.site-header'), {
                $stickyEl: $('.site-header'),
                className : 'opaque',
                startAltStyle : $('.site-header').offset().top + $('.site-header').height(),
                addSpecialClass : function() {
                    this.element.addClass('opaque');
                },
                removeSpecialClass: function() {
                    this.element.removeClass('opaque');
                }
            });
        }
    })(jQuery);

});

