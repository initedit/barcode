$(document).ready(initApp);
var BARCODE_TYPE = "auto";
var BARCODE_PER_ROW = 3;
var TIMEOUT_BARCODE_DATA_CHANGED = null;
function initApp(){
    $("#barcode-input").on("input",function(){
        clearTimeout(TIMEOUT_BARCODE_DATA_CHANGED);
        TIMEOUT_BARCODE_DATA_CHANGED = setTimeout(refreshBarcode,20);
    });

    $("#barcode-size .dropdown-menu li").click(function(){
        
        var $li = $(this);
        var item = $li.text().trim();
        item = parseInt(item);
        BARCODE_PER_ROW = item;
        $("#barcode-size .title").html(item);
        refreshBarcode();
    });
    $("#barcode-type .dropdown-menu li").click(function(){
        
        var $li = $(this);
        var item = $li.text().trim();
        BARCODE_TYPE = item;
        $("#barcode-type .title").html(item);
        refreshBarcode();
    });
    $("#barcode-size .dropdown-menu li:nth-child("+(BARCODE_PER_ROW)+")").click();

    $(".btn-print").click(function(){
        var data = $("#barcode-input").val().trim();
        if(data.length>0){
            window.print();
        }
    });

}
// JsBarcode("#barcode", "1234", {
//     format: "pharmacode",
//     lineColor: "#0aa",
//     width:4,
//     height:40,
//     displayValue: false
//   });
function barcodeDataChanged(){
    var data = $(this).val();
    generateBarcode(data);
}

function refreshBarcode(){
    var data = $("#barcode-input").val();
    generateBarcode(data);
}

function generateBarcode(data){
    var dataArray = data.trim().split("\n");
    var $barcodeContainer = $("#barcode-container");
    $barcodeContainer.html("");
    var option = {
        format:BARCODE_TYPE
    };
    if(BARCODE_TYPE==="auto" || BARCODE_TYPE==="Auto"){
        option={};
    }
    var errorOption = {
        lineColor: "#660000",
        text: "Error"
    };
    for(var i=0;i<dataArray.length;i++){
        
        var item = dataArray[i].trim();
        if(item.length===0){
            continue;
        }
        var $bar = $($("#barcode-template").html());
        var col_name = "col-sm-"+(12/BARCODE_PER_ROW);
        $bar.addClass(col_name);
        $barcodeContainer.append($bar);
       
        try{
            $bar.find(".svg-barcode").JsBarcode(item,option);
            if($bar.width()<$bar.find(".svg-barcode").width()){
                $bar.width($bar.find(".svg-barcode").width());
            }
        }catch(ex){
            console.log(ex);
            $bar.find(".svg-barcode").JsBarcode("Error",errorOption);
        }
    }
}