/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {

var usefulVars = {
    Instr:$('input[name="radio"]:checked').val()
};

$('input[name="radio"]:checked').val();

function handleClick(myRadio) {
    usefulVars[Instr] = $('input[name="radio"]:checked').val();
}

    $(function() {
        $( "#slider-range" ).slider({
        range: "min",
        value: 5,
        min: 0,
        max: 8,
            slide: function( event, ui ) {
                $( "#guides" ).val( ui.value );
            }
        });
        $( "#guides" ).val( $( "#slider-range" ).slider( "value" ) );
    });


    $(function(){
            $("#radio").buttonset();
    });
})(jQuery);
