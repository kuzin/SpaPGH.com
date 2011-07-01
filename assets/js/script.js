
$(function(){
    function filterPath(string) {
        return string
        .replace(/^\//,'')
        .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
        .replace(/\/$/,'');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');
    $('a[href*=#]').each(function() {
        var thisPath = filterPath(this.pathname) || locationPath;
        if (  locationPath == thisPath
        && (location.hostname == this.hostname || !this.hostname)
        && this.hash.replace(/#/,'') ) {
            var $target = $(this.hash), target = this.hash;
            if (target) {
                var targetOffset = $target.offset().top;
                $(this).click(function(event) {
                    event.preventDefault();
                    $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
                        location.hash = target;
                    });
                });
            }
        }
    });
    // Use the first element that is "scrollable"  (cross-browser fix?)
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
            var el = arguments[i],
            $scrollElement = $(el);
            if ($scrollElement.scrollTop()> 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop()> 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    };
    $('#form_btn').click(function(){
        $('#contact_form').submit();
        return false;
    });
    $('#contact-form').validate({
        rules: {
            name: 'required',
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: 'Please enter your name',
            email:  "Please enter a valid email address"
        }
    });

    $('#name').focus(function(){
        if ($(this).attr('value') == 'Name') {
            $(this).attr('value', '').css({color:'#5D8EA2'});
        }
    }).blur(function(){
        if ($(this).attr('value') == '') {
            $(this).attr('value', 'Name').css({color:'#ccc'});
        }
    });
    $('#email').focus(function(){
        if ($(this).attr('value') == 'Email') {
            $(this).attr('value', '').css({color:'#5D8EA2'});
        }
    }).blur(function(){
        if ($(this).attr('value') == '') {
            $(this).attr('value', 'Email').css({color:'#ccc'});
        }
    });
    $('#message').focus(function(){
        if ($(this).text() == 'Message') {
            $(this).text('');
            $(this).css({color:'#5D8EA2'});
        }
    }).blur(function(){
        if ($(this).text() == '') {
            $(this).text('Message');
        }
    });
});

$(window).load(function(){
    $('#slider').nivoSlider({effect: 'fade'});
    $('#home-slider').nivoSlider({effect: 'fade'});
});