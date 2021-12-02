import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
import Cluster from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Fill, Stroke, Text, Icon} from 'ol/style';
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

import busIcon from 'data-url:./public/assets/images/bus_icon.png';
import busStopIcon from 'data-url:./public/assets/images/bus_stop.png';
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
  'Charter':          '#fd8d3c',
  'Emory-GT':         '#fc79e4',
  'Gold':             '#eaaa00',
  'Green':            '#2ca02c',
  'Grocery':          '#6600cc',
  'Midnight Rambler': '#54585a',
  'NARA-TEP':         '#00ced1',
  'Red':              '#e60000',
  'Tech Square':      '#9370db',
}
var testBusFeature;
var greenDevBusFeature;
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
      stopFeature.setStyle
        (new Style({ 
          image: new Icon({
           src: busStopIcon,
           color:  RouteColors[routeName]
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
    // map.addLayer(clusters);
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
       image: new Icon({
        src: busIcon
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
    function loopGreenRoute() {
      json.body.forEach(function(feature){
        promise = promise.then(function() {
          return new Promise(function (resolve) {
            
            // calculate the new coordinate
            let routeCoord = fromLonLat([feature.lon, feature.lat]);
            testBusFeature.getGeometry().setCoordinates(routeCoord);
            
            // reset the HUD overlay if focused on the bus
            if(overlay.getPosition() && header.innerHTML.includes("BUS")) overlay.setPosition(routeCoord);

            setTimeout(resolve, 2000);
          });
        });
      });
    }
    
    // Initiate our simulated bus' travel
    loopGreenRoute();
    promise.then(function() {
      console.log("loop complete");
      loopGreenRoute();
    });
  })
}

/**
 * initial shard iterator gather
 */
let nextIterator;
fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/streamNamedev_greenRouteStream/sharditerator?shard-id=shardId-000000000000')
.then(function(response) {
  console.log('Initial shard iterator response: ', response);
  nextIterator = response;
});

function devgreenBusAPI() {
  // Get the data from our GET record API endpoint
  fetch('the api call for the GET stream records' + nextIterator, {mode: 'cors'})
  .then(function(response) {
    return response.json;
  })
  .then(function(json) {
    // our response should be in base64. let's decode it
    // example b64:
    //  EyJkZXZpY2VJRCI6IDEwMSwgInRpbWVzdGFtcCI6IDE2MzgxMzM1MDMsICJjb29yZGluYXRlIjogWyIzMy43NzMyNSIsICItODQuMzk3MDEiXSwgIndwX25hbWUiOiAiU3RvcDA6IFdQMTItTCIsICJpbmdyZXNzIjogNSwgImVncmVzcyI6IDUsICJ0b3RhbF9wYXNzZW5nZXJzIjogNiwgInN0b3BfbW92ZSI6IHRydWV9 
    // example reponse:
    //  "\&quot;deviceID\&quot;: 101, \&quot;timestamp\&quot;: 1638133503, \&quot;coordinate\&quot;: [\&quot;33.77325\&quot;, \&quot;-84.39701\&quot;], \&quot;wp_name\&quot;: \&quot;Stop0: WP12-L\&quot;, \&quot;ingress\&quot;: 5, \&quot;egress\&quot;: 5, \&quot;total_passengers\&quot;: 6, \&quot;stop_move\&quot;: true}"
    
    let data = json.Data; // correct?
    // decode
    let decoded = atob(data);
    /* Parse the decoded string to get the values I need 
        deviceId -> busId
        coordinate
        total_passengers -> capacity
        wp_name -> nextStop
    */
    let entity = "bus";
    let nextStop = "nextStopData";
    let capacity = "capacity data";
    let busCoord = fromLonLat([-84.39617872238159, 33.77137077205131]);
    greenDevBusFeature = new Feature({
      geometry: new Point(busCoord)
    });
    greenDevBusFeature.setStyle(new Style({ 
      image: new Icon({
       src: busIcon
     })}));
     greenDevBusFeature.setProperties({"entity": entity,
      "nextStop": nextStop || '',
      "capacity": capacity || '',
    });

    // somewhere here flush the features on BusSource
    BusSource.addFeature(greenDevBusFeature);
  })
  .then(fetch('the api call for the GET shard iterator' + nextIterator, {mode: 'cors'})
  .then(function(response) {
    // update the next iterator
    nextIterator = response;
  }));
}

fetchBusStops();
fetchBusTravelData();
// setTimeout(devgreenBusAPI, 2000);

// setInterval(function() {
//   if(overlay.getPosition()) overlay.setPosition(r);
// }, 1000)
