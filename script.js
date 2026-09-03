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

const videoLinks = document.querySelector('#video-links');

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

