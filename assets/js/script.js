
const sattelitList = $('#satteliteList');

//This object will be displayed on UI as a Select option for users to choose
const satteliteCategories = {
    'Amateur radis': 18,
    'Beidou Navigation System': 35,
    'Brightest': 1,
    'Celestis': 45,
    'CubeSats': 32,
    'Disaster monitoring': 8,
    'Earth resources': 6,
    'Education': 29,
    'Engineering': 28,
    'Experimental': 19,
    'Flock': 48,
    'Galileo': 22,
    'Geodetic': 27,
    'Geostationary': 10,
    'Global Positioning System (GPS) Constellation': 50,
    'Global Positioning System (GPS) Operational': 20,
    'Globalstar': 17,
    'Glonass Constellation': 51,
    'Glonass Operational': 21,
    'GOES': 5,
    'Gonets': 40,
    'Gorizont': 12,
    'Intelsat': 11,
    'Iridium': 15,
    'IRNSS': 46,
    'ISS': 2,
    'Lemur': 49,
    'Military': 30,
    'Molniya': 14,
    'Navy Navigation Satellite System': 24,
    'NOAA': 4,
    'O3B Networks': 43,
    'OneWeb': 53,
    'Orbcomm': 16,
    'Parus': 38,
    'QZSS': 47,
    'Radar Calibration': 31,
    'Raduga': 13,
    'Russian LEO Navigation': 25,
    'Satellite-Based Augmentation System': 23,
    'Search & rescue': 7,
    'Space & Earth Science': 26,
    'Starlink': 52,
    'Strela': 39,
    'Tracking and Data Relay Satellite System': 9,
    'Tselina': 44,
    'Tsikada': 42,
    'Tsiklon': 41,
    'TV': 34,
    'Weather': 3,
    'Westford Needles': 37,
    'XM and Sirius': 33,
    'Yaogan': 36
}

displaySatteliteList();

//Object.keys(satteliteCategories).forEach( a=> console.log(a))

//getSattelitesNearMe(38.846226, -77.306374, 0, 45, 30);

let map;
let markerArray = [];

// Default city to display: Richmond
let userLat = 37.5538;
let userLon = -77.4603;
initMap(userLat, userLon);

// Declares initMap for global access
function initMap(userLat, userLon) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: parseFloat(userLat), lng: parseFloat(userLon) },
        zoom: 8,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    let marker = new google.maps.Marker({
        position: { lat: parseFloat(userLat), lng: parseFloat(userLon) },
        map: map
    })
    
    // Test call -- can figure out if altitude parameter is needed later
    getSattelitesNearMe(userLat, userLon, 0, 10, satteliteCategories['Military']);

    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", (event) => {
        event.preventDefault();
        marker.setMap(null);
        geocodeAddress(geocoder, map);
    });

    const icons = {
        satellite: {
            icon: "./assets/images/satellite-icon-96px.png"
        }
    }

    function geocodeAddress(geocoder, resultsMap) {
        const addressInput = document.querySelector("#address");
        const address = document.querySelector("#address").value;
    
        geocoder.geocode({ address: address }, (results, status) => {
            
            // Confirms status
            if (status === "OK") {
                // Removes any existing markers created from geocoder
                if (markerArray.length > 0) {
                    markerArray[0].setMap(null);
                    markerArray.shift();
                }

                // Adds marker based on calculated lat and lon of user provided address
                resultsMap.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                });

                // Adds marker to markerArray for later removal
                markerArray.push(marker);

                //console.log(results[0]);

                // Overwrite default userLat and userLon based on new user input
                userLat = results[0].geometry.location.lat();
                userLon =  results[0].geometry.location.lng();
                addressInput.value = "";

                // Users placeholder attribute so user doesn't have to erase text from input field to search again
                addressInput.placeholder = results[0].formatted_address;

                getSattelitesNearMe(userLat, userLon, 0, 10, satteliteCategories['Military']);
            } else {
                addressInput.value = "";

                // Users placeholder attribute so user doesn't have to erase text from input field to search again
                addressInput.placeholder = 'Address not recognized';
            }
        });
    }
}

let satMarkerArray = [];

// For populating multiple satellite icons
function addSatellite(satObject) {
    // Clears any existing satellites from previous searches before populating new ones
    clearSatellites();

    const satCategory = satObject.info.category;

    satObject.above.forEach(sat => {
        const satMarker = new google.maps.Marker({
            position: new google.maps.LatLng(sat.satlat, sat.satlng),
            icon: "./assets/images/satellite-icon-96px.png",
            map: map
        })

        // Sets data to display in infowindow for each satellite
        const contentString = `
            <h5 class="satname">Satellite: ${sat.satname}</h5>
            <ul class="satfacts">
                <li>Type: ${satCategory}</li>
                <li>Launch Date: ${moment(sat.launchDate, "YYYY-MM-DD").format("MM-DD-YYYY")}</li>
                <li>Altitude: ${(Math.round(((sat.satalt * 0.621371) + Number.EPSILON) * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} miles / ${(Math.round((((sat.satalt * 0.621371) * 5280) + Number.EPSILON) * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} feet</li>
                <li>Latitude: ${sat.satlat}</li>
                <li>Longitude: ${sat.satlng}</li>
            </ul>`;

        // Creates new infowindow for each satellite
        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Adds listener to open when satellite icon is clicked
        satMarker.addListener("click", () => {
                infowindow.open(map, satMarker);
            // .open must first be called for .anchor property to populate -- allows user to reclick sat icon to close window
            satMarker.addListener("click", () => {
                if (infowindow.anchor === null) {
                    infowindow.open(map, satMarker);
                } else if (infowindow.anchor.visible) {
                    infowindow.close();
                }   
            })                
        })

        // Pushes satMarker variables to array for later removal on next search
        satMarkerArray.push(satMarker);
    })
}

function clearSatellites() {
     // Clears any existing satellite icons so that search is always showing latest results for area (and they don't linger on other parts of the map)
     if (satMarkerArray.length > 0) {
        for (let i = 0; i < satMarkerArray.length; i++) {
            satMarkerArray[i].setMap(null);
        }
        // Clears out array to be populated with new satellites
        satMarkerArray = [];
    }
}

let circleArray = [];

function addCircle(userLat, userLon, searchRadius) {
    clearCircle();

    // Sets new circle equal to user provided location
    searchCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: userLat, lng: userLon },
        // 1 zenith degree roughly equals 100,000 meter search radius
        radius: searchRadius * 100000,
    })

    // Pushes into circleArray to then be removed on next call
    circleArray.push(searchCircle);
}

function clearCircle() {
    // Removes existing circle (if any) from map before generating new circle
    if (circleArray.length > 0) {
        circleArray[0].setMap(null);
        circleArray.shift();
    }
}

// Shifted down since Google Maps API and Geocoder calls should happen first in order to generate lat and lon
/**
 * Function take parameters and finds all sattelites above the given lat/lng of an observer.
 * @var lng is longitute of the observer
 * @var lat is lattitude of the observer
 * @var alt is altitide of the observer
 * @var searchRadius is between 0 and 90 degrees above the observer to find sattelites
 * @var categoryID will come from the list of all categories (total 53, variable = satteliteCategories)
 * @todo add note regarding how to handle CORS(Cross-Origin Resource Sharing) in README.md file
 */
 function getSattelitesNearMe(lat, lng, alt = 0, searchRadius, categoryID) {
    let baseURL = 'https://api.n2yo.com/rest/v1/satellite/';
    let endPoint = `${baseURL}/above/${lat}/${lng}/${alt}/${searchRadius}/${categoryID}?apiKey=V9D6C3-2PPF46-6G6N28-4NZ0`;

    fetch(endPoint)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //following code will be changed with actual implementation...
            response.json()
            .then(function (data) {
                if (data === null) {
                    //alert("No satellites found within this area!");
                    // Clears any existing satellites from previous searches
                    clearSatellites();
                    clearCircle();
                } else {
                    //console.log(data);
                    addSatellite(data);
                    addCircle(lat, lng, searchRadius);
                }
            })
        })
        .catch(function (error) {
            console.log('Exception caught with an error: \n', error);
        })
}

/**
 * Function will use object satteliteCategories and add each key to Select element on UI.
 */
function displaySatteliteList(){
    let keys = Object.keys(satteliteCategories);

    keys.forEach(function(each){
        let option = $(`<option value="${each}">${each}</option>`);
        sattelitList.append(option);
    })
}