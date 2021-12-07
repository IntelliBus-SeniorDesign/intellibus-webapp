import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
import Cluster from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import Collection from 'ol/Collection';
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
var greenDevBusFeature = null;
var redDevBusFeature = null;
var apcDevBusFeature = null;
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
      console.log(props);

      // Display the Overlay at the feature location
      let coordinate = feature.getGeometry().getCoordinates();
      if (props.entity == 'bus')
      {
        header.innerHTML = "BUS " + (props.busId || "TEST");
        content.innerHTML = 'Location: (' +  props.lat + ', ' + props.lon + ')<br />' + 
                              'Total Passengers: ' + props.capacity + '<br />' +
                              'Next Stop: ' + props.nextStop + '<br />' + 
                              'Status: ' + '<strong>' + (props.status || 'Moving') + '</strong>';
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
            
            testBusFeature.setProperties({"entity": entity,
            "lon": feature.lon || '',
            "lat": feature.lat || '',
          });

            // reset the HUD overlay if focused on the bus
            if(overlay.getPosition() && header.innerHTML.includes("BUS TEST")) overlay.setPosition(routeCoord);

            // fire a select event
            selectClick.set('features', new Collection([testBusFeature]));
            selectClick.dispatchEvent('select');

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
 * Initialize the next iterator field
 */
let green_nextIterator;
let red_nextIterator;
let apc_nextIterator;
async function initializeShardIterators() {
  /// Green Dev Route iterator
  let green_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_greenRouteStream/sharditerator?shard-id=shardId-000000000000');
  let green_json = await green_response.json();
  green_nextIterator = green_json.ShardIterator;
  console.log ('Init Green Shard Iterator', green_nextIterator);

  /// Red Dev Route iterator
  let red_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_redRouteStream/sharditerator?shard-id=shardId-000000000000');
  let red_json = await red_response.json();
  red_nextIterator = red_json.ShardIterator;
  console.log ('Init Red Shard Iterator', red_nextIterator);

  /// APC Route iterator
  let apc_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_IoTTestUnitStream/sharditerator?shard-id=shardId-000000000000');
  let apc_json = await apc_response.json();
  apc_nextIterator = apc_json.ShardIterator;
  console.log ('Init APC Shard Iterator', apc_nextIterator);

  return true; 
}

/**
 * Get the next APC records and update *_nextIterator with response
 */
async function getAPCRecords() {
  let green_response;
  let red_response;
  let apc_response;
  // GET green records until Records is not empty
  green_timer = setInterval(async function() {
    green_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_greenRouteStream/records', {
      mode: 'cors',
      headers: {
        "Shard-Iterator": green_nextIterator
      }});
      // convert response to a readable format
      green_response = await green_response.json();
      console.log('GET Green records', green_response);

    // Now evaluate if the response has an empty record or not
    if (green_response) {
      if (green_response.Records.length > 0) {
        // Set the next iterator value and the record value
        let data = green_response.Records[0].Data;
        green_nextIterator = green_response.NextShardIterator;
        
        clearInterval(green_timer);
        
        // Convert the response to something meaningful
        let decoded = JSON.parse(atob(data));
        console.warn('record obtained for green', decoded);

        // Create a new feature if not exist, else update its information
        if (!greenDevBusFeature) {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = decoded.stop_move ? 'Loading passengers' : 'Moving';
          greenDevBusFeature = new Feature({
            geometry: new Point(busCoord)
          });
          greenDevBusFeature.setStyle(new Style({ 
            image: new Icon({
            src: busIcon
          })}));
          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });

          // Add the feature to our vector layer
          BusStopSource.addFeature(greenDevBusFeature);
        }
        // Update location and props
        else {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = function() {
            if (decoded.stop_move) {
              return 'Loading passengers';
            }
            else {
              return 'Moving';
            }
          }
          greenDevBusFeature.getGeometry().setCoordinates(busCoord);
            
        
          // reset the HUD overlay if focused on the bus
        if(overlay.getPosition() && header.innerHTML.includes("BUS " + busId)) overlay.setPosition(busCoord);

          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });
        }
        
        // fire a select event
        selectClick.set('features', new Collection([greenDevBusFeature]));
        selectClick.dispatchEvent('select');

        // Iterate for next shards
        getAPCRecords();
      }
    }
  }, 2000);

  // GET red records until Records is not empty
  red_timer = setInterval(async function() {
    red_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_redRouteStream/records', {
      mode: 'cors',
      headers: {
        "Shard-Iterator": red_nextIterator
      }});
      // convert response to a readable format
      red_response = await red_response.json();
      console.log('GET Red records', red_response);

    // Now evaluate if the response has an empty record or not
    if (red_response) {
      if (red_response.Records.length > 0) {
        // Set the next iterator value and the record value
        let data = red_response.Records[0].Data;
        red_nextIterator = red_response.NextShardIterator;
        
        clearInterval(red_timer);
        
        // Convert the response to something meaningful
        let decoded = JSON.parse(atob(data));
        console.warn('record obtained for red', decoded);

        // Create a new feature if not exist, else update its information
        if (!redDevBusFeature) {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = decoded.stop_move ? 'Loading passengers' : 'Moving';
          greenDevBusFeature = new Feature({
            geometry: new Point(busCoord)
          });
          greenDevBusFeature.setStyle(new Style({ 
            image: new Icon({
            src: busIcon
          })}));
          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });

          // Add the feature to our vector layer
          BusStopSource.addFeature(redDevBusFeature);
        }
        // Update location and props
        else {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = function() {
            if (decoded.stop_move) {
              return 'Loading passengers';
            }
            else {
              return 'Moving';
            }
          }
          greenDevBusFeature.getGeometry().setCoordinates(busCoord);
            
        
          // reset the HUD overlay if focused on the bus
        if(overlay.getPosition() && header.innerHTML.includes("BUS " + busId)) overlay.setPosition(busCoord);

          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });
        }
        
        // fire a select event
        selectClick.set('features', new Collection([redDevBusFeature]));
        selectClick.dispatchEvent('select');

        // Iterate for next shards
        getAPCRecords();
      }
    }
  }, 2000);

  // GET apc records until Records is not empty
  apc_timer = setInterval(async function() {
    apc_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_IoTTestUnitStream/records', {
      mode: 'cors',
      headers: {
        "Shard-Iterator": apc_nextIterator
      }});
      // convert response to a readable format
      apc_response = await apc_response.json();
      console.log('GET apc records', apc_response);

    // Now evaluate if the response has an empty record or not
    if (apc_response) {
      if (apc_response.Records.length > 0) {
        // Set the next iterator value and the record value
        let data = apc_response.Records[0].Data;
        apc_nextIterator = apc_response.NextShardIterator;
        
        clearInterval(apc_timer);
        
        // Convert the response to something meaningful
        let decoded = JSON.parse(atob(data));
        console.warn('record obtained for apc', decoded);

        // Create a new feature if not exist, else update its information
        if (!apcDevBusFeature) {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = decoded.stop_move ? 'Loading passengers' : 'Moving';
          greenDevBusFeature = new Feature({
            geometry: new Point(busCoord)
          });
          greenDevBusFeature.setStyle(new Style({ 
            image: new Icon({
            src: busIcon
          })}));
          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });

          // Add the feature to our vector layer
          BusStopSource.addFeature(apcDevBusFeature);
        }
        // Update location and props
        else {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = function() {
            if (decoded.stop_move) {
              return 'Loading passengers';
            }
            else {
              return 'Moving';
            }
          }
          greenDevBusFeature.getGeometry().setCoordinates(busCoord);
            
        
          // reset the HUD overlay if focused on the bus
        if(overlay.getPosition() && header.innerHTML.includes("BUS " + busId)) overlay.setPosition(busCoord);

          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });
        }
        
        // fire a select event
        selectClick.set('features', new Collection([apcDevBusFeature]));
        selectClick.dispatchEvent('select');

        // Iterate for next shards
        getAPCRecords();
      }
    }
  }, 2000);
}

// Call the AWS stream for available Bus information
fetchBusStops();

// Generate mock APC
fetchBusTravelData();

// Initialize Kinesis data stream shards and continue calling the next datastream
(async function() {
  let isInitialized = await initializeShardIterators();

  if (isInitialized) {
    console.warn('Shards initialized. Let\'s hope nothing breaks', isInitialized);
    getAPCRecords();
  }
})();

// setTimeout(devgreenBusAPI, 2000);

// setInterval(function() {
//   if(overlay.getPosition()) overlay.setPosition(r);
// }, 1000)
