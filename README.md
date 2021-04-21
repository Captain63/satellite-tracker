# Satellite Locator: What's Orbiting Above Me?

## NOTE 1: API Keys
In order to test this application, API keys are required for both the Google Maps API and the N2YO API. Once created, add them to the api-keys.js file under assests/js to access the full functionality of the application. Guides for creating both keys are below:
- https://developers.google.com/maps/documentation/javascript/get-api-key
- https://www.n2yo.com/api/

## NOTE 2: Cross Origin Resource Sharing
In order to test this application, a plugin is required to enable Cross Origin Resource Sharing for API calls to N2YO. We recommend using the following browser extension in Chrome: https://mybrowseraddon.com/access-control-allow-origin.html

## Project Overview
Satellite Locator is a web-based application that allows a user to search for satellites above a specified location within a specified range and see the results displayed on an interactive map. Additional information can accessed by clicking each satellite icon to view information about that satellite, specifically its name, launch date, altitude*, latitude* and longitude* (*at the moment the search is submitted). Users can easily recreate previous searches by selecting the previous address from the input field dropdown, which is populated from the browser's local storage.

On initial page load, the user is shown the current position of the International Space Station (ISS) on the map to give a sense of the UI and to answer what may be a lot of users' initial questions (since the ISS is typically the most well-known "satellite"). This also ensures that the UI will always be displaying a satellite on page load as opposed to setting a random address that may or may not have satellites in range at that moment. 

From here, the user can then fill out the input form to search for different categories of satellites within a specified area (in miles) of the address they provide. This functionality is achieved by using fetch methods to the N2YO API for current satellite data and linking the Google Maps JavaScript API in the HTML to then represent the parsed satellite data visually for the user. Additional flexibility in address inputs from the user (i.e. city, address, ZIP, state, country) is achieved by leveraging the Google Maps Geocoding method to then convert these values into latitude and longitude for accessing the N2YO API. The application is powered by JavaScript, HTML, and CSS. Primary CSS styling is pulled from the Skeleton.css library. The Moment.js library is accessed to reformat the launch dates provided by the N2YO API.

### Libraries/APIs Used
<ul>
<li><a href="https://www.n2yo.com/api/" target="_blank">N2YO API</a></li>
<li><a href="https://developers.google.com/maps/documentation/javascript/overview" target="_blank">Google Maps JavaScript API</a></li>
<li><a href="https://momentjs.com/" target="_blank">Moment.js Library</a></li>
<li><a href="http://getskeleton.com/" target="_blank">Skeleton.css Library</a></li>
</ul>

### Languages Used
<ul>
<li>JavaScript</li>
<li>HTML</li>
<li>CSS</li>
</ul>

## Application Screenshot
![Application showing military satellites within a 1,000 mile radius of Arlington, VA](./assets/images/completed-application-capture.PNG)

## Contributors
<ul>
<li>Kuba Zhaanbaev</li>
<li>Stephen Roddewig</li>
</ul>
