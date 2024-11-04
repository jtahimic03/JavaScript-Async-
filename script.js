const nasaApiKey = 'zJfYaLu27wfw6mTljyXmGVpT260g3I56Qrg5d2zm';

// Fetch photos from NASA API
async function fetchPhotos(date) {
    const nasaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${nasaApiKey}&earth_date=${date}`;
    const response = await fetch(nasaUrl);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.photos;
}

// Display photos and description in the gallery
function displayPhotos(photos, description) {
    const gallery = document.getElementById('marsPhotoGallery');
    gallery.innerHTML = `<h2>${description}</h2>`;
    
    if (photos.length === 0) {
        gallery.innerHTML += "<p>No photos available for this date.</p>";
        return;
    }

    // Display up to 3 photos
    photos.slice(0, 3).forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Photo by ${photo.rover.name} on ${photo.earth_date}`;
        gallery.appendChild(img);
    });
}

// Load and display photos for a specific date
async function loadPhotos(date, description) {
    try {
        const photos = await fetchPhotos(date);
        displayPhotos(photos, description);
    } catch (error) {
        console.error("Failed to load photos:", error);
    }
}

// Load initial photos on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialDate = "2015-07-03";
    loadPhotos(initialDate, `Mars Rover Photos from ${initialDate}`);
});

// Load photos for the selected date
document.getElementById('photosButton').addEventListener('click', () => {
    const date = document.getElementById('dateInput').value;
    if (date) {
        loadPhotos(date, `Mars Rover Photos from ${date}`);
    } else {
        alert("Please select a date.");
    }
});