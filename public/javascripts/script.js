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


map.addControl(geolocate);
geolocate.on('geolocate', function(e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude
      var position = [lon, lat];
      console.log(lon, lat);
});


mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFyc21lbmRlcyIsImEiOiJjanVsMWZtdjMwYTRvM3lvOGp5aWZ6cnJtIn0.xv9rm--YRNKdTJGHFYzi0g';
//process.env.MAPBOX_ACCESSTOKEN

// Embed a map in a tag with the id `map`
var map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/light-v9', //choose style
  center: [-9, 38.7109469], // starting position
  zoom: 8 // starting zoom
})

var marker = new mapboxgl.Marker({
  draggable: true,
  color:"yellow"
  })
  .setLngLat([e.coords.latitude])
  .addTo(map);
   
  function onDragEnd() {
  var lngLat = marker.getLngLat();
  coordinates.style.display = 'block';
  coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  }
   
  marker.on('dragend', onDragEnd);

var userLocation = []
map.addControl(geolocate);
geolocate.on('geolocate', function(e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude
      userLocation.push(lat,lon);
      return
});

// var x = document.getElementById("demo");
// var userLocation = []

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else { 
//     console.log("Geolocation is not supported by this browser.")
//   }
// }

// function showPosition(position) {
//   userLocation.push(position.coords.latitude, position.coords.longitude)
//   console.log(userLocation)
//   return userLocation
// }




//Change the marker's color, make it draggable...
// var marker = new mapboxgl.Marker({
//     draggable: true,
//     color:"blue"
//     })
//     .setLngLat([-9.1527307, 38.7109469])
//     .addTo(map);
     
//     function onDragEnd() {
//     var lngLat = marker.getLngLat();
//     coordinates.style.display = 'block';
//     coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
//     }
     
//     marker.on('dragend', onDragEnd);

//     var marker2 = new mapboxgl.Marker({
//         draggable: true,
//         color:"yellow"
//         })
//         .setLngLat([2.528373, 48.856898])
//         .addTo(map);
         
//         function onDragEnd() {
//         var lngLat = marker2.getLngLat();
//         coordinates.style.display = 'block';
//         coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
//         }
         
//         marker2.on('dragend', onDragEnd);


// axios.get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=31914cb97e2074dd91b0b77c5e6e62d8ea0587f9")
// .then(
//     response => {
//         for (let i=0 ; i< response.data.length; i++){
//             const currPosition =  response.data[i]new mapboxgl.Marker({})
//             .addTo(map)

//         }
//     }
// )