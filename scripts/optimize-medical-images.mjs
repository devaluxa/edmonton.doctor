import sharp from "sharp";
import { stat } from "node:fs/promises";

const images = ["edmonton-doctors-hero-clinic", "clinic-reception", "doctor-consultation", "walk-in-care-consultation"];
for (const name of images) {
  const input = `public/images/medical/${name}.png`;
  for (const width of [640, 1280]) {
    const output = `public/images/medical/${name}${width === 640 ? "-640" : ""}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
