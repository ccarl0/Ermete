// Initialize communication with the platform
const platform = new H.service.Platform({
    apikey: 'RCOj-CBZDfW-qqKMqZlo4-U5YStIa9vfUXJzIyrY2lE',
    app_id: 'TETjzvtu70jGUMiR31A2'
});

// Default options for the base layers that are used to render a map
var defaultLayers = platform.createDefaultLayers();

// Initialize the map
var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
    zoom: 2,
    center: { lat: 30.13641, lng: 20.57754 } // Coordinates for Munich, Germany
}
);

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var group = new H.map.Group();
map.addObject(group);

group.addEventListener('tap', function (evt) {

    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
    });
}, false);


// Define custom icons for each satellite
var iconOptions = {
    size: { w: 40, h: 40 },
    anchor: { x: 15, y: 15 },
};

var issIcon = new H.map.Icon("icons/iss.png", iconOptions);
var tiangongIcon = new H.map.Icon("icons/tiangong.png", iconOptions);
var prismaIcon = new H.map.Icon("icons/prisma.png", iconOptions);
var agileIcon = new H.map.Icon("icons/agile.png", iconOptions);
var italsat1Icon = new H.map.Icon("icons/italsat1.png", iconOptions);

var iss = new H.map.Marker({ lat: 45.4642700, lng: 9.1895100 }, { icon: issIcon });
group.addObject(iss);

var tiangong = new H.map.Marker({ lat: 45.4642700, lng: 9.1895100 }, { icon: tiangongIcon });
group.addObject(tiangong);

var prisma = new H.map.Marker({ lat: 45.4642700, lng: 9.1895100 }, { icon: prismaIcon });
group.addObject(prisma);

var agile = new H.map.Marker({ lat: 45.4642700, lng: 9.1895100 }, { icon: agileIcon });
group.addObject(agile);

var italsat1 = new H.map.Marker({ lat: 45.4642700, lng: 9.1895100 }, { icon: italsat1Icon });
group.addObject(italsat1);


function updateMarkers() {
    // request to local server that forwards the request to actual api
    // this is done to bypass cors-rule
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:3001/api/data", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Assuming data is an array with satellite positions
            // Update the marker positions based on the received data
            updateMarkerPosition(iss, data[0]); // Update the index based on the order of satellites
            updateMarkerPosition(tiangong, data[1]);
            updateMarkerPosition(prisma, data[2]);
            updateMarkerPosition(agile, data[3]);
            updateMarkerPosition(italsat1, data[4]);
        })
        .catch(error => console.log('error', error));
}

// Function to update marker position
function updateMarkerPosition(marker, data) {
    if (data && data.positions && data.positions.length > 0) {
        const lat = data.positions[0].satlatitude;
        const lng = data.positions[0].satlongitude;
        marker.setGeometry({ lat, lng });
    }
}



// Set interval to run the updateMarkers function every 10 seconds (10000 milliseconds)
setInterval(updateMarkers, 1000);