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
const RouteSource = new VectorSource();
const selectClick = new Select({
  condition: click,
});
const greenRouteLineString = new LineString([
    [
      -84.39707994461058,
      33.773011756156684
    ],
    [
      -84.39729452133179,
      33.773172285522726
    ],
    [
      -84.39723014831543,
      33.773332814588024
    ],
    [
      -84.39701557159424,
      33.773332814588024
    ],
    [
      -84.39692974090576,
      33.77315444894136
    ],
    [
      -84.39720869064331,
      33.77276204321162
    ],
    [
      -84.39735889434814,
      33.772904736412215
    ],
    [
      -84.3976378440857,
      33.77313661235628
    ],
    [
      -84.39791679382324,
      33.773225795244585
    ],
    [
      -84.39836740493773,
      33.77331497804007
    ],
    [
      -84.39918279647827,
      33.7733863242096
    ],
    [
      -84.39995527267456,
      33.77351117986332
    ],
    [
      -84.4007921218872,
      33.7736717082936
    ],
    [
      -84.4014573097229,
      33.77377872708001
    ],
    [
      -84.40175771713257,
      33.7738143999791
    ],
    [
      -84.402015209198,
      33.77404627346117
    ],
    [
      -84.40242290496826,
      33.77436732801567
    ],
    [
      -84.40250873565674,
      33.77458136371689
    ],
    [
      -84.4023585319519,
      33.77472405388731
    ],
    [
      -84.40233707427977,
      33.77486674382008
    ],
    [
      -84.40244436264038,
      33.775152122972564
    ],
    [
      -84.40265893936156,
      33.77531264832808
    ],
    [
      -84.40237998962402,
      33.77727460059022
    ],
    [
      -84.40229415893555,
      33.777542136053555
    ],
    [
      -84.40205812454224,
      33.77780967068133
    ],
    [
      -84.40167188644408,
      33.77809504002996
    ],
    [
      -84.401113986969,
      33.77839824392118
    ],
    [
      -84.40077066421509,
      33.77843391489665
    ],
    [
      -84.40042734146118,
      33.778469585857266
    ],
    [
      -84.39997673034668,
      33.77839824392118
    ],
    [
      -84.39965486526489,
      33.77834473743013
    ],
    [
      -84.39926862716675,
      33.778326901925674
    ],
    [
      -84.39918279647827,
      33.781519398057654
    ],
    [
      -84.39195156097412,
      33.781519398057654
    ],
    [
      -84.39199447631836,
      33.786709179694085
    ],
    [
      -84.39272403717041,
      33.7866556783951
    ],
    [
      -84.39353942871094,
      33.78662001084386
    ],
    [
      -84.39564228057861,
      33.786370337569224
    ],
    [
      -84.39643621444702,
      33.78629900221418
    ],
    [
      -84.39744472503662,
      33.786227666799704
    ],
    [
      -84.39871072769164,
      33.78620983293682
    ],
    [
      -84.4052767753601,
      33.786156331325834
    ],
    [
      -84.4052767753601,
      33.786370337569224
    ],
    [
      -84.4052767753601,
      33.78688751711602
    ],
    [
      -84.40519094467163,
      33.787012353090375
    ],
    [
      -84.40506219863892,
      33.7869588519808
    ],
    [
      -84.40506219863892,
      33.78663784462135
    ],
    [
      -84.40508365631104,
      33.78640600522445
    ],
    [
      -84.40542697906494,
      33.78624550065889
    ],
    [
      -84.40703630447388,
      33.78624550065889
    ],
    [
      -84.40602779388428,
      33.786227666799704
    ],
    [
      -84.40609216690063,
      33.78462260426373
    ],
    [
      -84.40416097640991,
      33.781465893516334
    ],
    [
      -84.39903259277342,
      33.781519398057654
    ],
    [
      -84.39916133880615,
      33.778237724347754
    ],
    [
      -84.40034151077269,
      33.77854092773392
    ],
    [
      -84.40096378326416,
      33.77854092773392
    ],
    [
      -84.40147876739502,
      33.77838040842787
    ],
    [
      -84.40197229385376,
      33.778077204473526
    ],
    [
      -84.40229415893555,
      33.777720492564896
    ],
    [
      -84.40250873565674,
      33.77688221373256
    ],
    [
      -84.40255165100098,
      33.77527697605285
    ],
    [
      -84.40259456634521,
      33.77470621762902
    ],
    [
      -84.40186500549316,
      33.77388574573273
    ],
    [
      -84.40038442611694,
      33.77360036236171
    ],
    [
      -84.39886093139648,
      33.77335065113226
    ],
    [
      -84.39815282821655,
      33.7731901221004
    ],
    [
      -84.39755201339722,
      33.77299391954188
    ]
  ]
);

const redRouteLineString = new LineString([
  [
    -84.40602779388428,
    33.780502806056965
  ],
  [
    -84.40330266952513,
    33.780502806056965
  ],
  [
    -84.40124273300171,
    33.778362572930845
  ],
  [
    -84.4006848335266,
    33.77852309227033
  ],
  [
    -84.4004487991333,
    33.77852309227033
  ],
  [
    -84.40004110336302,
    33.77843391489665
  ],
  [
    -84.399676322937,
    33.77834473743013
  ],
  [
    -84.39913988113403,
    33.77827339539007
  ],
  [
    -84.39727306365967,
    33.77825555987076
  ],
  [
    -84.39645767211914,
    33.778184217756426
  ],
  [
    -84.39579248428345,
    33.77779183506547
  ],
  [
    -84.39536333084106,
    33.77729243631377
  ],
  [
    -84.39512729644775,
    33.77695355693128
  ],
  [
    -84.39459085464478,
    33.776935721137164
  ],
  [
    -84.3939471244812,
    33.77695355693128
  ],
  [
    -84.39201593399048,
    33.77691788533934
  ],
  [
    -84.39201593399048,
    33.77647198918683
  ],
  [
    -84.39199447631836,
    33.77597258274053
  ],
  [
    -84.39205884933472,
    33.77128158723203
  ],
  [
    -84.39210176467896,
    33.77097835815217
  ],
  [
    -84.39212322235106,
    33.77056810533602
  ],
  [
    -84.39216613769531,
    33.77012217613397
  ],
  [
    -84.39184427261353,
    33.770140013346605
  ],
  [
    -84.39160823822021,
    33.770086501697534
  ],
  [
    -84.39171552658081,
    33.76985461749876
  ],
  [
    -84.39199447631836,
    33.76992596654983
  ],
  [
    -84.39218759536743,
    33.769872454767096
  ],
  [
    -84.39218759536743,
    33.77126375025704
  ],
  [
    -84.3955135345459,
    33.771299424203335
  ],
  [
    -84.39553499221802,
    33.772316125428034
  ],
  [
    -84.39607143402098,
    33.772369635684605
  ],
  [
    -84.39658641815186,
    33.772423145907766
  ],
  [
    -84.39673662185668,
    33.77251232953874
  ],
  [
    -84.39723014831543,
    33.77276204321162
  ],
  [
    -84.39757347106934,
    33.773011756156684
  ],
  [
    -84.39821720123291,
    33.7731901221004
  ],
  [
    -84.39881801605225,
    33.77329714148839
  ],
  [
    -84.39946174621582,
    33.77342199727208
  ],
  [
    -84.3999981880188,
    33.773493343352484
  ],
  [
    -84.40072774887085,
    33.7736538718162
  ],
  [
    -84.40169334411621,
    33.77372521770351
  ],
  [
    -84.40197229385376,
    33.77392141858727
  ],
  [
    -84.4024658203125,
    33.77438516434452
  ],
  [
    -84.40248727798462,
    33.7745992000012
  ],
  [
    -84.40231561660765,
    33.77472405388731
  ],
  [
    -84.40240144729614,
    33.774973761113664
  ],
  [
    -84.40250873565674,
    33.77516995913803
  ],
  [
    -84.40259456634521,
    33.77527697605285
  ],
  [
    -84.40253019332886,
    33.775598025995194
  ],
  [
    -84.40250873565674,
    33.77597258274053
  ],
  [
    -84.40248727798462,
    33.77650766096444
  ],
  [
    -84.40240144729614,
    33.77731027203362
  ],
  [
    -84.40407514572144,
    33.77727460059022
  ],
  [
    -84.40424680709839,
    33.77745295765862
  ],
  [
    -84.40422534942627,
    33.77779183506547
  ],
  [
    -84.4041395187378,
    33.77968238967942
  ],
  [
    -84.40615653991699,
    33.77964671922388
  ],
  [
    -84.40607070922852,
    33.7801996096155
  ],
  [
    -84.40602779388428,
    33.78062765133854
  ]
]
);
const greenRouteFeature = new Feature({
  geometry: greenRouteLineString,
})

const redRouteFeature = new Feature({
  geometry: redRouteLineString,
})

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
map.addLayer(new VectorLayer({source: RouteSource}));
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

greenRouteFeature.setStyle(new Style({
  stroke: new Stroke({
    color: '#2ca02c',
    width: 4
  })
}))
greenRouteFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
RouteSource.addFeature(greenRouteFeature);

redRouteFeature.setStyle(new Style({
  stroke: new Stroke({
    color: '#e60000',
    width: 4
  })
}))
redRouteFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
RouteSource.addFeature(redRouteFeature);

// setTimeout(devgreenBusAPI, 2000);

// setInterval(function() {
//   if(overlay.getPosition()) overlay.setPosition(r);
// }, 1000)
