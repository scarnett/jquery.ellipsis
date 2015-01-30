// jquery.ellipsis.js
// https://github.com/scarnett/jquery.ellipsis
// 01-29-2015, Scott Carnett, MIT License
(function($) {
    $.fn.ellipsis = function(options) {
        var defaults = {
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
            if (wrapperWidth == null) {
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
                    var timer = window.setTimeout(function () {
                        wrapper.css('overflow', 'visible');
                        parentContainer.css('overflow', 'visible');
                        
                        var text = wrapper.text();
                        var overlay = $('<span class="ellipsisOverlay"/>');
                        var anchor = wrapper.find('a');
                        if (anchor.length) {
                            overlay.html(anchor.clone().html(text.replace('...', '')));
                        }
                        else {
                            overlay.html(wrapper.clone().html(text.replace('...', '')));
                        }
                        
                        overlay.appendTo(wrapper);
                        
                        var pos = $(wrapper).offset();
                        $(overlay).css({
                            'position': 'absolute',
                            'zIndex': 5000,
                            'left': '-5px',
                            'top': '-5px'
                        });
                        
                       wrapper.children().first().css('visibility', 'hidden');
                    }, options.timeout);
                    
                    wrapper.data('timerId', timer);
                },
                function() {
                    var timerId = wrapper.data('timerId');
                    if (timerId != null) {
                        window.clearTimeout(timerId);
                        $.removeData(wrapper, 'timerId');
                    }
                    
                    $('span.ellipsisOverlay', wrapper).remove();
                    wrapper.css('overflow', 'hidden');
                    wrapper.children().first().css('visibility', 'visible');
                    parentContainer.css('overflow', 'visible');
                });
            }
        });
    };
})(jQuery);