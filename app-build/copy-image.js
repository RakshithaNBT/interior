/* eslint-disable */
const fs = require('fs');
const path = require('path');

const src = "C:/Users/NBT/.gemini/antigravity/brain/e81ee5ea-9b83-4551-9894-9db0408ebe28/media__1779426753391.jpg";
const dest = "c:/interior design/app-build/public/images/before-after-combined.jpg";

try {
  fs.copyFileSync(src, dest);
  console.log("Successfully copied image!");
} catch (err) {
  console.error("Error copying file:", err);
}
