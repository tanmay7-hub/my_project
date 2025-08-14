    
      mapboxgl.accessToken = mapToken; 

         const map = new mapboxgl.Map({
         container: 'map', // container ID
         style: 'mapbox://styles/mapbox/streets-v11', // style URL
         center: coordinates, // starting position [lng, lat]
         zoom: 9 // starting zoom
        });
        const marker1 = new mapboxgl.Marker({color: "red"})
        .setLngLat(coordinates)
        .setPopup(
                new mapboxgl.Popup({offset: 25})
               .setHTML('<h6>Exact location will be provided wfter booking</h6>')
            )
        .addTo(map);