document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');

}, false);

// mapboxgl.accessToken = 'pk.eyJ1IjoiZ3RjYXJtb25hIiwiYSI6ImNqdWwxYzZwOTAzeWE0NGxsbjJ0ZnJ0aDYifQ.GIzsIahO6WNQFMg486tFkA';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11'
// });
// Add zoom and rotation controls to the map.
var geolocate = new mapboxgl.GeolocateControl();

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFyc21lbmRlcyIsImEiOiJjanVsMWZtdjMwYTRvM3lvOGp5aWZ6cnJtIn0.xv9rm--YRNKdTJGHFYzi0g';

// Embed a map in a tag with the id `map`
var map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/light-v9', //choose style
  center: [-9, 38.7109469], // starting position
  zoom: 8 // starting zoom
})


// Add zoom and rotation controls to the map.
var geolocate = new mapboxgl.GeolocateControl();

