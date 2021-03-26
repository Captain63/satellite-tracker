

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

//Object.keys(satteliteCategories).forEach( a=> console.log(a))

//getSattelitesNearMe(38.846226, -77.306374, 0, 45, 30);
getUserCoordinatesFromCityName('Richmond');


/**
 * Function take parameters and finds all sattelites above the given lat/lng of an observer.
 * @var lng is longitute of the observer
 * @var lat is lattitude of the observer
 * @var alt is altitide of the observer
 * @var searchRadius is between 0 and 90 degrees above the observer to find sattelites
 * @var categoryID will come from the list of all categories (total 53, variable = satteliteCategories)
 * @todo add note regarding how to handle CORS(Cross-Origin Resource Sharing) in README.md file
 */
function getSattelitesNearMe(lat, lng, alt, searchRadius, categoryID) {
    let baseURL = 'https://api.n2yo.com/rest/v1/satellite/';
    let endPoint = `${baseURL}/above/${lat}/${lng}/${alt}/${searchRadius}/${categoryID}?apiKey=V9D6C3-2PPF46-6G6N28-4NZ0`;

    fetch(endPoint)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //following code will be changed with actual implementation...
            console.log(response.json());
        })
        .catch(function (error) {
            console.log('Exception caught with an error: \n', error);
        })
}



let map;

// Declares initMap for global access
function initMap(userLat, userLon) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: userLat, lng: userLon },
        zoom: 8,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    const marker = new google.maps.Marker({
        position: { lat: userLat, lng: userLon },
        map: map
    })
}

/**
 * Function will get coordinates of given city name
 * @param cityName is a String name of the city user wants to get sattelite above.
 * @todo lat and lng is printed on console for now, will be used  as a variable later.
 */
function getUserCoordinatesFromCityName(cityName) {
    let baseURL = 'https://api.openweathermap.org';
    let endPoint = `${baseURL}/data/2.5/weather?q=${cityName}&appid=6eff42fd74f00dfa17ce2ae0939485b8`;

    fetch(endPoint)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.coord.lat);
            console.log(data.coord.lon);

            initMap(data.coord.lat, data.coord.lon);
        })
        .catch(function (error) {
            console.log('Exception caught with an error: \n', error);
        })
}

