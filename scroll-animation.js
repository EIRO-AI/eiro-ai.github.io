// scroll-animation.js

const frameCount = 50;
const scrollLoops = 3;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const currentFrame = index => `frames/frame_${String(index).padStart(3, '0')}.svg`;

// Preload images
const images = [];
let loadedImages = 0;

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) drawFrame(1); // Draw the first frame early
  };
  images.push(img);
}

function drawFrame(index) {
  const img = images[index - 1];
  if (!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScrollTop = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = (scrollLoops*scrollTop / maxScrollTop % 1)

  const frameIndex = Math.min(
    frameCount,
    Math.ceil(scrollFraction * frameCount)
  );
  drawFrame(frameIndex);
});
