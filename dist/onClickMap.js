// ========= config section ================================================
var srsName = 'EPSG:4326';
var geometryName = 'geom';
var geometryType = 'MultiPolygon';
var fields = ['*'];
var infoFormat = 'application/vnd.ogc.gml/3.1.1';
var zoom = 13;
// =========================================================================
var proj = new ol.proj.Projection({
    code: 'http://www.opengis.net/gml/srs/epsg.xml#4326',
    axis: 'enu'
});

var codigo_ant = "";
var panoramica="";
var tamañopantalla = screen.width>800;  

function putgif() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 0);
        document.getElementById('loader').style.display = "block";
    });
}
function quitgif() {
    document.getElementById('loader').style.display = "none";
}

//interaction with map on click
function getInteractionMap(feat,wmsSource,format,coordinate,viewResolution,viewProj,infoFormat,srsName,wms,form){
    console.log(wmsSource);
    var url = wmsSource.getFeatureInfoUrl(
        coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
    console.log(url)
    if (url) {
        fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (html) {
           console.log(html);
          });
        // $.ajax({
        //     dataType: "json",
        //     async: true,
        //     type: 'GET',
        //     url: url,
        //     secure: true,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     success: function (data) {
        //         console.log(data);
        //         var features = format.readFeatures(data);
        //         try{
        //             var pic = features[0].values_.url;
        //         }catch{
        //             var pic = null
        //         }
        //         try{
        //             var data= features[0].values_.landuse
        //         }catch{
        //             var data = null
        //         }
        //         if(pic){
        //             console.log(pic != null);
        //             document.getElementById("modal_cont").innerHTML = '<iframe src="'+pic+'" width="100%" height="400px" style="border:none;">';
        //             document.getElementById("title_modal").innerHTML = '<b>360 Image Visualizer</b>';
        //             document.getElementById('modal').style.display = "block";
                    
        //         }else if(data != null && pic == null){
        //                 var datos = features[0].values_;
        //                 var table = '<table class="tg">\
        //                 <thead>\
        //                   <tr>\
        //                     <th class="tg-6pte">Item</th>\
        //                     <th class="tg-6pte">Value</th>\
        //                   </tr>\
        //                 </thead>\
        //                 <tbody>\
        //                   <tr>\
        //                     <td class="tg-c3ow">Location</td>\
        //                     <td class="tg-c3ow">Panama: provinces panama, Darien and Veraguas</td>\
        //                   </tr>\
        //                   <tr>\
        //                     <td class="tg-c3ow">Area Hectareas</td>\
        //                     <td class="tg-c3ow">'+datos.area_ha+'</td>\
        //                   </tr>\
        //                   <tr>\
        //                     <td class="tg-c3ow">LandUse</td>\
        //                     <td class="tg-c3ow">'+datos.landuse+'</td>\
        //                   </tr>\
        //                 </tbody>\
        //                 </table><br>';
        //                 document.getElementById("modal_cont").innerHTML = table
        //                 document.getElementById("title_modal").innerHTML = '<b>Attribute Table</b>'
        //                 document.getElementById('modal').style.display = "block"
        //             }
                
        //     },
        //     complete: function(){
        //         if (tamañopantalla==true){quitgif(); }
        //         else{
        //         document.getElementById("carga3").style.display = "none";  
        //         }
        //     },
        //     error: function(XMLHttpRequest, textStatus, errorThrown) { 
        //         alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        //     }   
        // });
    }  
}