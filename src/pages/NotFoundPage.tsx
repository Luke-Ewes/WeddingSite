import {NavLink} from "react-router";
import "./NotFoundPage.css"

export default function NotFoundPage() {
    return (
        <main className="not-found-page">
            <h1>404</h1>
            <h2>Pagina niet gevonden</h2>
    <p>
    Oeps! Deze pagina bestaat niet of is verplaatst.
    </p>
    <NavLink to={"/"}
            className={"not-found-nav"}>
        Terug naar hoofdpagina
    </NavLink>
    </main>
);
}