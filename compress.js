import path from "node:path";
import fs from "node:fs/promises";
import { cwd } from "process";
import sharp from "sharp";

async function compress() {
  const c = cwd();
  const filePath = path.join(c, "public", "images");
  const outputPath = path.join(c, "public", "processed");
  try {
    await fs.mkdir(outputPath, { recursive: true });
    const files = await fs.readdir(filePath);

    for (const file of files) {
      const fullPath = path.join(filePath, file);
      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        console.log(`Skipping directory: ${file}`);
        continue;
      }
      //skip non images
      if (
        ![".jpg", ".png", ".jpeg", ".webp", ".avif"].includes(
          path.extname(file).toLowerCase(),
        )
      ) {
        console.log(`Skipping non image file: ${file}`);
        continue;
      }
      try {
        await sharp(`${filePath}/${file}`)
          .png({ quality: 80, compressionLevel: 8 })
          .toFile(`${outputPath}/${file}`);
      } catch (error) {
        console.log(`Error Processing file: ${file} : ${error}`);
      }
    }
  } catch (error) {
    console.error("Failed", error);
  }
}

await compress();
