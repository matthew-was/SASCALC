
var usefulVars = {
        Instr:"NG3",
        guides:1,
        guidesMax:8,
        detector:400,
        detMin:133,
        detMax:1377,
        offset:0,
        sampPosn:"Chamber"
    };
    
    function getVariables() {
        usefulVars["Instr"]= $('input[name="radio"]:checked').val();
        usefulVars["guides"]= $( "#guides-slider" ).slider( "value" );
        usefulVars["detector"]= $( "#detector-slider" ).slider( "value" );
        usefulVars["offset"]= $( "#offset-slider" ).slider( "value" );
        usefulVars["sampPosn"]= $('input[name="sampPosn"]:checked').val();
    };

    function handleClick(myRadio) {
        usefulVars["Instr"] = $('input[name="radio"]:checked').val();
        var result = $("#select-result").empty();
        result.append($('input[name="radio"]:checked').val());
        resetInstrument();    }
    
    function resetInstrument() {
        getVariables ();
        switch (usefulVars["Instr"]) {
            case "NG3":
                usefulVars["guidesMax"] = 8;
                usefulVars["detMin"] = 133;
                usefulVars["detMax"] = 1377;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                break;
            case "NG7":
                usefulVars["guidesMax"] = 8;
                usefulVars["detMin"] = 100;
                usefulVars["detMax"] = 1531;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                break;
            case "NGB":
                usefulVars["guidesMax"] = 2;
                usefulVars["detMin"] = 106;
                usefulVars["detMax"] = 525;
                document.getElementsByName("sampPosn")[0].disabled=true;
                document.getElementsByName("sampPosn")[1].disabled=true;
                break;
            default:
                console.log("Something went wrong");
        }
        $("#guides").spinner({
           min:0,
           max:usefulVars["guidesMax"]
        }),
        $("#guides-slider").slider({
            value:1,
            min: 0,
            max:usefulVars["guidesMax"],
            slide: function( event, ui ) {
                $( "#guides" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#guides" ).val( $( "#guides-slider" ).slider( "value" ) );
        $( "#detector" ).spinner({
            min:usefulVars["detMin"],
            max:usefulVars["detMax"]
        }), 
        $("#detector-slider").slider({
            value:400,
            min:usefulVars["detMin"],
            max:usefulVars["detMax"],
             slide: function( event, ui ) {
                $( "#detector" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
    }
    
    
    $(function(){
        $("#radio").buttonset();
    });

    $(function() {
        $( "#guides-slider" ).slider({        
        value: usefulVars["guides"],
        min: 0,
        max: usefulVars["guidesMax"],
        slide: function( event, ui ) {
            $( "#guides" ).val( ui.value );
        },
        change: function(event, ui) {
            getVariables();
        }
        });
        $( "#guides" ).val( $( "#guides-slider" ).slider( "value" ) );
    });

    $(function() {
        $( "#guides" ).spinner({
            min:0,
            max:usefulVars["guidesMax"],
            stop: function( event, ui ) {
                $( "#guides-slider" ).slider({
                    value:$( "#guides" ).spinner( "value" )
                });
                getVariables();
            },
            change: function (event, ui ) {
                checkVal= $( "#guides" ).spinner( "value" );
                if ( checkVal > usefulVars["guidesMax"]) {
                    $( "#guides" ).spinner({
                        value:usefulVars["guidesMax"]
                    });
                } else if (checkVal < 0) {
                    $( "#guides" ).spinner({
                        value:0
                    });
                }
                getVariables();
            }
        });
    });

       $(function() {
        $( "#detector-slider" ).slider({        
        value: usefulVars["detector"],
        min: usefulVars["detMin"],
        max: usefulVars["detMax"], 
            slide: function( event, ui ) {
                $( "#detector" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();
            }
        });
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
    });

    $(function() {
        $( "#detector" ).spinner({
            min:usefulVars["detMin"],
            max:usefulVars["detMax"],
            stop: function( event, ui ) {
                $( "#detector-slider" ).slider({
                    value:$( "#detector" ).spinner( "value" )
                });
            getVariables();
            },
            change: function (event, ui ) {
                checkVal= $( "#detector" ).spinner( "value" );
                if ( checkVal > usefulVars["detMax"]) {
                    $( "#detector" ).spinner({
                        value:usefulVars["detMax"]
                    });
                } else if (checkVal < usefulVars["detMin"]) {
                    $( "#detector" ).spinner({
                        value:usefulVars["detMin"]
                    });
                }
                getVariables();
            }
       });
    });

    $(function() {
        $( "#offset-slider" ).slider({
            orientation: "vertical",
            min: 0,
            max: 25,
            value: usefulVars["offset"],
            slide: function( event, ui ) {
                $( "#offset" ).val( ui.value );
            },
            change: function(event, ui) {
                getVariables();  
            }
        });
        $( "#offset" ).val( $( "#offset-slider" ).slider( "value" ) );
     });

    $(function() {
        var checkVal = 0;
        $( "#offset" ).spinner({
            min:0,
            max:25,
            stop: function( event, ui ) {
                $( "#offset-slider" ).slider({
                    value:$( "#offset" ).spinner( "value" )
                });
                getVariables();
            },
            change: function (event, ui ) {
                checkVal= $( "#offset" ).spinner( "value" );
                if ( checkVal > 25) {
                    $( "#offset" ).spinner({
                        value:25
                    });
                } else if ( checkVal < 0) {
                    $( "#offset" ).spinner({
                        value:0
                    });
                }
                getVariables();
            }
        });
    });
