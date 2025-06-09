/* Interactive Web Map for Unit 2 - Activity 5 */

// Declare map var in global scope
var map;

// Function to instantiate the Leaflet map
function createMap() {
    // Create the map with appropriate center and zoom for your data
    map = L.map('map', {
        center: [40, -95], // Adjust coordinates based on your data
        zoom: 4 // Adjust zoom level as needed
    });

    // Add OpenTopoMap tile layer
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(map);

    // Call getData function
    getData();
}

// Function to retrieve the data and place it on the map
function getData() {
    // Load your spatiotemporal data - replace with your data file name
        fetch('data/map.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                let popupContent = "";
                if (feature.properties) {
                for (let property in feature.properties) {
                    popupContent += `<p><strong>${property}:</strong> ${feature.properties[property]}</p>`;
                }
                }
                layer.bindPopup(popupContent);
            }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading map.geojson:', error);
        });
}

// Function to attach popups to each mapped feature
function onEachFeature(feature, layer) {
    // Create HTML string with all properties for spatiotemporal data
    var popupContent = "";
    if (feature.properties) {
        // Loop to add feature property names and values to HTML string
        for (var property in feature.properties) {
            popupContent += "<p><strong>" + property + ":</strong> " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    }
}

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', createMap);