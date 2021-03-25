
//getSattelitesNearMe(38.846226, -77.306374, 0, 45, 30);


/**
 * Function take parameters and finds all sattelites above the given lat/lng of an observer.
 * @var lng is longitute of the observer
 * @var lat is lattitude of the observer
 * @var alt is altitide of the observer
 * @var searchRadius is between 0 and 90 degrees above the observer to find sattelites
 * @var categoryID will come from the list of all categories (total 53)
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
