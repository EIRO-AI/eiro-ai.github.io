// scroll-animation.js

const frameCount = 100;
const scrollLoops = 3 ;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;


const currentFrame = index => `frames/frame_${String(index+1).padStart(3, '0')}.svg`;

const images = [];
const loadedImages = [];

function drawFrame(index) {
    if (!loadedImages.includes(index)) {
        const img = new Image();
        img.src = currentFrame(index);
        img.onload = () => loadedImages.push(index);
        images[index] = img;
    }
    const img = images[index];
    if (!img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Step 1: Load only the first frame
const firstImage = new Image();
firstImage.src = currentFrame(0);
firstImage.onload = () => {
    images[0] = firstImage;
    drawFrame(0);

    // Step 2: Preload the rest
    for (let index = 1; index < frameCount; index++) {
        if (!loadedImages.includes(index)) {
            const img = new Image();
            img.src = currentFrame(index);
            img.onload = () => loadedImages.push(index);
            images[index] = img;
        }
    }
};

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScrollTop = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = (scrollLoops*scrollTop / maxScrollTop % 1)

  const frameIndex = Math.max(0, Math.min(
    frameCount-1,
    Math.ceil(scrollFraction * frameCount))
  );
  drawFrame(frameIndex);
});
