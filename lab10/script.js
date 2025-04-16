const FLICKR_API_KEY = 'ca370d51a054836007519a00ff4ce59e';
const PER_PAGE = 9;

function getRecentPhotosUrl() {
  return `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${FLICKR_API_KEY}&per_page=${PER_PAGE}&format=json&nojsoncallback=1&extras=url_m,title`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getImagesBtn').addEventListener('click', loadFlickrPhotos);
});

async function loadFlickrPhotos() {
  try {
    showLoading('載入圖片中...');
    const photos = await fetchRecentPhotos();
    displayPhotos(photos);
    showLoading(`已載入 ${photos.length} 張圖片`);
  } catch (error) {
    console.error('Error:', error);
    showError('載入圖片失敗，請稍後再試');
  }
}

async function fetchRecentPhotos() {
  const response = await fetch(getRecentPhotosUrl());
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  if (data.stat !== 'ok') throw new Error(data.message);
  return data.photos.photo;
}

function displayPhotos(photos) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.url_m;
    img.alt = photo.title || 'Flickr 照片';
    img.loading = 'lazy';
    gallery.appendChild(img);
  });
}

function showLoading(message) {
  const loadingElement = document.getElementById('loading');
  loadingElement.textContent = message;
  loadingElement.style.color = '#666';
}

function showError(message) {
  const loadingElement = document.getElementById('loading');
  loadingElement.textContent = message;
  loadingElement.style.color = 'red';
}
