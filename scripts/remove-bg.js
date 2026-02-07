const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/logo-3d-nobackground.png');
const outputPath = path.join(__dirname, '../public/images/logo-3d-transparent.png');

async function removeBackground() {
  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Get raw pixel data
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Process pixels - make light gray/white pixels transparent
    const pixels = new Uint8Array(data);
    const newPixels = new Uint8Array(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const srcIdx = i * info.channels;
      const dstIdx = i * 4;

      const r = pixels[srcIdx];
      const g = pixels[srcIdx + 1];
      const b = pixels[srcIdx + 2];

      // Check if pixel is light (close to white/light gray)
      // The checkered pattern in PNG editors is usually around 200-255
      const isLight = r > 200 && g > 200 && b > 200;
      const isGray = Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10;

      if (isLight && isGray) {
        // Make transparent
        newPixels[dstIdx] = r;
        newPixels[dstIdx + 1] = g;
        newPixels[dstIdx + 2] = b;
        newPixels[dstIdx + 3] = 0; // Alpha = 0 (transparent)
      } else {
        // Keep original
        newPixels[dstIdx] = r;
        newPixels[dstIdx + 1] = g;
        newPixels[dstIdx + 2] = b;
        newPixels[dstIdx + 3] = info.channels === 4 ? pixels[srcIdx + 3] : 255;
      }
    }

    // Save with transparency
    await sharp(Buffer.from(newPixels), {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toFile(outputPath);

    console.log('Background removed! Saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error);
  }
}

removeBackground();
