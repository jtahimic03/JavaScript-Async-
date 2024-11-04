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

