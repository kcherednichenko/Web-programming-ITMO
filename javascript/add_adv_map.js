mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5pdW1taSIsImEiOiJja3dzYWdkYm0wYnBoMnltaGtwZDh1cDB1In0.2ZR4ZsyQr3QZ2G4Elthzew';

let map = new mapboxgl.Map({
    container: 'add_adv_map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [30.345618, 59.940869],
    zoom:16
})

let marker = new mapboxgl.Marker()
.setLngLat([30.345618, 59.940869])
.addTo(map)
const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    placeholder: 'Искать в Санкт-Петербурге',
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    bbox: [29.928372, 59.751445, 30.664948, 60.102403],
    proximity:{
        longitude:30.308281,
        latitude:59.957086
    }
});

// Add the geocoder to the map
map.addControl(geocoder);

map.on('click', addMarker)

function addMarker(event){
    let coordinates = event.lngLat
    console.log(event)
    marker.setLngLat(coordinates).addTo(map)
    getReverseGeocode(coordinates)
}

function get_information(link, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", link, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.response);
        }
    };
    xhr.send(null)
}

function getReverseGeocode(coordinates){
    let lat = coordinates.lng;
    let lng = coordinates.lat;
    localStorage.setItem('address_coords', JSON.stringify(coordinates))
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lat + "," + lng + ".json?access_token=" + mapboxgl.accessToken;
    get_information(url, function (res){
        let address = JSON.parse(res).features[0].place_name
        address = address.replace('Russia', "")
        address = address.replace('Saint Petersburg', "")
        address = address.trim()
        address = address.replace(", ,", "")
        document.getElementById('add_adv_address').value = address
    })
}