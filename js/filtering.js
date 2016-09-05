"use strict";

var AppNamespace = {
    animateWarning: function ( $warningText ) {
        $warningText.textillate({ in : {
                effect: 'flip'
            },
            out: {
                effect: 'noneOut',
                sync: true
            },
            loop: true
        });
    }
    , openorhideterritorydiv : function ($openhidebutton){
        $openhidebutton.on('click', function(){
         
          	$('.territory').toggle(450);
           $('territory').animate({height:40},700);
        })
        
    }
     , openorhidradioboxdiv : function ($openhideradioboxbutton){
        $openhideradioboxbutton.on('click', function(){
         
          	$('.radiobuttondiv').toggle(450);
        })
        
    }
    , assignClassesToButtons: function ( $buttons ) {
        $buttons.addClass('All');

        $buttons.filter(function (index) {
            return ($buttons.eq(index).css('background-color') === 'rgb(255, 0, 0)');
        }).addClass('Red');

        $buttons.filter(function (index) {
            return ($buttons.eq(index).css('background-color') === 'rgb(0, 128, 0)');
        }).addClass('Green');

        $buttons.filter(function (index) {
            return ($buttons.eq(index).css('background-color') === 'rgb(0, 0, 255)');
        }).addClass('Blue');

        $buttons.filter(function (index) {
            return ($buttons.eq(index).css('background-color') === 'rgb(255, 165, 0)');
        }).addClass('Orange');

        $buttons.filter(function (index) {
            return ($buttons.eq(index).css('background-color') === 'rgb(128, 128, 128)');
        }).addClass('Gray');
    }
    , assignIdsToButtons: function ( $buttons ) {
        $buttons.each(function (index) {
            $buttons.eq(index).attr('id', 'button - ' + index);
        });
    }
    , bindButtonEvents: function ( $buttons, $warningText ) {
        $buttons.on('click', function () {
            $buttons.filter(':hidden').show();
            $(this).hide(450);
        });
    }
    , filterButtons: function ( $buttons ) {
        var $checkboxes = $('.cBox');
        
        $checkboxes.on('click', function () {
            //get all the checked checkboxes
            var $checked = $checkboxes.filter(':checked');

            //if any of them are checked we need to filter buttons
            if ($checked.length) {
                $buttons.hide();

                $checked.each(function (checkboxIndex) {
                    $buttons.filter(function (buttonIndex) {
                        return ($buttons.eq(buttonIndex).hasClass($checked.eq(checkboxIndex).val()));
                    }).show(450);
                });
            } else {
                //none were checked so show all
                $buttons.show(450);
            }
        });
    }
    , showWarningIfErrorColorsAreDisplayed: function ( $buttons, $warningText ) {
        if ($buttons.filter('.Red, .Orange, .Gray').filter(':visible').length) {
            $warningText.show();
        } else {
            $warningText.hide();
        }
    }
    , sortButtons: function ( $buttons ) {
        $buttons.parent()
            .prepend($buttons.filter('.Green'))
            .prepend($buttons.filter('.Blue'))
            .prepend($buttons.filter('.Gray'))
            .prepend($buttons.filter('.Orange'))
            .prepend($buttons.filter('.Red'));
    }
    , toggleTableExpansion: function ( $buttons, $warningText ) {
        var $arrowIcon = $('.arrow');
    	var $territories = $('.territory');
    	
        $arrowIcon.on('click', function () {
            $arrowIcon.toggleClass('reverseArrow');
            $warningText.toggleClass('hidden');
            $territories.toggleClass('enlarge');
            $buttons.toggleClass('displaydifferent');
        });
	}
};

$(function () {
    var $buttons = $('.buttonClass');
    var $openhidebutton = $('.showhidebuttonterritory');
    var $openorhideradiobutton = $('.showhidebuttonradiobox');
    var $warningText = $('.text');
    AppNamespace.openorhidradioboxdiv($openorhideradiobutton);
	AppNamespace.openorhideterritorydiv($openhidebutton);
    AppNamespace.toggleTableExpansion( $buttons, $warningText );
    AppNamespace.animateWarning( $warningText );
    AppNamespace.assignClassesToButtons( $buttons );
    AppNamespace.sortButtons( $buttons );
    AppNamespace.assignIdsToButtons( $buttons );
    AppNamespace.showWarningIfErrorColorsAreDisplayed( $buttons, $warningText );
    AppNamespace.bindButtonEvents( $buttons, $warningText );
    AppNamespace.filterButtons( $buttons );
});
