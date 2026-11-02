import "./Location.css"

import CastleIcon  from "../../assets/svg/castle-1-svgrepo-com.svg?react";

interface LocationMapProps {
    location:string;
}
export default function Location({location}: LocationMapProps) {
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

    return (
        <div className={"location-map"}>
            <div className={"location-info"}>
                <div className="location-info__title">
                    <CastleIcon className="location-info-icon" />

                    <h3>
                        Kasteel de Essenburgh <br />
                        Hierden, Gelderland
                    </h3>
                </div>

                <p>Er is parkeergelegenheid op het terrein</p>
            </div>
            <iframe
                className="location-map__iframe"
                src={mapUrl}
                title={`Kaart van ${location}`}
                loading={"lazy"}
                allowFullScreen={true}
                referrerPolicy={"no-referrer-when-downgrade"}/>
        </div>
    )
}