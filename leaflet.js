
 getMap(40.799919, -73.968307);

function getMap(lat, lon){

    var mymap = L.map('mapid').setView([lat, lon], 13);
    var marker = new L.marker([lat, lon]);
        marker.addTo(mymap);
    
    // here we are creating a MapBox Streets tile layer. Involves
    // creating attribution text and max zoom level
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        //this is 
        tileSize: 512,
        zoomOffset: -1,
        // attributionControl: false,
        accessToken: 'pk.eyJ1Ijoia2hhbnRhdHlhbmEiLCJhIjoiY2tianl6cGtyMHJ2ejJzdGRkamk4amV1byJ9.dvCAei1CaORvJiWXoaEn5g'
    }).addTo(mymap);
    
    }














