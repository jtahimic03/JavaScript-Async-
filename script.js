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
    
    // checks if any photos in the array
    if (photos.length === 0) { //if none it will return the message 
        gallery.innerHTML += "<p>No photos available for this date.</p>";
        return;
    }

    // Display up to 3 photos
    photos.slice(0, 3).forEach(photo => { // takes the first three photos of the array 
        const img = document.createElement('img'); //for each photo its creates an img element
        img.src = photo.img_src; //sets the photo to img.src 
        img.alt = `Photo by ${photo.rover.name} on ${photo.earth_date}`;
        gallery.appendChild(img); //attaches the photo to the gallery 
    });
}

// Load and display photos for a specific date
async function loadPhotos(date, description) { 
    try {
        const photos = await fetchPhotos(date); //calles the funtion with te specific date 
        displayPhotos(photos, description);// calls the displayfunction passing the retrieved photos and description
    } catch (error) {
        console.error("Failed to load photos:", error);// if any errors occur it will log it in the consol
    }
}

// Load initial photos on page load
document.addEventListener('DOMContentLoaded', () => {// waits till the html doc is fully loaded
    const initialDate = "2015-07-03"; //set as the default date 
    loadPhotos(initialDate, `Mars Rover Photos from ${initialDate}`);//calls loadsphotos with initial date and description once loaded
});

// Load photos for the selected date
document.getElementById('photosButton').addEventListener('click', () => {//once clicked it retrieves the date input 
    const date = document.getElementById('dateInput').value;
    if (date) {
        loadPhotos(date, `Mars Rover Photos from ${date}`);
    } else {
        alert("Please select a date.");// date not chosen it will display this message
    }
});