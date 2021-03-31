
const satteliteList = $('#satteliteList');
const radiusList = $('#selectRadius');
const inputField = $('#address');
const inputDataList = $('#inputsDataList');
const alertModal = document.querySelector("#alertModal");

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

displayInputOptions();
displaySatteliteList();
displayRadius();

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
        zoom: 5,
        // Disables Street View -- useless for a satellite tracking application
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
        //storing in input value in localStorage. Ex: cityName-Fairfax: Fairfax
        localStorage.setItem(`cityName-${inputField.val()}`, inputField.val());
        displayInputOptions();
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

                getSattelitesNearMe(userLat, userLon, 0, radiusList.val(), satteliteList.val());
            } else {
                addressInput.value = "";

                // Users placeholder attribute so user doesn't have to erase text from input field to search again
                addressInput.placeholder = 'Address not recognized';
                displayAlertModal("Address not recognized. Please check search term.");
                clearCircle();
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

    const satSVG = {
        path: "M5.05,17.51l2.08,2.08a.41.41,0,0,0,.56,0,3.72,3.72,0,0,0,.9-3.81l.63-.63,1,1a.44.44,0,0,0,.28.12.4.4,0,0,0,.28-.12l2.56-2.55,1,1-1.25,1.25a.4.4,0,0,0,0,.56l5.16,5.16a.39.39,0,0,0,.28.12.4.4,0,0,0,.29-.12l3.06-3.06a.4.4,0,0,0,0-.57l-5.16-5.16a.4.4,0,0,0-.56,0L14.91,14l-1-1,1.92-1.93a2.2,2.2,0,0,0,.26-2.81l.9-.9a.43.43,0,0,0,.11-.28A.39.39,0,0,0,17,6.84L15.16,5a.4.4,0,0,0-.56,0l-.9.9a2.2,2.2,0,0,0-2.81.26L9,8.1l-1-1L9.21,5.84a.4.4,0,0,0,.12-.28.42.42,0,0,0-.12-.28L4.05.12A.39.39,0,0,0,3.77,0a.4.4,0,0,0-.29.12L.42,3.18a.4.4,0,0,0-.12.29.39.39,0,0,0,.12.28L5.58,8.91a.39.39,0,0,0,.56,0L7.39,7.66l1,1L5.85,11.22a.39.39,0,0,0,0,.56l1,1-.63.63a3.72,3.72,0,0,0-3.81.9.43.43,0,0,0-.11.28.39.39,0,0,0,.11.28L4.49,17l-.14.14a.4.4,0,0,0,0,.56.39.39,0,0,0,.56,0ZM3,5.18l2.5-2.5L6.65,3.84,4.14,6.35ZM4.92,2.12l-2.5,2.5L1.26,3.47,3.77,1ZM8.37,5.56,5.86,8.07,4.7,6.91,7.21,4.4Zm11,11L16.82,19l-1.17-1.16,2.51-2.51Zm-1.94,3.06,2.5-2.5L21,18.23l-2.51,2.51Zm-3.45-3.44,2.51-2.51,1.16,1.16L15.09,17.3Zm1-5.26-3.37,3.37L7.75,10.44l3.37-3.37ZM13.45,6.74l1.81,1.81a1.4,1.4,0,0,1,.42,1,1.37,1.37,0,0,1-.22.74L11.71,6.54a1.38,1.38,0,0,1,.74-.21A1.4,1.4,0,0,1,13.45,6.74Zm2.69.38-.6.59-.62-.63-.63-.62.59-.6ZM6.69,11.5l.5-.5L11,14.81l-.5.5ZM8.24,15a4,4,0,0,0-.55-.7,4,4,0,0,0-.7-.55l.42-.42,1.25,1.25Zm-5-.4a2.94,2.94,0,0,1,4.12,4.12Z",
        fillColor: "blue",
        fillOpacity: 0.6,
        scale: 1.75
    }    

    satObject.above.forEach(sat => {
        const satMarker = new google.maps.Marker({
            position: new google.maps.LatLng(sat.satlat, sat.satlng),
            icon: satSVG,
            map: map
        })

        // Sets data to display in infowindow for each satellite
        const contentString = `
            <h5 class="satname">Satellite: ${sat.satname}</h5>
            <ul class="satfacts">
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

function displayAlertModal(errorText) {
    document.querySelector(".alert-text").textContent = errorText;
    alertModal.classList.remove("hidden");
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
                    displayAlertModal("No satellites found within search radius. Please search again.");

                    // Clears any existing satellites from previous searches
                    clearSatellites();
                    addCircle(lat, lng, searchRadius);
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
        satteliteList.append(option);
    })
}

/**
 * Function will display radius options on UI for user to select.
 */
function displayRadius(){
    let radius = [5, 15, 30, 45, 60, 90];

    radius.forEach(function(each){
        let displayRadius = each + String.fromCharCode(176);
        let option = $(`<option value="${each}">${displayRadius}</option>`);
        radiusList.append(option);
    })
}

/**
 * Function will retreive previously entered city names from localStorage and display as an option to select.
 */
function displayInputOptions(){
    let keys = Object.keys(localStorage);

    inputDataList.children().remove();

    keys.forEach(function(eachKey){
        if(eachKey.startsWith('cityName-')){
            let option = $(`<option value=${localStorage.getItem(eachKey).substring(localStorage.getItem(eachKey).indexOf('-')+1)}>`);
            inputDataList.append(option);
        }
    })
}

// Allows user to close modal by clicking X
document.querySelector(".close").addEventListener("click", () => {
    alertModal.classList.add("hidden");
}) 

// Allows user to close modal by clicking outside
window.onclick = function(event) {
    if (event.target === alertModal) {
        alertModal.classList.add("hidden");
    }
  }