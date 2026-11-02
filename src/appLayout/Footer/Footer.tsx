import "./Footer.css"
import logo from "/src/assets/images/logo/initialsWhite_NoBackground.webp"
import {NavLink} from "react-router";

export default function Footer() {

    return (
        <footer className={"footer"}>
            <NavLink to={"/"}>
                <img
                    className={"footer-logo"}
                    src={logo}
                    alt={"logo"}/>
            </NavLink>
        </footer>
    )
}