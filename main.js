import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
import Cluster from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Fill, Stroke, Text} from 'ol/style';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Icon from 'ol/style/Icon';
import 'ol/ol.css';
import {FullScreen, ScaleLine, defaults as defaultControls } from 'ol/control';
import {createStringXY, toStringHDMS, add} from 'ol/coordinate';
import Select, { SelectEvent } from 'ol/interaction/Select';
import {fromLonLat, toLonLat} from 'ol/proj';
import LineString from 'ol/geom/LineString';
import { defaults, isEmpty } from 'lodash';
import {defaults as defaultInteractions} from 'ol/interaction';
import {click} from 'ol/events/condition';
import {Circle as CircleGeom, Point} from 'ol/geom';
import Overlay from 'ol/Overlay';
import CircleStyle from 'ol/style/Circle';

/**
 * Initialize Globals
 */
const view = new View({
  center: fromLonLat([-84.39, 33.77]),
  zoom: 15
});
const BusStopSource = new VectorSource();
const BusSource = new VectorSource();
const selectClick = new Select({
  condition: click,
});
const RouteColors = {
  'Blue':             '#0000ff',
  'Charter':          '#003300',
  'Emory-GT':         '#ff66ff',
  'Gold':             '#FFD700',
  'Green':            '#32a852',
  'Grocery':          '#6600cc',
  'Midnight Rambler': '#003300',
  'NARA-TEP':         '#66ccff',
  'Red':              '#ff0000',
  'Tech Square':      '#996633',
}
var testBusFeature;
// Popup elements
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const header = document.getElementById('popup-header');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
 const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
 closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Initialize OpenLayers Map
 */
 const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: view,
  overlays: [overlay]
});
map.addLayer(new VectorLayer({source: BusStopSource}));
map.addLayer(new VectorLayer({source: BusSource}));

/**
 * Enable map interactions for features (bus stops, routes, etc.)
 */
map.addInteraction(selectClick);
selectClick.on('select', function(e) {
  let selectedFeatures = e.target.getFeatures();

  // Close the Overlay if no feature is selected
  if (selectedFeatures.getLength() == 0){
    overlay.setPosition(undefined);
    closer.blur();
  }
  else {
    selectedFeatures.forEach(function(feature) {
      let props = feature.getProperties();
      console.log("====");
      console.log(props);

      // Display the Overlay at the feature location
      let coordinate = feature.getGeometry().getCoordinates();
      if (props.entity == 'bus')
      {
        header.innerHTML = "TEST BUS1";
        content.innerHTML = 'GT Route: ' + props.routeName + '<br />' +
                              'Estimated wait time: ' + props.ETA + '<br />' +
                              'Current Capacity: ' + props.capacity + '<br />' +
                              'Next Stop: ' + props.nextStop;
      }
      else 
      {
        header.innerHTML = props.stopName;
        content.innerHTML = 'GT Route: ' + props.routeName + '<br />' +
                                'Estimated wait time: ' + '<br />' +
                                'Current Capacity: ';
      } 
      overlay.setPosition(coordinate);
      // var model = feature.getProperties()["model"];
      // // Make sure our selected feature is an icon
      // if (model) {
      //   document.getElementById("info").style.visibility = 'visible';

      //   // populate html fields
      //   var properties = feature.getProperties();

      //   console.log(properties);
      //   for (var key in properties) {
      //     let element = document.getElementById(key);
      //     if (element)
      //       document.getElementById(key).innerHTML = key + " : " + (properties[key] ? properties[key] : "N/A");
      //   }
      //   // populate the coordinates
      //   let element = document.getElementById('loc');
      //   let loc = toLonLat(feature.getGeometry().getCoordinates());
      //   document.getElementById('loc').innerHTML = toStringHDMS(loc, 1);

      //   // move the selection to the clicked feature
      //   selectionOverlay.setGeometry(properties["geometry"]);
      //   selectionOverlay.setStyle(selectionOverlayStyle);
      // }
    });
  }
});
map.on('pointermove', function(e) {
  if (!e.dragging){
    var pixel = map.getEventPixel(e.originalEvent);
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(pixel) ? 'pointer': '';
  }
});

/**
 * Fetch bus-stop data from AWS API endpoint
 * Display the results and cluster overlapping bus routes
 */
function fetchBusStops() {
  fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/routesandstops', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    console.log(json.body);



    /**
     * 
     * CREATE A DUMMY BUS TO MOVE ALONG NORTH AVE
     * 
     */
    let entity = "bus";
    let routeName = "North Avenue";
    let nextStop = "Publix";
    let capacity = "27%";
    let ETA = "3 min.";
    let busCoord = [-84.39617872238159, 33.77137077205131];
    testBusFeature = new Feature({
      geometry: new Point(busCoord)
    });
    testBusFeature.setStyle(new Style({ 
      image: new CircleStyle({
        radius: 20,
        fill: new Fill({ color: 'red'}),
        stroke: new Stroke({ color: "#0"})
      })}));
    testBusFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    testBusFeature.setProperties({"entity": entity,
      "routeName": routeName || '',
      "nextStop": nextStop || '',
      "capacity": capacity || '',
      "ETA": ETA || '',
    });
    BusSource.addFeature(testBusFeature);

    // Retrieve each feature in the database
    json.body.forEach(function(feature){
      // Pull properties from the bus stop feature
      let stopID = feature.id;
      let stopName = feature.name;
      let routeName = feature.routeName;
      let position = feature.position;

      let coord = [feature.longitude, feature.latitude];

      // Style the bus stop feature
      let stopFeature = new Feature({
        geometry: new Point(coord),
      });
      stopFeature.setStyle(new Style({ 
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: RouteColors[routeName]}),
          stroke: new Stroke({ color: "#0"})
        })}));
      stopFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

      // console.log(toStringXY(coord, 5));

      // add properties to the feature
      stopFeature.setProperties({"id": stopID || '',
        "stopName": stopName || '',
        "routeName": routeName || '',
        "position": position || '',
      });

      // Add the feature to our vector layer
      BusStopSource.addFeature(stopFeature);
    });

    // Cluster features together to group overlapping bus stops from multiple routes
    const clusterSource = new Cluster({
      distance: 10,
      source: BusStopSource
    });
    const styleCache = {};
    const clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature) {
        const size = feature.get('features').length;
        let style = styleCache[size];
        // if cluster is only one feature, do not show cluster
        if (size == 1) return null;
        if (!style) {
          style = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({
                color: '#fff',
              }),
              fill: new Fill({
                color: '#3399CC',
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#fff',
              }),
            }),
          });
          styleCache[size] = style;
        }
        return style;
      }
    });

    // Add cluster to map
    map.addLayer(clusters);
  })
}

function fetchBusTravelData() {
  fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/fakeroute', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    console.log('Test Green Route Data', json.body);

    /**
     * 
     * CREATE A DUMMY BUS TO MOVE ALONG NORTH AVE
     * 
     */
     let entity = "bus";
     let routeName = "North Avenue";
     let nextStop = "Publix";
     let capacity = "27%";
     let ETA = "3 min.";
     let busCoord = fromLonLat([-84.39617872238159, 33.77137077205131]);
     testBusFeature = new Feature({
       geometry: new Point(busCoord)
     });
     testBusFeature.setStyle(new Style({ 
       image: new CircleStyle({
         radius: 20,
         fill: new Fill({ color: 'red'}),
         stroke: new Stroke({ color: "#0"})
       })}));
     testBusFeature.setProperties({"entity": entity,
       "routeName": routeName || '',
       "nextStop": nextStop || '',
       "capacity": capacity || '',
       "ETA": ETA || '',
     });
     BusSource.addFeature(testBusFeature);
     
    let promise = Promise.resolve();
    // Handle each green bus route
    json.body.forEach(function(feature){
      promise = promise.then(function() {
        return new Promise(function (resolve) {
          
          let routeCoord = fromLonLat([feature.lon, feature.lat]);
          testBusFeature.getGeometry().setCoordinates(routeCoord);
          

          setTimeout(resolve, 200);
        });
      });
    });

    promise.then(function() {
      console.log("loop complete");
    });
  })
}


//fetchBusStops();
fetchBusTravelData();

// setInterval(function() {
//   r = testBusFeature.getGeometry().getCoordinates();
//   // console.log(r);
//   add(r, [25, 0]);

//   testBusFeature.getGeometry().setCoordinates(r);
//     //map1.getView().setCenter(coord);
//   BusSource.refresh();
//   BusSource.addFeature(testBusFeature);
//   if(overlay.getPosition()) overlay.setPosition(r);
// }, 1000)