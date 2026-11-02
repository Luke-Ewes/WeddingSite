import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const inputDirectory  = "src/assets/images/prewedding/original"
const outputDirectory  = "src/assets/images/prewedding/thumbnails"
const fullDirectory = "src/assets/images/prewedding/full";

const supportedExtensions = new Set(
    [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".tif",
        ".tiff"
    ]);

async function generateThumbnails() {
    await fs.mkdir(outputDirectory, {recursive: true});
    await fs.mkdir(fullDirectory, { recursive: true });

    const files = await fs.readdir(inputDirectory);

    const images = files.filter((file) =>
        supportedExtensions.has(path.extname(file).toLowerCase()), );



    console.log(`Gevonden: ${images.length} afbeeldingen.`);

    for (const file of images)
    {
        const inputPath = path.join(inputDirectory, file);
        const outputName = `${path.parse(file).name}.webp`;
        const outputPath = path.join(outputDirectory, outputName);
        const fullPath = path.join(fullDirectory, `${path.parse(file).name}.webp`,);

        try
        {
            await sharp(inputPath)
                .rotate()
                .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true, })
                .webp({ quality: 92 })
                .toFile(outputPath);

            await sharp(inputPath)
                .rotate()
                .resize({
                    width: 2000,
                    height: 2000,
                    fit: "inside",
                    withoutEnlargement: true,
                })
                .webp({ quality: 92 })
                .toFile(fullPath);

            console.log(`Aangemaakt: ${outputName}`);
        } catch (error) {
            console.error(`Fout bij ${file}:`, error);
        }
    }
    console.log("Klaar met het genereren van thumbnails!");
}

generateThumbnails().catch(console.error);


