// jquery.ellipsis.js
// https://github.com/scarnett/jquery.ellipsis
// 01-29-2015, Scott Carnett, MIT License
(function($) {
    $.fn.ellipsis = function(options) {
        var defaults = {
            container: $('body'),
            timeout: 600
        };

        options = $.extend(defaults, options);
        
        var wrappers = $(this);
        wrappers.each(function() {
            var wrapper = $(this);
            
            if (!wrapper.children().length) {
                wrapper.wrapInner('<span/>');
            }
            
            var wrapperWidth = wrapper.children().width();
            if (wrapperWidth === null) {
                wrapperWidth = wrapper.width();
            }
            
            var parentContainer = wrapper.parent();
            parentContainer.css({
                'overflow': 'hidden'
            });
            
            var maxWidth = parentContainer.width();
            if ((wrapperWidth > maxWidth) && !wrapper.data('ellipsisWrapped')) {
                wrapper.data('ellipsisWrapped', true);
                
                var ellipsis = $('<span class="ellipsis"/>');
                ellipsis.html('...');
                ellipsis.appendTo(wrapper);
                ellipsis.css('right', -1);
                
                wrapper.mouseenter(function() {
                    var timer = window.setTimeout(function() {
                        var pos = wrapper.offset();
                        parentContainer.css('overflow', 'visible');
                        
                        var text = wrapper.text();
                        var overlay = $('<span class="ellipsisOverlay"/>');
                        var anchor = wrapper.find('a');
                        if (anchor.length) {
                            overlay.html(anchor.clone().html(text.replace('...', '').trim()));
                        }
                        else {
                            overlay.html(wrapper.clone().html(text.replace('...', '').trim()));
                        }
                        
                        if (options.container !== undefined) {
                            overlay.appendTo(options.container);
                        }
                        else {
                            overlay.appendTo(wrapper);
                        }
                        
                        overlay.css(positionIt(pos));
                        overlay.mouseleave(function() {
                            hideIt(wrapper, parentContainer);
                        });
                        
                        wrapper.children().first().css('visibility', 'hidden');
                    }, options.timeout);
                    
                    wrapper.data('timerId', timer);
                });
            }
            else if ((wrapperWidth <= maxWidth) && wrapper.data('ellipsisWrapped')) {
                $('span.ellipsis', wrapper).remove();
                wrapper.removeAttr('style');
                wrapper.data('ellipsisWrapped', false);
            }
        });
        
        function hideIt(wrapper, parentContainer) {
            var timerId = wrapper.data('timerId');
            if (timerId !== null) {
                window.clearTimeout(timerId);
                $.removeData(wrapper, 'timerId');
            }
            
            if (options.container !== undefined) {
                $('span.ellipsisOverlay', options.container).remove();
            }
            else {
                $('span.ellipsisOverlay', wrapper).remove();
            }
            
            wrapper.children().first().css('visibility', 'visible');
            parentContainer.css('overflow', 'visible');
        };
        
        function positionIt(pos) {
            var css = {};
            
            if (options.container !== undefined) {
                css = {
                    'position': 'absolute',
                    'zIndex': 5000,
                    'left': (pos.left - 5),
                    'top': (pos.top - 5)
                };
            }
            else {
                css = {
                    'position': 'absolute',
                    'zIndex': 5000,
                    'left': '-5px',
                    'top': '-5px'
                };
            }
            
            return css;
        };
    };
})(jQuery);