import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
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
import {createStringXY, toStringHDMS} from 'ol/coordinate';
import Select, { SelectEvent } from 'ol/interaction/Select';
import {fromLonLat, toLonLat} from 'ol/proj';
import LineString from 'ol/geom/LineString';
import { defaults, isEmpty } from 'lodash';
import {defaults as defaultInteractions} from 'ol/interaction';
import {click} from 'ol/events/condition';
import {Circle as CircleGeom, Point} from 'ol/geom';

import coords from '/assets/routeInfo/bus_stop.json';

console.log("yuh" + coords);
const view = new View({
  center: fromLonLat([-84.39, 33.77]),
  zoom: 15
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: view
});

// fetch the json files
  fetch('http://localhost:3000/geoJson/tech.geojson', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    // Read features, clear the current layer features
    const format = new GeoJSON();
    const features = format.readFeatures(json);
    console.log(features);
  });
  map.render();