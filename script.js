const btn = document.getElementById('button');
const output = document.getElementById('output');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

function gotLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;

    output.innerHTML = `
        <p><strong>Latitude:</strong> ${latitude}</p>
        <p><strong>Longitude:</strong> ${longitude}</p>
        <p><strong>Accuracy:</strong> ${accuracy} meters</p>
    `;

    
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            output.innerHTML += `
                <p><strong>Address:</strong> ${data.display_name}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching address:', error);
            output.innerHTML += `<p>Could not fetch address information.</p>`;
        });

    
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    output.innerHTML += `
        <p><strong>Device Info:</strong></p>
        <p><strong>Platform:</strong> ${platform}</p>
        <p><strong>User Agent:</strong> ${userAgent}</p>
    `;

    
    output.style.display = 'block';
    loading.style.display = 'none';
}

function failedToGet() {
    loading.style.display = 'none';
    error.innerHTML = "Could not retrieve location. Please enable location services and try again.";
}

btn.addEventListener('click', () => {
    error.innerHTML = ""; 
    output.style.display = 'none'; 
    loading.innerHTML = "Fetching location, please wait..."; 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
    } else {
        loading.innerHTML = ""; 
        error.innerHTML = "Geolocation is not supported by this browser.";
    }
});
