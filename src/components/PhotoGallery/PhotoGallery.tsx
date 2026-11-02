import {useState} from "react";
import "./PhotoGallery.css"
import PhotoImage from "./PhotoImage.tsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/plugins/counter.css"
import {Counter, Fullscreen, Thumbnails, Zoom} from "yet-another-react-lightbox/plugins";

export interface Photo {
    src: string;
    thumbnail: string;
    alt: string;
}

const fullImages = import.meta.glob<string>(
    "/src/assets/images/prewedding/full/*.webp",
    {
        eager: true,
        query: "?url",
        import: "default",
    },
);

const thumbnailImages = import.meta.glob<string>(
    "/src/assets/images/prewedding/thumbnails/*.webp",
    {
        eager: true,
        query: "?url",
        import: "default",
    },
);

const photos: Photo[] = Object.entries(fullImages)
    .map(([path, src]) => {
        const filename = path.split("/").pop()!;
        const thumbnailPath = `/src/assets/images/prewedding/thumbnails/${filename}`;

        const thumbnail : string = thumbnailImages[thumbnailPath];


        if(!thumbnail) {
            console.warn(`Geen thumbnail gevonden voor ${filename}`);
            return null
        }

        return {
            src,
            thumbnail,
            alt: filename.replace(/\.webp$/i, "").replaceAll("-", "" ),
        };
}).filter((photo): photo is Photo => photo !== null)
    .sort((a,b) => a.src.localeCompare(b.src))

export default function PhotoGallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

    function closeLightbox(){
        setSelectedIndex(null);
    }

    return (
        <div className="photo-gallery">
            {photos.map((photo, index) => (
                <button
                    key={photo.src}
                    className="photo-gallery__item"
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Bekijk ${photo.alt}`}
                >
                    <PhotoImage src={photo.thumbnail} alt={photo.alt} />
                </button>
            ))}
            {selectedPhoto && selectedIndex !== null && (
               <Lightbox
                   open={true}
                   index={selectedIndex}
                   thumbnails={{showToggle: true}}
                   slides={photos.map((photo) => ({
                       src: photo.src,
                       alt: photo.alt,
                       thumbnail: photo.thumbnail,
                   }))}
                   plugins={[Thumbnails, Zoom, Fullscreen, Counter]}
                   close={closeLightbox}
               />
            )}
        </div>
    );
}
