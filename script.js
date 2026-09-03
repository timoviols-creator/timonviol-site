const revealItems = document.querySelectorAll('.intro, .spec-card, .placement, .experience, .contact-panel, footer');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

const coverUpload = document.querySelector('#cover-upload');
const heroImage = document.querySelector('.hero-image');
const videoUpload = document.querySelector('#video-upload');
const videoPreview = document.querySelector('#video-preview');
const videoPlaceholder = document.querySelector('.video-placeholder');
const videoLinkForm = document.querySelector('#video-link-form');
const videoLinkInput = document.querySelector('#video-link');
const videoLinks = document.querySelector('#video-links');

coverUpload.addEventListener('change', () => {
  const [selectedImage] = coverUpload.files;
  if (!selectedImage) return;

  heroImage.style.backgroundImage = `url("${URL.createObjectURL(selectedImage)}")`;
});

videoUpload.addEventListener('change', () => {
  const selectedVideos = [...videoUpload.files];
  if (!selectedVideos.length) return;

  selectedVideos.forEach((selectedVideo) => {
    addVideoCard(URL.createObjectURL(selectedVideo), selectedVideo.name);
  });

  videoPlaceholder.hidden = true;
  videoPreview.hidden = true;
});

function addVideoCard(videoUrl, label) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `<div class="video-cover"><span>VIOLIN<br />LIVE</span></div><video src="${videoUrl}" playsinline></video><button class="remove-video" type="button" aria-label="Удалить видео">×</button>`;
  setupVideoPlayer(card);
  card.querySelector('.remove-video').addEventListener('click', () => card.remove());
  videoLinks.append(card);
}

function setupVideoPlayer(card) {
  const video = card.querySelector('video');
  if (!video || card.querySelector('.player-controls')) return;

  const controls = document.createElement('div');
  controls.className = 'player-controls';
  controls.innerHTML = '<button class="play-button" type="button" aria-label="Воспроизвести">▶</button><input class="progress" type="range" min="0" max="100" value="0" aria-label="Прогресс видео"><button class="mute-button" type="button" aria-label="Выключить звук">◖</button><button class="fullscreen-button" type="button" aria-label="На весь экран">↗</button>';
  card.append(controls);

  const playButton = controls.querySelector('.play-button');
  const progress = controls.querySelector('.progress');
  playButton.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  video.addEventListener('click', () => (video.paused ? video.play() : video.pause()));
  video.addEventListener('play', () => { card.classList.add('is-playing'); playButton.textContent = 'Ⅱ'; });
  video.addEventListener('pause', () => { card.classList.remove('is-playing'); playButton.textContent = '▶'; });
  video.addEventListener('timeupdate', () => { progress.value = video.duration ? (video.currentTime / video.duration) * 100 : 0; });
  progress.addEventListener('input', () => { if (video.duration) video.currentTime = (progress.value / 100) * video.duration; });
  controls.querySelector('.mute-button').addEventListener('click', () => { video.muted = !video.muted; });
  controls.querySelector('.fullscreen-button').addEventListener('click', () => video.requestFullscreen?.());
}

document.querySelectorAll('.video-card').forEach(setupVideoPlayer);

document.querySelectorAll('.spec-card.copper').forEach((card) => {
  const photo = card.querySelector('.card-photo');
  const showPhoto = () => { card.classList.add('is-hovering'); photo.style.opacity = '0.42'; };
  const hidePhoto = () => { card.classList.remove('is-hovering'); photo.style.opacity = '0.06'; };
  card.addEventListener('mouseenter', showPhoto);
  card.addEventListener('mouseleave', hidePhoto);
  card.addEventListener('touchstart', showPhoto, { passive: true });
});

videoLinkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const videoUrl = videoLinkInput.value.trim();
  if (!videoUrl) return;

  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `<a href="${videoUrl}" target="_blank" rel="noreferrer">Смотреть видео ↗</a><button class="remove-video" type="button" aria-label="Удалить ссылку">×</button>`;
  card.querySelector('.remove-video').addEventListener('click', () => card.remove());
  videoLinks.append(card);
  videoLinkInput.value = '';
});
