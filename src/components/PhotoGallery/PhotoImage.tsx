import {useState} from "react";
import "./PhotoImage.css"

interface PhotoImageProps {
    src: string;
    alt: string;
}

export default function PhotoImage({src, alt}: PhotoImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={`photo-gallery__image-container ${isLoaded ? "photo-gallery__image-container--loaded" : ""}`}>
                <img
                    src={src}
                    alt={alt}
                    className={"photo-gallery__image"}
                    loading={"lazy"}
                    onLoad={() => {
                        setIsLoaded(true);
                    }}/>
        </div>
    )
}