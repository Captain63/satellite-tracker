// DOM declarations
const satteliteList = document.querySelector('#satteliteList');
const radiusList = document.querySelector('#selectRadius');
const inputField = document.querySelector('#address');
const inputDataList = document.querySelector('#inputsDataList');
const alertModal = document.querySelector("#alertModal");
const gMapWindow = document.querySelector("#map");


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

// Function calls to run on page load
displayInputOptions();
displaySatteliteList();
displayRadius();
getISSPostion();

// Google Maps API calls
// Global map variable for assigning different icons/locations to map
let map;

// Global variable to store marker instances once created for later removal
let markerArray = [];

// Declares initMap for global access
function initMap(issLat, issLon, altitude) {
    map = new google.maps.Map(gMapWindow, {
        center: { lat: parseFloat(issLat), lng: parseFloat(issLon) },
        zoom: 5,
        // Disables Street View -- useless for a satellite tracking application
        streetViewControl: false,
        // Sets default map view to satellite version
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    const issSVG = {
        path: `M21.8,5.2C21.9,5.2,22,5.1,22,5V1.1c0-0.1-0.1-0.2-0.2-0.2H20c-0.1,0-0.2,0.1-0.2,0.2V5c0,0.1,0.1,0.2,0.2,0.2h0.7v0.5h-2
		c-0.3-0.3-0.7-0.4-1.2-0.4c-1,0-1.8,0.7-1.9,1.7h-0.2V6.5c0-0.1-0.1-0.2-0.2-0.2h-1.6l-0.3-0.6c0-0.1-0.1-0.1-0.2-0.1h-2.2V5.2h0.9
		c0.1,0,0.2-0.1,0.2-0.2V0.2C12,0.1,11.9,0,11.8,0H9.6C9.5,0,9.4,0.1,9.4,0.2v4.7c0,0.1,0.1,0.2,0.2,0.2h0.9v0.4H8.4
		c-0.1,0-0.2,0.1-0.2,0.2V7H7.9C7.8,6.2,7.1,5.5,6.3,5.5c-0.6,0-1.1,0.3-1.4,0.7C4.6,5.8,4,5.5,3.5,5.5h-1V5.2h0.3
		C2.9,5.2,3,5.1,3,5V1.1C3,1,2.9,0.9,2.8,0.9H1C0.9,0.9,0.8,1,0.8,1.1V5c0,0.1,0.1,0.2,0.2,0.2h0.3v0.3H0.2C0.1,5.5,0,5.6,0,5.7v2.9
		c0,0.1,0.1,0.2,0.2,0.2h1.1v0.3H1c-0.1,0-0.2,0.1-0.2,0.2v3.9c0,0.1,0.1,0.2,0.2,0.2h1.8c0.1,0,0.2-0.1,0.2-0.2V9.4
		c0-0.1-0.1-0.2-0.2-0.2H2.4V8.9h1c0.6,0,1.1-0.3,1.4-0.7c0.3,0.4,0.8,0.7,1.4,0.7c0.9,0,1.6-0.6,1.7-1.5h0.2v1.2
		c0,0.1,0.1,0.2,0.2,0.2h2.1v0.4H9.6c-0.1,0-0.2,0.1-0.2,0.2v4.7c0,0.1,0.1,0.2,0.2,0.2h2.2c0.1,0,0.2-0.1,0.2-0.2V9.5
		c0-0.1-0.1-0.2-0.2-0.2h-0.9V8.9h2.2c0.1,0,0.2,0,0.2-0.1l0.3-0.6h1.6c0.1,0,0.2-0.1,0.2-0.2V7.4h0.2c0.1,0.9,0.9,1.7,1.9,1.7
		c0.4,0,0.8-0.1,1.2-0.4h2v0.5H20c-0.1,0-0.2,0.1-0.2,0.2v3.9c0,0.1,0.1,0.2,0.2,0.2h1.8c0.1,0,0.2-0.1,0.2-0.2V9.4
		c0-0.1-0.1-0.2-0.2-0.2h-0.7V8.7h0.7c0.1,0,0.2-0.1,0.2-0.2V5.9c0-0.1-0.1-0.2-0.2-0.2h-0.7V5.2H21.8z M10.9,4.7V4h0.7v0.7H10.9z
		 M10.5,2.4H9.8V1.6h0.7V2.4z M10.9,1.6h0.7v0.8h-0.7V1.6z M10.5,2.8v0.8H9.8V2.8H10.5z M10.9,2.8h0.7v0.8h-0.7V2.8z M11.6,1.2h-0.7
		V0.4h0.7V1.2z M10.5,0.4v0.7H9.8V0.4H10.5z M9.8,4.7V4h0.7v0.7H9.8z M1.4,8.5V6h1.2v2.5H1.4z M3,6h0.4v2.5H3V6z M2.6,3.3v0.5H1.2
		V3.3H2.6z M1.2,2.8V2.3h1.4v0.5H1.2z M2.6,1.3v0.5H1.2V1.3H2.6z M1.2,4.2h1.4v0.5H1.2V4.2z M1.8,5.2H2v0.3H1.8V5.2z M0.4,6h0.5v2.5
		H0.4V6z M1.2,11.2v-0.5h1.4v0.5H1.2z M2.6,11.6v0.5H1.2v-0.5H2.6z M1.2,13.1v-0.5h1.4v0.5H1.2z M2.6,10.2H1.2V9.7h1.4
		C2.6,9.7,2.6,10.2,2.6,10.2z M2,9.2H1.8V8.9H2V9.2z M3.8,8.4V6c0.4,0.1,0.7,0.4,0.8,0.8v0.9C4.5,8,4.2,8.3,3.8,8.4z M6.3,8.5
		c-0.5,0-1-0.3-1.2-0.8V6.8C5.3,6.3,5.7,6,6.3,6c0.7,0,1.2,0.6,1.2,1.2C7.5,7.9,6.9,8.5,6.3,8.5z M10.5,9.7v0.7H9.8V9.7H10.5z
		 M10.9,12h0.7v0.8h-0.7V12z M10.5,12.8H9.8V12h0.7V12.8z M10.9,11.6v-0.8h0.7v0.8H10.9z M10.5,11.6H9.8v-0.8h0.7V11.6z M9.8,13.2
		h0.7V14H9.8V13.2z M10.9,14v-0.7h0.7V14H10.9z M11.6,9.7v0.7h-0.7V9.7H11.6z M8.6,5.9h0.6v2.5H8.6V5.9z M13,8.5H9.7V5.9H13l0.3,0.5
		v1.5L13,8.5z M15,7.7h-1.3V6.7H15V7.7z M20.2,11.2v-0.5h1.4v0.5H20.2z M21.6,11.6v0.5h-1.4v-0.5H21.6z M20.2,13.1v-0.5h1.4v0.5
		H20.2z M21.6,10.2h-1.4V9.7h1.4V10.2z M16.1,7.2c0-0.5,0.2-0.9,0.6-1.2v2.4C16.3,8.1,16.1,7.7,16.1,7.2z M17.5,8.7
		c-0.1,0-0.3,0-0.4-0.1V5.8c0.1,0,0.3-0.1,0.4-0.1c0.3,0,0.7,0.1,0.9,0.3c0,0,0,0,0,0v2.2c0,0,0,0,0,0C18.2,8.5,17.9,8.7,17.5,8.7z
		 M21.6,8.3h-2.6V6.1h2.6V8.3z M21.6,3.3v0.5h-1.4V3.3H21.6z M20.2,2.8V2.3h1.4v0.5H20.2z M21.6,1.3v0.5h-1.4V1.3H21.6z M20.2,4.2
		h1.4v0.5h-1.4V4.2z`,
        fillColor: "green",
        fillOpacity: 0.6,
        scale: 2.75,
        // Anchors icon in center of circle
        anchor: new google.maps.Point(10, 7)
    }

    // Creates marker to display on map
    const issMarker = new google.maps.Marker({
        position: { lat: parseFloat(issLat), lng: parseFloat(issLon) },
        // Sets marker to custom ISS icon
        icon: issSVG,
        map: map
    })

    const contentString = `
        <h5 class="satname">International Space Station</h5>
        <ul class="satfacts">
            <li>Launch Date: 11-20-1998</li>
            <li>Altitude: ${(Math.round(((altitude * 0.621371) + Number.EPSILON) * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} miles / ${(Math.round((((altitude * 0.621371) * 5280) + Number.EPSILON) * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} feet</li>
            <li>Latitude: ${issLat}</li>
            <li>Longitude: ${issLon}</li>
        </ul>`;

    // Creates new infowindow
    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    issMarker.addListener("click", () => {
        infowindow.open(map, issMarker);
    })

    // Sets variable to call geocoder under submit event listener
    const geocoder = new google.maps.Geocoder();
    
    document.querySelector("#submit").addEventListener("click", (event) => {
        //storing in input value in localStorage. Ex: cityName-Fairfax: Fairfax
        localStorage.setItem(`cityName-${inputField.value}`, inputField.value);
        displayInputOptions();
        event.preventDefault();
        // Removes ISS marker
        issMarker.setMap(null);
        // Passes in Google Maps object
        geocodeAddress(geocoder, map);
    });

    function geocodeAddress(geocoder, resultsMap) {
        // Input field for address
        const addressInput = document.querySelector("#address");

        // Actual string entered into input field for address
        const address = addressInput.value;
    
        geocoder.geocode({ address: address }, (results, status) => {
            
            // Confirms status
            if (status === "OK") {
                // Removes previous marker created by geocoder
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

                // Overwrite default userLat and userLon based on new user input
                userLat = results[0].geometry.location.lat();
                userLon =  results[0].geometry.location.lng();
                addressInput.value = "";

                // Users placeholder attribute so user doesn't have to erase text from input field to search again
                addressInput.placeholder = results[0].formatted_address;

                getSattelitesNearMe(userLat, userLon, 0, radiusList.options[radiusList.options.selectedIndex].getAttribute('value'), satteliteList.options[satteliteList.options.selectedIndex].getAttribute('value'));
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

// Satellite icons functions and global variables
let satMarkerArray = [];
let infoWindowArray = [];
let openInfoWindows = [];

// For populating multiple satellite icons
function addSatellite(satObject) {
    // Clears any existing satellites from previous searches before populating new ones
    clearSatellites();

    const satSVG = {
        path: "M5.05,17.51l2.08,2.08a.41.41,0,0,0,.56,0,3.72,3.72,0,0,0,.9-3.81l.63-.63,1,1a.44.44,0,0,0,.28.12.4.4,0,0,0,.28-.12l2.56-2.55,1,1-1.25,1.25a.4.4,0,0,0,0,.56l5.16,5.16a.39.39,0,0,0,.28.12.4.4,0,0,0,.29-.12l3.06-3.06a.4.4,0,0,0,0-.57l-5.16-5.16a.4.4,0,0,0-.56,0L14.91,14l-1-1,1.92-1.93a2.2,2.2,0,0,0,.26-2.81l.9-.9a.43.43,0,0,0,.11-.28A.39.39,0,0,0,17,6.84L15.16,5a.4.4,0,0,0-.56,0l-.9.9a2.2,2.2,0,0,0-2.81.26L9,8.1l-1-1L9.21,5.84a.4.4,0,0,0,.12-.28.42.42,0,0,0-.12-.28L4.05.12A.39.39,0,0,0,3.77,0a.4.4,0,0,0-.29.12L.42,3.18a.4.4,0,0,0-.12.29.39.39,0,0,0,.12.28L5.58,8.91a.39.39,0,0,0,.56,0L7.39,7.66l1,1L5.85,11.22a.39.39,0,0,0,0,.56l1,1-.63.63a3.72,3.72,0,0,0-3.81.9.43.43,0,0,0-.11.28.39.39,0,0,0,.11.28L4.49,17l-.14.14a.4.4,0,0,0,0,.56.39.39,0,0,0,.56,0ZM3,5.18l2.5-2.5L6.65,3.84,4.14,6.35ZM4.92,2.12l-2.5,2.5L1.26,3.47,3.77,1ZM8.37,5.56,5.86,8.07,4.7,6.91,7.21,4.4Zm11,11L16.82,19l-1.17-1.16,2.51-2.51Zm-1.94,3.06,2.5-2.5L21,18.23l-2.51,2.51Zm-3.45-3.44,2.51-2.51,1.16,1.16L15.09,17.3Zm1-5.26-3.37,3.37L7.75,10.44l3.37-3.37ZM13.45,6.74l1.81,1.81a1.4,1.4,0,0,1,.42,1,1.37,1.37,0,0,1-.22.74L11.71,6.54a1.38,1.38,0,0,1,.74-.21A1.4,1.4,0,0,1,13.45,6.74Zm2.69.38-.6.59-.62-.63-.63-.62.59-.6ZM6.69,11.5l.5-.5L11,14.81l-.5.5ZM8.24,15a4,4,0,0,0-.55-.7,4,4,0,0,0-.7-.55l.42-.42,1.25,1.25Zm-5-.4a2.94,2.94,0,0,1,4.12,4.12Z",
        fillColor: "blue",
        fillOpacity: 0.6,
        scale: 1.75
    }    

    // Iterates through all satellites pulled from N2YO
    satObject.above.forEach(sat => {
        // Creates marker for each satellite with custom icon
        const satMarker = new google.maps.Marker({
            // Sets icon position per N2YO data
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
                openInfoWindows.push(infowindow);       
        })

        // Pushes satMarker variables to array for later removal on next search
        satMarkerArray.push(satMarker);
        infoWindowArray.push(infowindow);
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

// Search Radius circle functions and global variables
let circleArray = [];

// Creates circles based off search radius and user provided lat and lng
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

// N2YO API calls
// Function displays position of ISS on map on page load
function getISSPostion() {
    let baseURL = 'https://api.n2yo.com/rest/v1/satellite/';
    // Pulls position of ISS for next second based on page load time
    let endPoint = `${baseURL}positions/25544/-28/5/0/1/&apiKey=V9D6C3-2PPF46-6G6N28-4NZ0`;

    fetch(endPoint)
        .then(function (response) {
            if (!response.ok) {
                displayAlertModal("Something went wrong with the server! Please try reloading the page.");
                throw Error(response.statusText);
            }
            response.json().then(function (data){
                // Assigns ISS lat, lon and altitude to variables
                const issLat = data.positions[0].satlatitude;
                const issLng = data.positions[0].satlongitude;
                const altitude = data.positions[0].sataltitude;

                // Passes variables to initMap function
                initMap(issLat, issLng, altitude);
                
                // Creates example search radius circle with ISS at center
                addCircle(issLat, issLng, 10);
            })
        })
        .catch(function (error) {
            console.log('Exception caught with an error: \n', error);
        })
}

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
    let satelliteID = Number(categoryID);
    
    let endPoint = `${baseURL}/above/${lat}/${lng}/${alt}/${searchRadius}/${satelliteID}?apiKey=V9D6C3-2PPF46-6G6N28-4NZ0`;

    fetch(endPoint)
        .then(function (response) {
            if (!response.ok) {
                displayAlertModal("Search terms not valid! Please double check all fields have been filled in.");
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
    let map = new Map(Object.entries(satteliteCategories));

    keys.forEach(function(each){
        
        let option = document.createElement('option');
        option.setAttribute('value', `${map.get(each)}`);
        option.textContent = `${each}`;
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
        let option = document.createElement('option');
        option.setAttribute('value', `${each}`);
        option.textContent = `${displayRadius}`;

        radiusList.append(option);
    })
}

/**
 * Function will retreive previously entered city names from localStorage and display as an option to select.
 */
function displayInputOptions(){
    let keys = Object.keys(localStorage);

    removeAllChildNodes(inputDataList);

    keys.forEach(function(eachKey){
        if(eachKey.startsWith('cityName-')){
            let option = document.createElement('option');
            option.setAttribute('value', `${localStorage.getItem(eachKey).substring(localStorage.getItem(eachKey).indexOf('-')+1)}`)
            inputDataList.appendChild(option);
        }
    })
}

/**
 * Function removes child nodes of the given parent node
 * @param {*} parentElement 
 */
 function removeAllChildNodes(parentElement){
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    }
}


// Modal Functions + Event Listeners
function displayAlertModal(errorText) {
    document.querySelector(".alert-text").textContent = errorText;
    alertModal.classList.remove("hidden");
}

// Allows user to close modal by clicking X
document.querySelector(".close").addEventListener("click", () => {
    alertModal.classList.add("hidden");
}) 

// Allows user to close modal by clicking outside
window.addEventListener("click", function(event) {
    if (event.target === alertModal) {
        alertModal.classList.add("hidden");
    }
})

// Adds event listener so only one satellite icon displays at a time
gMapWindow.addEventListener("click", function(event) {
    let infoClickCount = 0;

    // Checks that any infowindows are currently open before proceeding
    if (openInfoWindows.length > 1) {
        openInfoWindows.forEach(window => {
            if (event.target === window) {
                infoClickCount++;
            }

            if (infoClickCount === 0) {
                window.close();
                openInfoWindows.shift();
            }
        })
    }
})