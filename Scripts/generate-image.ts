import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const inputDirectory  = "src/assets/images/prewedding/original"
const outputDirectory  = "src/assets/images/preweddingcomp/full"

const supportedExtensions = new Set(
    [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".tif",
        ".tiff"
    ]);

async function generateImage() {
    await fs.mkdir(outputDirectory, {recursive: true});

    const files = await fs.readdir(inputDirectory);

    const file = files.filter((file) =>{
        return supportedExtensions.has(path.extname(file).toLowerCase()) && path.basename(file) === "200118.jpg"
    })[0]

    console.log(`Gevonden: ${file}.`);


    const inputPath = path.join(inputDirectory, file);
    const outputName = `${path.parse(file).name}.webp`;
    const outputPath = path.join(outputDirectory, outputName);

    try
    {
        await sharp(inputPath)
            .rotate()
            .resize({
                width: 2000,
                height: 2000,
                fit: "inside",
                withoutEnlargement: true,
            })
            .webp({ quality: 100 })
            .toFile(outputPath);

        console.log(`Aangemaakt: ${outputName}`);
    } catch (error) {
        console.error(`Fout bij ${file}:`, error);
    }

    console.log("Klaar met het genereren van Image!");
}

generateImage().catch(console.error);


