/**
 * Created by arod on 6/29/16.
 */
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41, lng: -97},
        zoom: 5
    });

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(12);

        });
    }
}

function mapCenter(location) {
    map.setCenter(location);
}

function mapZoom(zoom) {
    map.setZoom(zoom);
}

function mapDrawCircle(location) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(location.lat, location.lng),
        title: location.lat + ' ' + location.lng
    });

    var circle = new google.maps.Circle({
        map: map,
        radius: 32187, // 20 miles in meters
        fillColor: '#0000FF',
        fillOpacity: 0.15
    });

    circle.bindTo('center', marker, 'position');

    mapCenter(location);
    mapZoom(10);
}

function mapDrawMarkers(markers) {
    var infoWindow = new google.maps.InfoWindow();

    for(var i = 0; i < markers.length; i++) {
        createMarker(markers[i], infoWindow);
    }
}

function createMarker(markerInfo, infoWindow) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
        animation: google.maps.Animation.DROP,
        title: markerInfo.title
    });

    marker.addListener('click', function() {
        infoWindow.setContent(markerInfo.content);
        infoWindow.open(map, marker);
    });
}
