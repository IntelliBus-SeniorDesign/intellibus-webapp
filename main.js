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
import {createStringXY, toStringHDMS, toStringXY} from 'ol/coordinate';
import Select, { SelectEvent } from 'ol/interaction/Select';
import {fromLonLat, toLonLat} from 'ol/proj';
import LineString from 'ol/geom/LineString';
import { defaults, isEmpty } from 'lodash';
import {defaults as defaultInteractions} from 'ol/interaction';
import {click} from 'ol/events/condition';
import {Circle as CircleGeom, Point} from 'ol/geom';
import CircleStyle from 'ol/style/Circle';

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

const GeoJsonSource = new VectorSource();
map.addLayer(new VectorLayer({source: GeoJsonSource}));

document.getElementById('fetch').onclick = fetchData;

function fetchData() {
  fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/routesandstops', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    console.log(json.body);
    //const format = new GeoJSON();
    //const features = format.readFeatures(json);
    // retrieve the type of the GeoJSON geometry
    json.body.forEach(function(feature){
      let coord = [feature["longitude"], feature["latitude"]];
      let stop = new Feature({
        geometry: new Point(coord),
      });
      stop.setStyle(new Style({ 
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: '#ff0000'}),
          stroke: new Stroke({ color: "#0"})
        })}));
      stop.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      GeoJsonSource.addFeature(stop);
      console.log(toStringXY(coord, 5));

    });
  })
}