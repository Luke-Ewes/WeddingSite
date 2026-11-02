import PhotoGallery from "../components/PhotoGallery/PhotoGallery.tsx";
import "./GalleryPage.css"


function GalleryPage() {
    return (
        <div className="gallery-page">
            <div className={"gallery-page__title"}>
                <h1>Foto Gallerij</h1>
            </div>
            <div className={"gallery-page__content"}>
                <PhotoGallery />
            </div>
        </div>
    )
}
export default GalleryPage;