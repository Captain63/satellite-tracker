// API key declarations
const googleMapsAPI = `[YOUR API KEY HERE]`;
const n2yoAPI = `[YOUR API KEY HERE]`;

// Appends Google Maps API script link to index.html head
const googleScript = document.createElement("script");
googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPI}&libraries=&v=weekly`;
googleScript.async = true;
document.head.appendChild(googleScript);