mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5pdW1taSIsImEiOiJja3dzYWdkYm0wYnBoMnltaGtwZDh1cDB1In0.2ZR4ZsyQr3QZ2G4Elthzew';

let map = new mapboxgl.Map({
    container: 'flat_Mohovaya_map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [30.345490, 59.940815],
    zoom:16
})

let marker = new mapboxgl.Marker()
    .setLngLat([30.345490, 59.940815])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                `<p>Моховая ул., 32</p>`
            )
    )
    .addTo(map)