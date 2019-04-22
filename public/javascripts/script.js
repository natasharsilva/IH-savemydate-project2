document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// mapboxgl.accessToken = 'pk.eyJ1IjoiZ3RjYXJtb25hIiwiYSI6ImNqdWwxYzZwOTAzeWE0NGxsbjJ0ZnJ0aDYifQ.GIzsIahO6WNQFMg486tFkA';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11'
// });


mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFyc21lbmRlcyIsImEiOiJjanVsMWZtdjMwYTRvM3lvOGp5aWZ6cnJtIn0.xv9rm--YRNKdTJGHFYzi0g';
//process.env.MAPBOX_ACCESSTOKEN

// Embed a map in a tag with the id `map`
var map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/carlarsmendes/cjul34qql1ow11fnwqn9puirj', //choose style
  center: [-1.1527307, 38.7109469], // starting position
  zoom: 8 // starting zoom
})

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl(
    {positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
        }
));

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