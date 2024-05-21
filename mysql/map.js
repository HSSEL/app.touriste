import { app } from "./app";

// Initialize the map and set the initial view to a default location
const map = L.map('map').setView([51.505, -0.09], 2); // Initial view is set to a global view

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to update the map view and add a marker
function updateMapView(lat, lng, name) {
    // Set the view to the selected location
    map.setView([lat, lng], 10);

    // Remove existing markers
    if (window.currentMarker) {
        map.removeLayer(window.currentMarker);
    }

    // Add a new marker at the selected location
    window.currentMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup(name)
        .openPopup();
}

// Fetch and populate the establishments dropdown
fetch('/api/etablissements')
    .then(response => response.json())
    .then(data => {
        const select = document.getElementById('etablissementSelect');
        data.forEach(etablissement => {
            const option = document.createElement('option');
            option.value = etablissement.id;
            option.text = etablissement.name;
            select.add(option);
        });
    });

// Event listener for the select dropdown
document.getElementById('etablissementSelect').addEventListener('change', function (e) {
    const id = e.target.value;
    fetch(`/api/etablissement/${id}`)
        .then(response => response.json())
        .then(data => {
            updateMapView(data.latitude, data.longitude, data.name); 
        });
});
