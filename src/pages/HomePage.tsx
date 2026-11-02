import "./HomePage.css" ;
import Countdown from "../components/Countdown/Countdown.tsx";

function HomePage() {
    return (
        <div className={"home-page"}>
            <div className={"home-page__welcome"}>
                <div className={"home-page__title"}>
                    <h1>
                        Luke & Pascalle
                    </h1>
                </div>
                <div className={"home-page__date"}>
                    <h2>26 | juni | 2027</h2>
                </div>
                <div className={"home-page__location"}>
                    <h2>Kasteel de Essenburgh,<br/>Hierden</h2>
                </div>
            </div>
            <div className={"home-page__countdown"}>
                <h2>Onze bruiloft ceremonie begint over...</h2>

                <Countdown targetDate={"2027-06-26T15:00:00"} />

            </div>

            <div className={"home-page__introduction"}>
                <h2>Ons Verhaal</h2>
                <div className={"home-page__introduction-content"}>

                    <p>
                        We leerden elkaar kennen op de middelbare school, op de gangen van het Candea College.
                        Pascalle was 15 en Luke 16 toen we bij elkaar in de mentorklas terechtkwamen.
                        Al snel konden we het goed met elkaar vinden, maar onze vriendschap bloeide pas echt op tijdens een schoolreis naar Londen.
                        We raakten daar steeds meer aan de praat en werden uiteindelijk beste vrienden en maakten we deel uit van dezelfde vriendengroep.
                    </p>

                    <p>
                        Na onze middelbareschooltijd en tijdens de coronaperiode verloren we elkaar gelukkig niet uit het oog.
                        We begonnen steeds vaker met z'n tweeën af te spreken en langzaam veranderde onze vriendschap in iets moois.
                        Tot Luke uiteindelijk de moed verzamelde om Pascalle te kussen.
                        Twee weken later, op 16 oktober 2021, werd het officieel.
                        Dat gebeurde tijdens een dagje Walibi, samen met onze vrienden.
                    </p>


                    <p>
                        Ongeveer een jaar later zetten we een volgende stap en gingen we samenwonen in Didam.
                        We hadden het dan ook al vroeg over onze toekomst samen en over trouwen.
                    </p>

                    <p>
                        Wat ons misschien wel het meest typeert, is hoeveel plezier we samen hebben in de dingen die we leuk vinden.
                        We zijn een beetje geeky en kunnen onze passies helemaal met elkaar delen.
                        Van films en series kijken, gamen, puzzelen, lezen en bordspelletjes spelen tot concerten en musicals bezoeken.
                    </p>

                    <p>
                        We hadden het al regelmatig over trouwen gehad en wisten ook ongeveer wanneer we deze stap wilden zetten.
                        Luke had ondertussen de verlovingsring uitgezocht met een prachtige ovale steen.
                        Pascalle wist dat een aanzoek eraan zat te komen, maar wanneer precies bleef een verrassing!
                    </p>

                    <p>
                        Op 1 november 2025 had Luke geregeld dat Pascalle samen met haar moeder even weg was.
                        In de tussentijd toverde hij het hele huis om met kaarsjes en bloemen en bereidde hij met de pizzarette een diner voor.
                        Toen Pascalle thuiskwam, werd ze verwelkomd door allerlei pagina's met afbeeldingen en teksten uit films en series
                        die we allebei geweldig vinden.
                        Deze vormden samen een soort route door het huis.
                        Eerst mocht ze naar boven, waar ze bij haar kledingkast de opdracht kreeg om mooie sieraden uit te zoeken en vooral haar ringvinger vrij te houden.
                        Daarna was er in de slaapkamer een prachtige jurk klaargelegd.
                        Na nog even haar haren te hebben opgefrist, was het tijd om naar beneden te gaan.
                        Daar, met het nummer Dressed Up in White van Cal op de achtergrond, deed Luke zijn grote vraag.
                        Dit was natuurlijk een volmondige JA!
                    </p>

                    <p>
                        Na maanden vol plannen, voorbereidingen en voorpret komt onze trouwdag steeds dichterbij.
                        Inmiddels zijn we ruim 5 jaar samen en kijken we er enorm naar uit om elkaar straks het jawoord te geven.
                        We vinden het ontzettend bijzonder dat we deze dag met jullie mogen delen en kunnen niet wachten om er samen een onvergetelijke dag van te maken!
                    </p>

                </div>
            </div>

            <div className={"spacer__bottom"}>

            </div>

        </div>
    )
}
export default HomePage;