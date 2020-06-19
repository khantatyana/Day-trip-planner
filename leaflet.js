// leaflet. This box is for testing purposes

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g'
}).addTo(mymap);

// // public mapbox API
// var tokenAPI = "pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g";

// // project1 mapbox API
// var tokenAPI2 = "pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianozYmh6MHJ6czJyazA1cDR2bDQ4biJ9.e-uJ4qitZx762hMvRJfL1w";


