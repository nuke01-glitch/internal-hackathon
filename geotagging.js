// Initialize map centered on India
const map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker;

document.getElementById("getLocation").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Fill hidden inputs
        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lng;

        // Add/update marker
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker([lat, lng]).addTo(map)
          .bindPopup("📍 Your Location").openPopup();

        // Zoom into user's position
        map.setView([lat, lng], 12);

        // ✅ Auto-update dropdown
        const dropdown = document.querySelector("select[name='location']");
        let myLocationOption = dropdown.querySelector("option[value='my-location']");
        if (!myLocationOption) {
          myLocationOption = document.createElement("option");
          myLocationOption.value = "my-location";
          myLocationOption.textContent = "📍 My Location";
          dropdown.appendChild(myLocationOption);
        }
        dropdown.value = "my-location";
      },
      (err) => {
        alert("Error getting location: " + err.message);
      }
    );
  } else {
    alert("Geolocation is not supported in this browser.");
  }
});
