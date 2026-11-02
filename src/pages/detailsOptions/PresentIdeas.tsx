import "./PresentIdeas.css"

import PresentIcon from "../../assets/svg/love-envelope-svgrepo-com.svg?react"
import scotland from "../../assets/images/Schotland.png"

export default function PresentIdeas() {

    return (
        <div className={"present-ideas"}>

            <div className="present-ideas__content">

            <div className="present-ideas__text">
            <h3>Cadeautip</h3>

            <PresentIcon className={"present-icon"}/>
                <p>
                    Mochten jullie ons iets willen schenken, dan ontvangen wij het liefst een envelopje.
                    Hiermee kunnen jullie bijdragen aan onze magische huwelijksreis naar Schotland!
                </p>

                <p>
                    Na onze bruiloft trekken we er 2,5 week op uit voor een bijzondere rondreis door dit prachtige land.
                    We beginnen in het historische Edinburgh en reizen vervolgens langs de indrukwekkende Schotse Hooglanden,
                    het sprookjesachtige Isle of Skye en verschillende bijzondere kastelen en plekken die we kennen uit films en series
                    zoals Harry Potter en Outlander.
                </p>

                <p>
                    We zouden het enorm waarderen als jullie met een bijdrage een stukje van dit bijzondere avontuur mogelijk willen maken.
                    Alvast heel erg bedankt!
                </p>

            </div>

            <img className={"present-ideas__image-scotland"} src={scotland} alt={"Kaart Schotland"}/>
            </div>
        </div>
    )

}