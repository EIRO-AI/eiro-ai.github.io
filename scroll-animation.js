// scroll-animation.js

const frameCount = 100;
const scrollLoops = 3;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;


const currentFrame = index => `frames/frame_${String(index).padStart(3, '0')}.svg`;

const images = [];
let loadedImages = 0;

function drawFrame(index) {
  const img = images[index - 1];
  if (!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;
  context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Step 1: Load only the first frame
const firstImage = new Image();
firstImage.src = currentFrame(1);
firstImage.onload = () => {
  images[0] = firstImage;
  drawFrame(1);

  // Step 2: Preload the rest
  for (let i = 2; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => loadedImages++;
    images[i - 1] = img;
  }
};

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
