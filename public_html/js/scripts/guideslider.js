/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


    var usefulVars = {
        Instr:"empty"
    };

    $('input[name="radio"]:checked').val();

    function handleClick(myRadio) {
        usefulVars["Instr"] = $('input[name="radio"]:checked').val();
        var result = $("#select-result").empty();
        result.append($('input[name="radio"]:checked').val());
//        switch(usefulVars["Instr"])
//            {
//                case "NG3":
//                    result.append("NG3");
//                break;
//                case "NG7":
//                    result.append("NG7");
//                break;
//                case "NGB":
//                    result.append("NGB");
//                break;
//                default:
//                console.log("Something went wrong");
//        }
//        console.log("result = " + result);
      
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
