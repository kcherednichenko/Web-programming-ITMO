mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5pdW1taSIsImEiOiJja3dzYWdkYm0wYnBoMnltaGtwZDh1cDB1In0.2ZR4ZsyQr3QZ2G4Elthzew';

let map = new mapboxgl.Map({
    container: 'first_flat_map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [30.272210, 59.959237],
    zoom:15.5
})

let marker = new mapboxgl.Marker()
    .setLngLat([30.272210, 59.959237])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                `<p>Петровский пр., 5</p>`
            )
    )
    .addTo(map)