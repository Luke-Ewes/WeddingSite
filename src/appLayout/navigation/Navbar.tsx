import {NavLink} from "react-router";
import logo from "/src/assets/images/logo/initialsWhite_NoBackground.webp"
import "./Navbar.css"


const navItems = [
    {to:"/", label:"Home"},
    {to:"/details", label:"Details"},
    {to:"/gallerij", label:"Fotogallerij"}
]

function Navbar() {
    return (
        <div className="navbar">

            <NavLink className={"navbar-logo"} to={"/"}>
                <img className={"header-logo"}
                     src={logo}
                alt={"logo"}/>
            </NavLink>

            <nav className={"navbar-navigation"}>
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                        className={({isActive}) =>
                        `navbar-item ${isActive ? "navbar-item-active" : ""}`}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}
export default Navbar;