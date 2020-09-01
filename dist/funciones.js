function medir_pol() {
    var source = new ol.source.Vector();

     var vector = new ol.layer.Vector({
       source: source,
       style: new ol.style.Style({
         fill: new ol.style.Fill({
           color: 'rgba(255, 255, 255, 0.2)'
         }),
         stroke: new ol.style.Stroke({
           color: '#ffcc33',
           width: 2
         }),
         image: new ol.style.Circle({
           radius: 7,
           fill: new ol.style.Fill({
             color: '#ffcc33'
           })
         })
       })
     });   
   
     var sketch;
     var helpTooltipElement;
     var helpTooltip;
     var measureTooltipElement;
     var measureTooltip;
     var continuePolygonMsg = '';
     var continueLineMsg = '';
     var pointerMoveHandler = function(evt) {
       if (evt.dragging) {
         return;
       }
       /** @type {string} */
         
       var helpMsg = 'Click to add a point';

       if (sketch) {
         var geom = (sketch.getGeometry());
         if (geom instanceof ol.geom.Polygon) {
          var helpMsg = continuePolygonMsg;
         } else if (geom instanceof ol.geom.LineString) {
           helpMsg = continueLineMsg;
         }
       }

       helpTooltipElement.innerHTML = helpMsg;
       //helpTooltip.setPosition(evt.coordinate);
     };

     map.on('pointermove', pointerMoveHandler);

     map.getViewport().addEventListener('mouseout', function() {
       helpTooltipElement.classList.add('hidden');
     });
     //var draw; // global so we can remove it later
     /*var formatLength = function(line) {
     var length = ol.Sphere.getLength(line);
     var output;
       if (length > 100) {
         output = (Math.round(length / 1000 * 100) / 100) +
             ' ' + 'km';
       } else {
         output = (Math.round(length * 100) / 100) +
             ' ' + 'm';
       }
       return output;
     };*/

   var formatLength = function (line) {
   var length;
   length = Math.round(line.getLength() * 100) / 100;
   var output;
   if (length > 100) {
       output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
   } else {
       output = (Math.round(length * 100) / 100) + ' ' + 'm';
   }
   return output;
};
   
   

     var formatArea = function(polygon) {
     var area;
         area = Math.round(polygon.getArea() * 100) / 100;
       var output;
       if (area > 10000) {
         output = (Math.round(area / 1000000 * 100) / 100) +
             ' ' + 'km<sup>2</sup>';
       } else {
         output = (Math.round(area * 100) / 100) +
             ' ' + 'm<sup>2</sup>';
       }
       return output;
     };

    
     function addInteraction() { 
         var radioSelect = 'area';
         var type = (radioSelect == 'area' ? 'Polygon' : 'LineString');
         draw = new ol.interaction.Draw({
         source: source,
         type: type,
         style: new ol.style.Style({
           fill: new ol.style.Fill({
             color: 'rgba(255, 255, 255, 0.2)'
           }),
           stroke: new ol.style.Stroke({
             color: 'rgba(0, 0, 0, 0.5)',
             lineDash: [10, 10],
             width: 2
           }),
           image: new ol.style.Circle({
             radius: 5,
             stroke: new ol.style.Stroke({
               color: 'rgba(0, 0, 0, 0.7)'
             }),
             fill: new ol.style.Fill({
               color: 'rgba(255, 255, 255, 0.2)'
             })
           })
         })
       });
       map.addInteraction(draw);

       createMeasureTooltip();
       createHelpTooltip();

       var listener;
       draw.on('drawstart',
           function(evt) {
             // set sketch
             sketch = evt.feature;

             /** @type {ol.Coordinate|undefined} */
             var tooltipCoord = evt.coordinate;

             listener = sketch.getGeometry().on('change', function(evt) {
               var geom = evt.target;
               var output;
               if (geom instanceof ol.geom.Polygon) {
                 output = formatArea(geom);
                 tooltipCoord = geom.getInteriorPoint().getCoordinates();
               } else if (geom instanceof ol.geom.LineString) {
                 output = formatLength(geom);
                 tooltipCoord = geom.getLastCoordinate();
               }
               measureTooltipElement.innerHTML = output;
               measureTooltip.setPosition(tooltipCoord);
             });
           }, this);

       draw.on('drawend',
           function() {
             //measureTooltipElement.className = 'tooltip tooltip-static';
             measureTooltip.setOffset([0, -7]);
             // unset sketch
             //sketch = null;
             // unset tooltip so that a new one can be created
             //measureTooltipElement = null;
             createMeasureTooltip();
             //ol.Observable.unByKey(listener);
           }, this);
     }

   
     /**
      * Creates a new help tooltip
      */
     function createHelpTooltip() {
       if (helpTooltipElement) {
         helpTooltipElement.parentNode.removeChild(helpTooltipElement);
       }
       helpTooltipElement = document.createElement('div');
       helpTooltipElement.className = 'tooltip hidden';
       helpTooltip = new ol.Overlay({
         element: helpTooltipElement,
         offset: [15, 0],
         positioning: 'center-left'
       });
       map.addOverlay(helpTooltip);
     }


     /**
      * Creates a new measure tooltip
      */
     function createMeasureTooltip() {
       if (measureTooltipElement) {
         measureTooltipElement.parentNode.removeChild(measureTooltipElement);
       }
       measureTooltipElement = document.createElement('div');
       measureTooltipElement.className = 'tooltip tooltip-measure';
       measureTooltip = new ol.Overlay({
         element: measureTooltipElement,
         offset: [0, -15],
         positioning: 'bottom-center'
       });
       map.addOverlay(measureTooltip);
     }
     addInteraction(); 
   
  // var vector = highlightfeatures.getSource();
}

function medir_line() {

    var source = new ol.source.Vector();

     var vector = new ol.layer.Vector({
       source: source,
       style: new ol.style.Style({
         fill: new ol.style.Fill({
           color: 'rgba(255, 255, 255, 0.2)'
         }),
         stroke: new ol.style.Stroke({
           color: '#ffcc33',
           width: 2
         }),
         image: new ol.style.Circle({
           radius: 7,
           fill: new ol.style.Fill({
             color: '#ffcc33'
           })
         })
       })
     });   
   
     var sketch;
     var helpTooltipElement;
     var helpTooltip;
     var measureTooltipElement;
     var measureTooltip;
     var continuePolygonMsg = '';
     var continueLineMsg = '';
     var pointerMoveHandler = function(evt) {
       if (evt.dragging) {
         return;
       }
       /** @type {string} */
         
       var helpMsg = 'Click to add a point';

       if (sketch) {
         var geom = (sketch.getGeometry());
         if (geom instanceof ol.geom.Polygon) {
          var helpMsg = continuePolygonMsg;
         } else if (geom instanceof ol.geom.LineString) {
           helpMsg = continueLineMsg;
         }
       }

       helpTooltipElement.innerHTML = helpMsg;
       //helpTooltip.setPosition(evt.coordinate);
     };

     map.on('pointermove', pointerMoveHandler);

     map.getViewport().addEventListener('mouseout', function() {
       helpTooltipElement.classList.add('hidden');
     });
     //var draw; // global so we can remove it later
     /*var formatLength = function(line) {
     var length = ol.Sphere.getLength(line);
     var output;
       if (length > 100) {
         output = (Math.round(length / 1000 * 100) / 100) +
             ' ' + 'km';
       } else {
         output = (Math.round(length * 100) / 100) +
             ' ' + 'm';
       }
       return output;
     };*/

   var formatLength = function (line) {
   var length;
   length = Math.round(line.getLength() * 100) / 100;
   var output;
   if (length > 100) {
       output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
   } else {
       output = (Math.round(length * 100) / 100) + ' ' + 'm';
   }
   return output;
};
   
   

     var formatArea = function(polygon) {
     var area;
         area = Math.round(polygon.getArea() * 100) / 100;
       var output;
       if (area > 10000) {
         output = (Math.round(area / 1000000 * 100) / 100) +
             ' ' + 'km<sup>2</sup>';
       } else {
         output = (Math.round(area * 100) / 100) +
             ' ' + 'm<sup>2</sup>';
       }
       return output;
     };

    
     function addInteraction() { 
         var radioSelect = 'length';
         var type = (radioSelect == 'area' ? 'Polygon' : 'LineString');
         draw = new ol.interaction.Draw({
         source: source,
         type: type,
         style: new ol.style.Style({
           fill: new ol.style.Fill({
             color: 'rgba(255, 255, 255, 0.2)'
           }),
           stroke: new ol.style.Stroke({
             color: 'rgba(0, 0, 0, 0.5)',
             lineDash: [10, 10],
             width: 2
           }),
           image: new ol.style.Circle({
             radius: 5,
             stroke: new ol.style.Stroke({
               color: 'rgba(0, 0, 0, 0.7)'
             }),
             fill: new ol.style.Fill({
               color: 'rgba(255, 255, 255, 0.2)'
             })
           })
         })
       });
       map.addInteraction(draw);

       createMeasureTooltip();
       createHelpTooltip();

       var listener;
       draw.on('drawstart',
           function(evt) {
             // set sketch
             sketch = evt.feature;

             /** @type {ol.Coordinate|undefined} */
             var tooltipCoord = evt.coordinate;

             listener = sketch.getGeometry().on('change', function(evt) {
               var geom = evt.target;
               var output;
               if (geom instanceof ol.geom.Polygon) {
                 output = formatArea(geom);
                 tooltipCoord = geom.getInteriorPoint().getCoordinates();
               } else if (geom instanceof ol.geom.LineString) {
                 output = formatLength(geom);
                 tooltipCoord = geom.getLastCoordinate();
               }
               measureTooltipElement.innerHTML = output;
               measureTooltip.setPosition(tooltipCoord);
             });
           }, this);

       draw.on('drawend',
           function() {
             //measureTooltipElement.className = 'tooltip tooltip-static';
             measureTooltip.setOffset([0, -7]);
             // unset sketch
             //sketch = null;
             // unset tooltip so that a new one can be created
             //measureTooltipElement = null;
             createMeasureTooltip();
             //ol.Observable.unByKey(listener);
           }, this);
     }

   
     /**
      * Creates a new help tooltip
      */
     function createHelpTooltip() {
       if (helpTooltipElement) {
         helpTooltipElement.parentNode.removeChild(helpTooltipElement);
       }
       helpTooltipElement = document.createElement('div');
       helpTooltipElement.className = 'tooltip hidden';
       helpTooltip = new ol.Overlay({
         element: helpTooltipElement,
         offset: [15, 0],
         positioning: 'center-left'
       });
       map.addOverlay(helpTooltip);
     }


     /**
      * Creates a new measure tooltip
      */
     function createMeasureTooltip() {
       if (measureTooltipElement) {
         measureTooltipElement.parentNode.removeChild(measureTooltipElement);
       }
       measureTooltipElement = document.createElement('div');
       measureTooltipElement.className = 'tooltip tooltip-measure';
       measureTooltip = new ol.Overlay({
         element: measureTooltipElement,
         offset: [0, -15],
         positioning: 'bottom-center'
       });
       map.addOverlay(measureTooltip);
     }
     addInteraction(); 
   
  // var vector = highlightfeatures.getSource();
}

function delete_interaction(){
    map.removeInteraction(draw);
    draw.values_.active = false;
}

function projects(){
  if(document.getElementById("close_drone").style.display == "none"){
    ohSnap('The Drone Image have been added!', {color: 'green', icon: 'icon-success','duration':'2000'});
    var drone_image = new ol.layer.Tile({
      visible: true,
      opacity: 1,
      source:new ol.source.XYZ({
      url:"https://webmap-sandbox.co2ol.de/dist/Mosaic/{z}/{x}/{y}.png"
    }), name:'Dron Image'
    });
    map.addLayer(drone_image);
    map.getView().setZoom(15);
    map.getView().setCenter(ol.proj.transform([-81.125,7.56], 'EPSG:4326', 'EPSG:3857'));
    document.getElementById("drone").setAttribute("style","display:none");
    document.getElementById("close_drone").setAttribute("style","display:block");
  }else{
    ohSnap('The Drone Image have been removed!', {color: 'red', icon: 'icon-success','duration':'2000'});
    map.getLayers().forEach(function(lyr){
      console.log(lyr);
      if(lyr.values_.name == 'Dron Image'){
        map.removeLayer(lyr)
      }
    });
    map.removeLayer(drone_image);
    document.getElementById("drone").setAttribute("style","display:block");
    document.getElementById("close_drone").setAttribute("style","display:none");
  }
}

function close_project(){
    document.getElementById('modal3').setAttribute("style", "z-index: 1003; display: block;opacity: 0; bottom: -100%;");
}
function close_chart(){
    document.getElementById('chart').setAttribute("style", "z-index: 1003; display: block;opacity: 0; bottom: -100%;");
}

function mapScale (dpi) {
    var unit = map.getView().getProjection().getUnits();
    var resolution = map.getView().getResolution();
    var inchesPerMetre = 39.37;

    return resolution *  inchesPerMetre * dpi;
}

// FUNCIONES DE DESCARGA DE PLANOS//
function print() {
    swal({
        title: 'Caution!',
        text: "The following Map will be created based on the extent visible in the screen would you like to continue?",
        icon: 'warning',
        confirm: {
          text: "Ok",
          visible:true},
        cancel:{
          text: "Cancel",
          visible:true},
      }).then((result) => {
        if (result) {
            var resolution = 300;
            var dim = [612,792];
            var width = Math.round(dim[0] * resolution / 130);
            var height = Math.round(dim[1] * resolution / 310);
            var size = map.getSize();
            var viewResolution = map.getView().getResolution();
          
            map.once('rendercomplete', function() {
              var mapCanvas = document.createElement('canvas');
              mapCanvas.width = width;
              mapCanvas.height = height;
              var mapContext = mapCanvas.getContext('2d');
              Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
                if (canvas.width > 0) {
                  var opacity = canvas.parentNode.style.opacity;
                  mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                  var transform = canvas.style.transform;
                  // Get the transform parameters from the style's transform matrix
                  var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                  // Apply the transform to the export map context
                  CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                  mapContext.drawImage(canvas, 0, 0);
                }
                });

                margins = {
                    top: 155,
                    bottom: 12,
                    left: 100,
                    width: 522
                };
    
                options = {
                    columnStyles: {
                        0: {columnWidth: 50},
                        1: {columnWidth: 50}
                    }
                };
                var img = new Image();
                img.src = './img/Logo_ffc.png';
    
                var norte = new Image();
                norte.src = './img/north.png';
    
                var scale = mapScale(150);
    
                var escala = Math.round(scale).toString() ;
                console.log(escala);
    
                var doc = new jsPDF('landscape','mm',dim);
    
                doc.addImage( mapCanvas.toDataURL('image/jpeg'), 'JPEG', 5, 6, 268, 142);
                doc.addImage( img, 'PNG', 220, 190, 60, 15);
                doc.rect(4, 4, 270, 205);
                doc.setFontSize(12);
                doc.setFontType('bold');
                doc.text("Reference Information",10,160);
                doc.setFontType('bold');
                doc.setFontSize(12);
                doc.text("Scale: 1:"+escala,10,170);
                doc.setFontSize(12);
                doc.text("EPSG:4326",10,175);
                doc.setFontSize(12);
                doc.text("Projection: Mercator",10,180);
                doc.setFontSize(12);
                doc.text("Datum:WGS 1984",10,185);
                doc.setFontSize(10);
                doc.setFontType('italic');
                doc.text("Author:Forest Finest Consulting",10,205);
                doc.setFontSize(14);
                doc.setFontType('italic');
                doc.text("Here could be added any additional information (Table, Images, Text, Graph etc.)",80,180);
                doc.rect(4, 150, 270, 59);
                doc.addImage(norte, 'PNG', 17,12,15,15);           
                doc.save('Map.pdf');

                map.getView().setResolution(viewResolution);
            });
            //alert("<br>El PDF descargado contiene la vista el formato AMCO con los elementos que visualiza en Pantalla<br>");
        }  
    })
}

//HEAT MAP//
function heat_map_close(){
  document.getElementById('heat_map').setAttribute('style','display:block;');
  document.getElementById('heat_map_close').setAttribute('style','display:none;');
  map.getView().setZoom(12);
  map.getLayers().forEach(layer => {
    if (layer && layer.get('name') === 'heatmap') {
      map.removeLayer(layer);
      console.log('lo encontró');
    }else{console.log('paila')}
  });
  ohSnap('The Heat Map have been removed!', {color: 'yellow', icon: 'icon-error','duration':'2000'});

}

function heat_map(){
    document.getElementById('heat_map').setAttribute('style','display:none;');
    document.getElementById('heat_map_close').setAttribute('style','display:block;');
    ohSnap('The Heat Map was added!', {color: 'green', icon: 'icon-success','duration':'2000'});
    var heat = new ol.layer.Heatmap({
        source: new ol.source.Vector({
          url: './2012_Earthquakes_Mag5.kml',
          format: new ol.format.KML({
            extractStyles: false
          }),
          crossOrigin: 'anonymous'
        }),name: 'heatmap',
        blur: 10,
        radius: 15,
        weight: function(feature) {
          // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
          // standards-violating <magnitude> tag in each Placemark.  We extract it from
          // the Placemark's name instead.
          var name = feature.get('name');
          var magnitude = parseFloat(name.substr(2));
          return magnitude - 5;
        }
      });
      map.getView().setZoom(5);
      map.addLayer(heat);
}

// PIE CHART //

function pie_chart(){
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_moonrisekingdom);
        // Themes end
        
        var data = [{
            "country": "Dummy",
            "disabled": true,
            "litres": 1000,
            "color": am4core.color("#dadada"),
            "opacity": 0.3,
            "strokeDasharray": "4,4"
        }, {
            "country": "Forest",
            "litres": 501.9
        }, {
            "country": "Cacao",
            "litres": 301.9
        }, {
            "country": "Treco",
            "litres": 201.1
        }, {
            "country": "Guayacan",
            "litres": 165.8
        }, {
            "country": "Ron Ron",
            "litres": 139.9
        }, {
            "country": "Zapatero",
            "litres": 128.3
        }];
        
        
        // cointainer to hold both charts
        var container = am4core.create("chartdiv", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";
        
        container.events.on("maxsizechanged", function () {
            chart1.zIndex = 0;
            separatorLine.zIndex = 1;
            dragText.zIndex = 2;
            chart2.zIndex = 3;
        })
        
        var chart1 = container.createChild(am4charts.PieChart);
        chart1 .fontSize = 11;
        chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart1.data = data;
        chart1.radius = am4core.percent(70);
        chart1.innerRadius = am4core.percent(40);
        chart1.zIndex = 1;
        
        var series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = "litres";
        series1.dataFields.category = "country";
        series1.colors.step = 2;
        series1.alignLabels = false;
        series1.labels.template.bent = true;
        series1.labels.template.radius = 3;
        series1.labels.template.padding(0,0,0,0);
        
        var sliceTemplate1 = series1.slices.template;
        sliceTemplate1.cornerRadius = 5;
        sliceTemplate1.draggable = true;
        sliceTemplate1.inert = true;
        sliceTemplate1.propertyFields.fill = "color";
        sliceTemplate1.propertyFields.fillOpacity = "opacity";
        sliceTemplate1.propertyFields.stroke = "color";
        sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
        sliceTemplate1.strokeWidth = 1;
        sliceTemplate1.strokeOpacity = 1;
        
        var zIndex = 5;
        
        sliceTemplate1.events.on("down", function (event) {
            event.target.toFront();
            // also put chart to front
            var series = event.target.dataItem.component;
            series.chart.zIndex = zIndex++;
        })
        
        series1.ticks.template.disabled = true;
        
        sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;
        
        sliceTemplate1.events.on("dragstop", function (event) {
            handleDragStop(event);
        })
        
        // separator line and text
        var separatorLine = container.createChild(am4core.Line);
        separatorLine.x1 = 0;
        separatorLine.y2 = 300;
        separatorLine.strokeWidth = 3;
        separatorLine.stroke = am4core.color("#dadada");
        separatorLine.valign = "middle";
        separatorLine.strokeDasharray = "5,5";
        
        
        var dragText = container.createChild(am4core.Label);
        dragText.text = "Drag slices over the line";
        dragText.rotation = 90;
        dragText.valign = "middle";
        dragText.align = "center";
        dragText.paddingBottom = 5;
        
        // second 
        var chart2 = container.createChild(am4charts.PieChart);
        chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart2 .fontSize = 11;
        chart2.radius = am4core.percent(70);
        chart2.data = data;
        chart2.innerRadius = am4core.percent(40);
        chart2.zIndex = 1;
        
        var series2 = chart2.series.push(new am4charts.PieSeries());
        series2.dataFields.value = "litres";
        series2.dataFields.category = "country";
        series2.colors.step = 2;
        
        series2.alignLabels = false;
        series2.labels.template.bent = true;
        series2.labels.template.radius = 3;
        series2.labels.template.padding(0,0,0,0);
        series2.labels.template.propertyFields.disabled = "disabled";
        
        var sliceTemplate2 = series2.slices.template;
        sliceTemplate2.copyFrom(sliceTemplate1);
        
        series2.ticks.template.disabled = true;
        
        function handleDragStop(event) {
            var targetSlice = event.target;
            var dataItem1;
            var dataItem2;
            var slice1;
            var slice2;
        
            if (series1.slices.indexOf(targetSlice) != -1) {
                slice1 = targetSlice;
                slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
            }
            else if (series2.slices.indexOf(targetSlice) != -1) {
                slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                slice2 = targetSlice;
            }
        
        
            dataItem1 = slice1.dataItem;
            dataItem2 = slice2.dataItem;
        
            var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
            var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);
        
            var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
            var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);
        
            // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
            var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);
        
            if (targetSlice == slice1) {
                if (targetSlicePoint.x > container.pixelWidth / 2) {
                    var value = dataItem1.value;
        
                    dataItem1.hide();
        
                    var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice1.hideTooltip();
                    })
        
                    slice2.x = 0;
                    slice2.y = 0;
        
                    dataItem2.show();
                }
                else {
                    slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }
            if (targetSlice == slice2) {
                if (targetSlicePoint.x < container.pixelWidth / 2) {
        
                    var value = dataItem2.value;
        
                    dataItem2.hide();
        
                    var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice2.hideTooltip();
                    })
        
                    slice1.x = 0;
                    slice1.y = 0;
                    dataItem1.show();
                }
                else {
                    slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }
        
            toggleDummySlice(series1);
            toggleDummySlice(series2);
        
            series1.hideTooltip();
            series2.hideTooltip();
        }
        
        function toggleDummySlice(series) {
            var show = true;
            for (var i = 1; i < series.dataItems.length; i++) {
                var dataItem = series.dataItems.getIndex(i);
                if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                    show = false;
                }
            }
        
            var dummySlice = series.dataItems.getIndex(0);
            if (show) {
                dummySlice.show();
            }
            else {
                dummySlice.hide();
            }
        }
        
        series2.events.on("datavalidated", function () {
        
            var dummyDataItem = series2.dataItems.getIndex(0);
            dummyDataItem.show(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;
        
            for (var i = 1; i < series2.dataItems.length; i++) {
                series2.dataItems.getIndex(i).hide(0);
            }
        })
        
        series1.events.on("datavalidated", function () {
            var dummyDataItem = series1.dataItems.getIndex(0);
            dummyDataItem.hide(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;
        })

        document.getElementById('chart').setAttribute("style", "z-index: 1003; display: block;opacity: 0.9; bottom: 100px;");
        
        }); // end am4core.ready()        
}

function bar_char(){

    am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_moonrisekingdom);
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.XYChart3D);
            chart.paddingBottom = 30;
            chart.angle = 35;
            
            // Add data
            chart.data = [{
                "name": "Forest",
                "steps": 45688,
                "href": "https://www.forestfinance.de/fileadmin/_processed_/4/1/csm_15030514056_2e2d8d7e26_o_7dfa661679.jpg"
            }, {
                "name": "Cacao",
                "steps": 35781,
                "href": "https://www.caf.com/media/5154/nota-principal-cadenas-productivas-f.jpg"
            }, {
                "name": "Treco",
                "steps": 25464,
                "href": "https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg"
            }, {
                "name": "Guayacan",
                "steps": 18788,
                "href": "https://parquesalegres.org/wp-content/uploads/2016/11/guayacan.jpg"
            }, {
                "name": "Ron Ron",
                "steps": 15465,
                "href": "https://www.ecured.cu/images/thumb/1/1d/Astronium_graveolens.JPG/260px-Astronium_graveolens.JPG"
            }, {
                "name": "Zapatero",
                "steps": 11561,
                "href": "https://www.amcharts.com/wp-content/uploads/2019/https://pic.biomarmicrobialtechnologies.com/cat/es/gardening/berg-nia-plant-of-savetiers.jpg04/chandler.jpg"
            }];
            
            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "name";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;
            categoryAxis.renderer.inside = true;
            categoryAxis.renderer.grid.template.disabled = true;
            
            let labelTemplate = categoryAxis.renderer.labels.template;
            labelTemplate.rotation = -90;
            labelTemplate.horizontalCenter = "left";
            labelTemplate.verticalCenter = "middle";
            labelTemplate.dy = 10; // moves it a bit down;
            labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated
            
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.disabled = true;
            
            // Create series
            var series = chart.series.push(new am4charts.ConeSeries());
            series.dataFields.valueY = "steps";
            series.dataFields.categoryX = "name";
            
            var columnTemplate = series.columns.template;
            columnTemplate.adapter.add("fill", function(fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
            })
            
            columnTemplate.adapter.add("stroke", function(stroke, target) {
              return chart.colors.getIndex(target.dataItem.index);
            })
        document.getElementById('chart').setAttribute("style", "z-index: 1003; display: block;opacity: 0.9; bottom: 100px;");
        }); 
}

//CLIP//

function clip(){
  swal({
    title: 'Opps..!',
    text: "CLIP funcionality is in process, it will be able soon!",
    icon: 'error',
    confirm: {
      text: "Ok",
      visible:true},
    cancel:{
      text: "Cancel",
      visible:true},
  })
}

function filter_modal(){
  if (document.getElementById("search").style.display == 'none'){
    document.getElementById("search").setAttribute('style','display:block;');
    swal({
      title: 'Message!',
      text: "FILTER MODAL funcionality is in process! The search bar is displayed but does not search",
      icon: './img/Logo_ffc.png',
      confirm: {
        text: "Ok",
        visible:true}
    })
  }else{
    document.getElementById("search").setAttribute('style','display:none;');
  }
  
}