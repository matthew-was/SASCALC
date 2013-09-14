
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
        sourceAp:50.0,
        wavelength:6.0,
        wavelengthMin:4,
        wavelengthMax:20,
        wlSpread:0.125,
        lenses:true
    };
    
    function getVariables() {
        usefulVars["Instr"]= $('input[name="radio"]:checked').val();
        usefulVars["guides"]= $( "#guides-slider" ).slider( "value" );
        usefulVars["detector"]= $( "#detector-slider" ).slider( "value" );
        usefulVars["offset"]= $( "#offset-slider" ).slider( "value" );
        usefulVars["sampPosn"]= $('input[name="sampPosn"]:checked').val();
        sampApCheck();
        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
        usefulVars["wavelength"]=parseFloat($("#wavelength").val());
        usefulVars["wlSpread"]=parseFloat($('select[id="wlSpread"]').val());
        usefulVars["lenses"]=document.getElementById("lens").checked;
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
                usefulVars["wavelengthMin"] = 4;
                usefulVars["wavelengthMax"] = 20;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                document.getElementById("lens").disabled=false;
                break;
            case "NG7":
                usefulVars["guidesMax"] = 8;
                usefulVars["detMin"] = 100;
                usefulVars["detMax"] = 1531;
                usefulVars["wavelengthMin"] = 4;
                usefulVars["wavelengthMax"] = 20;
                document.getElementsByName("sampPosn")[0].disabled=false;
                document.getElementsByName("sampPosn")[1].disabled=false;
                document.getElementById("lens").disabled=false;
                break;
            case "NGB":
                usefulVars["guidesMax"] = 2;
                usefulVars["detMin"] = 106;
                usefulVars["detMax"] = 525;
                usefulVars["wavelengthMin"] = 3;
                usefulVars["wavelengthMax"] = 30;
                document.getElementsByName("sampPosn")[0].disabled=true;
                document.getElementsByName("sampPosn")[1].disabled=true;
                document.getElementById("lens").checked=false;
                document.getElementById("lens").disabled=true;
                lenses();
                break;
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
        $("#wavelength").spinner({
            min:usefulVars["wavelengthMin"],
            max:usefulVars["wavelengthMax"]
        });
        getVariables();
        sourceApChange();
        wlSpreadChange();
        lenses();
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
        getVariables();
    }
   
    function manApChange(){
        var manApVal = document.getElementById("manAp");
        if(isNaN(parseFloat(manApVal.value)) === true ){
            manApVal.value=10;
            usefulVars["sampAp"] = parseFloat(manApVal.value);
        } else {
            usefulVars["sampAp"] = parseFloat(manApVal.value);
        }
        getVariables();
    };
    
    function sampApCheck() {
        var manApVal = document.getElementById("manAp");
        var sampApCheck = $('select[id="sampAp"]').val();
        if (sampApCheck === "Other") {
            usefulVars["sampAp"]= parseFloat(manApVal.value);
        } else {
            usefulVars["sampAp"]= parseFloat($('select[id="sampAp"]').val());
        }        
    };
    
    function sourceApChange(){
        getVariables();
        switch (usefulVars["Instr"]) {
            case "NG3":
                switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="14.3">14.3mm</option><option value="25.4">25.4mm</option><option value="38.1">38.1mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break
                    case 7:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option><option value="25.0">25.0mm</option><option value="9.5">9.5mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break
                    default:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break
                }
                break
            case "NG7":
               switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="14.3">14.3mm</option><option value="22.2">22.2mm</option><option value="38.1">38.1mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break
                    default:
                        $("#sourceAp").html('<option value="50.8">50.8mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break    
                }
                break
            case "NGB":
               switch (usefulVars["guides"]) {
                    case 0:
                        $("#sourceAp").html('<option value="13.0">13.0mm</option><option value="25.0">25.0mm</option><option value="38.0">38.0mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break
                    default:
                        $("#sourceAp").html('<option value="50.0">50.0mm</option>');
                        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
                        break    
                }
                break
        }
    };
    
    function sourceApClick() {
        usefulVars["sourceAp"]=parseFloat($("#sourceAp").val());
    };

    function wlSpreadClick() {
        usefulVars["wlSpread"]=parseFloat($("#wlSpread").val());
    };

    function wlSpreadChange(){
        getVariables();
        switch (usefulVars["Instr"]) {
            case "NG3":
                $("#wlSpread").html('<option value=0.109>0.109</option><option value=0.125 selected="selected">0.125</option><option value=0.236>0.236</option>');
               break
            case "NG7":
                $("#wlSpread").html('<option value=0.090>0.090</option><option value=0.115 selected="selected">0.115</option><option value=0.220>0.220</option>');
                break
            case "NGB":
                $("#wlSpread").html('<option value=0.100>0.100</option><option value=0.132 selected="selected">0.132</option><option value=0.154>0.154</option><option value=0.250>0.250</option>');
                break
        }
        getVariables();
    };
    
    function lenses() {
    var checkedState = document.getElementById("lens").checked;
    if (checkedState === true) {
        cssRuleFinder();
        $("#guides-slider").slider({
            value:0
        });
        $("#guides-slider").slider("disable");
        $( "#guides" ).val( $( "#guides-slider" ).slider( "value" ) );
        $("#guides").spinner("disable");
        $("#detector-slider").slider({
           value:usefulVars["detMax"] 
        });
        $("#detector-slider").slider("disable");
        $( "#detector" ).val( $( "#detector-slider" ).slider( "value" ) );
        $("#detector").spinner("disable");
        $("#offset-slider").slider({
           value:0
        });
        $("#offset-slider").slider("disable");        
        $( "#offset" ).val( $( "#offset-slider" ).slider( "value" ) );
        $("#offset").spinner("disable");
        $("#wavelength").spinner("value","8.4");
        $("#wavelength").spinner("disable");
        cssRuleFinder(checkedState);
    } else {
        $("#guides-slider").slider("enable");
        $("#guides").spinner("enable");
        $("#detector-slider").slider("enable");
        $("#detector").spinner("enable");
        $("#offset-slider").slider("enable");
        $("#offset").spinner("enable");
        $("#wavelength").spinner("enable");
        cssRuleFinder(checkedState);
    }
    getVariables();
    };
    
    function cssRuleFinder(checkState) {
        for (i=0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href.indexOf("widgetStyle.css") !== -1) {
                for (j=0; j < document.styleSheets[i].rules.length; j++){
                    if (document.styleSheets[i].rules[j].selectorText === ".ui-widget-content .ui-state-default") {
                        if (checkState === true) {
                            document.styleSheets[i].rules[j].style.background = "lightgrey";
                        } else {
                            document.styleSheets[i].rules[j].style.background = "grey";                            
                        }
                    }
                }
            };
        }
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


    $(function() {
       $("#wavelength").spinner({
           min:4,
           max:20,
           step:0.1,
           change: function (event, ui ) {
               checkVal= $( "#wavelength" ).spinner( "value" );
                if ( checkVal > 20) {
                    $( "#wavelength" ).spinner({
                        value:20
                    });
                } else if ( checkVal < 4) {
                    $( "#wavelength" ).spinner({
                        value:4
                    });
                }
                getVariables();
            }
       }) ;
     });
    
    