// jquery.ellipsis.js
// https://github.com/scarnett/jquery.ellipsis
// 01-29-2015, Scott Carnett, MIT License
(function ($) {
    $.fn.ellipsis = function(options) {
        var defaults = {
            container: 'body',
            timeout: 600
        };
        
        options = $.extend(defaults, options);
        
        var wrappers = $(this);
        wrappers.each(function() {
            var wrapper = $(this);
            var container = getContainer(wrapper);
            
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
            if (wrapperWidth > maxWidth) {
                var ellipsis = $('<span class="ellipsis"/>');
                ellipsis.html('...');
                ellipsis.appendTo(wrapper);
                ellipsis.css('right', -1);
                
                wrapper.hover(function() {
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
                        
                        overlay.appendTo(container);
                        overlay.css(positionIt(pos));
                        
                        wrapper.children().first().css('visibility', 'hidden');
                    }, options.timeout);
                    
                    wrapper.data('timerId', timer);
                }, function() {
                    hideIt(wrapper, parentContainer);
                });
            }
            else if (wrapperWidth <= maxWidth) {
                $('span.ellipsis', wrapper).remove();
                wrapper.removeAttr('style');
            }
        });
        
        function hideIt(wrapper, parentContainer) {
            var container = getContainer(wrapper);
            var ellipsisOverlay = $('.ellipsisOverlay', container);
            var timerId = wrapper.data('timerId');
            
            if (ellipsisOverlay.length && !ellipsisOverlay.hasClass('is-hover')) {
                ellipsisOverlay.hover(function() {
                    $(this).addClass('is-hover');
                }, function() {
                    $(this).removeClass('is-hover');
                    clearTimerAndHide(wrapper, parentContainer, container, timerId);
                });
            }
            else {
                clearTimerAndHide(wrapper, parentContainer, container, timerId);
            }
        };
        
        function clearTimerAndHide(wrapper, parentContainer, container, timerId) {
            if (timerId !== null) {
                window.clearTimeout(timerId);
                $.removeData(wrapper, 'timerId');
            }
            
            $('span.ellipsisOverlay', container).remove();
            
            wrapper.children().first().css('visibility', 'visible');
            parentContainer.css('overflow', 'visible');
        }
        
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
        
        function getContainer(wrapper) {
            var container;
            
            if (options.container !== undefined) {
                container = $(options.container);
            }
            else {
                container = wrapper;
            }
            
            return container;
        }
    };
    
    $(document).ready(function() {
        $('.ellipsisWrapper').ellipsis();
    });
})(jQuery);