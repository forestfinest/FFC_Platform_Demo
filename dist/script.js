var cors = '';
// GEOSERVER //

var geoserver = 'https://fofinews.de:8087/geoserver/FFC/wms'
var geo = 'https://fofinews.de:8087/geoserver/'
// ========= config section ================================================
var geoserverUrl= geo +'/FFC';
var featurePrefix = 'FFC';
var featureType = ['pic_360','parcels'];
var featureNS = 'http://ffc.org';
var format = [];
var infoFormat = 'application/vnd.ogc.gml/3.1.1';
var wmsSource = [];
var format = [];
// Create layers instances// ================================================
var proj = new ol.proj.Projection({
  code: 'http://www.opengis.net/gml/srs/epsg.xml#3857',
  axis: 'enu'
});

$storyRight1 = $('.story.profundizacion');
$boton1 = $('#btn_profundizacion');		
$boton1.click(function() {
    $(this).toggleClass('active');
    $storyRight1.toggleClass('story-open');
});

// SLIDE SECTION //

var slideIndex = 1;
showDivs(slideIndex);
showDiva(slideIndex);
showDivc(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function plusDiva(n) {
  showDiva(slideIndex += n);
}

function plusDivc(n) {
  showDivc(slideIndex += n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

function showDiva(n) {
  var i;
  var x = document.getElementsByClassName("mySlide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

function showDivc(n) {
  var i;
  var x = document.getElementsByClassName("Perform");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

// map //

var vector = new ol.layer.Tile({
  visible: true,
  opacity: 0.8,
  source: new ol.source.TileWMS({
      url: geoserver,
      params: {LAYERS: 'FFC:parcels', STYLES: ''},
      serverType: 'geoserver',
  }), name: 'Parcels'
});

var pic_360 = new ol.layer.Tile({
  visible: true,
  opacity: 0.8,
  source: new ol.source.TileWMS({
      url: cors + geoserver,
      params: {LAYERS: 'FFC:pic_360', STYLES: '360_pic'},
      serverType: 'geoserver'
  }), name: '360_Images'
});

var bing = new ol.layer.Tile({
  visible: true,
  preload: Infinity,
  source: new ol.source.BingMaps({
      // We need a key to get the layer from the provider. 
      // Sign in with Bing Maps and you will get your key (for free)
      key: 'AubPKTuJ0B82nI8zwpX2Ke3Ejkbjkpq6YcMotEoDTjZUYT7wfw3ErctgkPUfSQUd',
      imagerySet: 'AerialWithLabels', // or 'Road', 'AerialWithLabels', etc.
      // use maxZoom 19 to see stretched tiles instead of the Bing Maps
      // "no photos at this zoom level" tiles
      maxZoom: 19,
      crossOrigin: 'anonymous'
  }), name:'Bing Satelital Image'
});

var bing2 = new ol.layer.Tile({
  visible: true,
  preload: Infinity,
  source: new ol.source.BingMaps({
      // We need a key to get the layer from the provider. 
      // Sign in with Bing Maps and you will get your key (for free)
      key: 'AubPKTuJ0B82nI8zwpX2Ke3Ejkbjkpq6YcMotEoDTjZUYT7wfw3ErctgkPUfSQUd',
      imagerySet: 'AerialWithLabels', // or 'Road', 'AerialWithLabels', etc.
      // use maxZoom 19 to see stretched tiles instead of the Bing Maps
      // "no photos at this zoom level" tiles
      maxZoom: 19,
      crossOrigin: 'anonymous'
  }), name:'Bing Satelital Image'
});


var url = 'https://sigigntg.anati.gob.pa/arcgisserver/services/CNDG_ES/VECTORES_25K_UNIDOS_PAIS/MapServer/WMSServer?'

var drenajes  = new ol.layer.Image({
  visible: false,
  preview: "https://image.shutterstock.com/image-vector/paper-layer-cut-top-view-260nw-1337588210.jpg",
  source: new ol.source.ImageWMS({
    crossOrigin: "anonymous",
    url: url,
    ratio: 1,
    params: {
        'LAYERS': '5',
            'TRANSPARENT': 'true',
            'TILED': 'true'
    },
    }), name: 'Rivers'
});

var heat;

var Mapa_Base  = new ol.layer.Image({
  visible: true,
  preview: "https://image.flaticon.com/icons/svg/564/564422.svg",
  source: new ol.source.ImageWMS({
    crossOrigin: "anonymous",
    url: url,
    ratio: 1,
    params: {
        'LAYERS': '7,8,9,10,12',
            'TRANSPARENT': 'true',
            'TILED': 'true'
    },
    }), name: 'Panama´s BM',
});

var os= new ol.layer.Tile({
  visible: false,
  preload: Infinity,
  source: new ol.source.OSM(),
  name:'OSM'
});

var overviewMapControl = new ol.control.OverviewMap({
  // see in overviewmap-custom.html to see the custom CSS used
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [bing2],
  collapsed: true,
});


var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});

var map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults().extend([
    overviewMapControl
  ]),
  layers: [bing2, os, Mapa_Base,drenajes,vector,pic_360],
  view: new ol.View({
    center: ol.proj.transform([-81.2,7.56], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12
  })
});

var sidebar = new ol.control.Sidebar({ element: 'sidebar', position: 'left' });

map.addControl(sidebar);

map.addControl(new ol.control.LayerSwitcher());

/*----------- Selection------------------------- */

for (var i = 0; i <= featureType.length - 1; i++){
  format[i] = new ol.format.GeoJSON({featureNS: featureNS, featureType: featureType[i]});
  wmsSource[i] = new ol.source.TileWMS({
    url: geoserver,
    params: {LAYERS: featurePrefix[i] + ':' +featureType[i] , TILED:'true'},
    serverType: 'geoserver',
  });
};

map.on('singleclick', function (evt) {
  var viewResolution = map.getView().getResolution();
  var viewProj = map.getView().getProjection();
  getInteractionMap(1,wmsSource[0],format[0], evt.coordinate,viewResolution,'EPSG:3857', infoFormat,'EPSG:3857');
  getInteractionMap(2,wmsSource[1],format[1], evt.coordinate,viewResolution,'EPSG:3857', infoFormat,'EPSG:3857');

});