    
    var usefulVars = {
        Instr:"NG3",
        guides:1,
        detector:400
    };
    
    function getVariables() {
        usefulVars["Instr"]= $('input[name="radio"]:checked').val();
        usefulVars["guides"]= $( "#guides-slider" ).slider( "value" );
        usefulVars["detector"]= $( "#detector-slider" ).slider( "value" );
    };

    function handleClick(myRadio) {
        usefulVars["Instr"] = $('input[name="radio"]:checked').val();
        var result = $("#select-result").empty();
        result.append($('input[name="radio"]:checked').val());
        resetSlider();
        resetDetector();
    }
    
    $(function(){
            $("#radio").buttonset();
    });

    $(function() {
        $( "#guides-slider" ).slider({        
        value: 1,
        min: 0,
        max: 8,
        slide: function( event, ui ) {
            $( "#guides" ).val( ui.value );
        },
        change: function(event, ui) {
            getVariables();
        }
        });
        $( "#guides" ).val( $( "#guides-slider" ).slider( "value" ) );
    });

    function resetSlider() {
        getVariables ();
        var guideVal;
        switch (usefulVars["Instr"]) {
            case "NG3":
                guideVal = 8;
                break;
            case "NG7":
                guideVal = 8;
                break;
            case "NGB":
                guideVal = 2;
                break;
            default:
                console.log("Something went wrong");
        }
        $("#guides-slider").slider({
            value:1,
            max:guideVal,
            slide: function( event, ui ) {
                $( "#guides" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#guides" ).val( $( "#guides-slider" ).slider( "value" ) );
    }
    
       $(function() {
        $( "#detector-slider" ).slider({        
        range: "min",
        value: 400,
        min: 133,
        max: 1377, 
            slide: function( event, ui ) {
                $( "#detector" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
    });

   function resetDetector() {
       getVariables ();
       var detMax;
       var detMin;
        switch (usefulVars["Instr"]) {
            case "NG3":
                detMin = 133;
                detMax = 1377;
                break;
            case "NG7":
                detMin = 100;
                detMax = 1531;
                break;
            case "NGB":
                detMin = 106;
                detMax = 525;
                break;
            default:
                console.log("Something went wrong");
        }
        $("#detector-slider").slider({
            value:400,
            min:detMin,
            max:detMax,
             slide: function( event, ui ) {
                $( "#detector" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
  }