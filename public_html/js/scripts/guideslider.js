
var usefulVars = {
        Instr:"NG3",
        guides:1,
        guidesMax:8,
        detector:400,
        detMin:133,
        detMax:1377,
        offset:0,
        sampPosn:"Chamber",
        sampAp:12.7,
        sourceAp:50.0
    };
    
    function getVariables() {
        usefulVars["Instr"]= $('input[name="radio"]:checked').val();
        usefulVars["guides"]= $( "#guides-slider" ).slider( "value" );
        usefulVars["detector"]= $( "#detector-slider" ).slider( "value" );
        usefulVars["offset"]= $( "#offset-slider" ).slider( "value" );
        usefulVars["sampPosn"]= $('input[name="sampPosn"]:checked').val();
        usefulVars["sampAp"]= parseFloat($('select[id="sampAp"]').val());
    };

    function instClick(myRadio) {
        usefulVars["Instr"] = $('input[name="radio"]:checked').val();
        var result = $("#select-result").empty();
        result.append($('input[name="radio"]:checked').val());
        resetInstrument();
    }
    
    function resetInstrument() {
        getVariables ();
        switch (usefulVars["Instr"]) {
            case "NG3":
                usefulVars["guidesMax"] = 8;
                usefulVars["detMin"] = 133;
                usefulVars["detMax"] = 1377;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                sourceApChange();
                break;
            case "NG7":
                usefulVars["guidesMax"] = 8;
                usefulVars["detMin"] = 100;
                usefulVars["detMax"] = 1531;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                sourceApChange();
                break;
            case "NGB":
                usefulVars["guidesMax"] = 2;
                usefulVars["detMin"] = 106;
                usefulVars["detMax"] = 525;
                document.getElementsByName("sampPosn")[0].disabled=true;
                document.getElementsByName("sampPosn")[1].disabled=true;
                sourceApChange();
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
            }
        });
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
    }

    function sampApClick(){
        var check = $('select[id="sampAp"]').val();
        var manApVal = document.getElementById("manAp");
        if (check === "Other") {
            manApVal.disabled = false;
            manApVal.value="10";
            usefulVars["sampAp"]= parseFloat(manApVal.value);
        } else {
            usefulVars["sampAp"]= parseFloat($('select[id="sampAp"]').val());
            manApVal.disabled = true;
            manApVal.value="";
        }
    }
   
    function manApChange(){
        var manApVal = document.getElementById("manAp");
        if(isNaN(parseFloat(manApVal.value)) === true ){
            manApVal.value=10;
            usefulVars["sampAp"] = manApVal.value;
        } else {
            usefulVars["sampAp"] = manApVal.value;
        }
    };
    
    function sourceApChange(){
        getVariables();
        switch (usefulVars["Instr"]) {
            case "NG3":
                switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="14.3">14.3mm</option><option value="25.4">25.4mm</option><option value="38.1">38.1mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break
                    case 7:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option><option value="25.0">25.0mm</option><option value="9.5">9.5mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break
                    default:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break
                }
                break
            case "NG7":
               switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="14.3">14.3mm</option><option value="22.2">22.2mm</option><option value="38.1">38.1mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break
                    default:
                        $("#sourceAp").html('<option value="50.8">50.8mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break    
                }
                break
            case "NGB":
               switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="13.0">13.0mm</option><option value="25.0">25.0mm</option><option value="38.0">38.0mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break
                    default:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option>');
                        usefulVars["sourceAp"]=$("#sourceAp").val();
                        break    
                }
                break
        }
    };
    
    function sourceApClick() {
        usefulVars["sourceAp"]=$("#sourceAp").val();
    };
    
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
            sourceApChange();
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
                sourceApChange();
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
                sourceApChange();
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
    
    $(function() {
        $("#sourceAp").html('<option value="5.00">5.00cm</option>');
    });
