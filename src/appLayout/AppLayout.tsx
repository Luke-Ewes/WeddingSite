import {Outlet} from "react-router";
import Navbar from "./navigation/Navbar.tsx";
import Footer from "./Footer/Footer.tsx";


function AppLayout() {
    return (
        <div className={"app-layout"}>
            <Navbar />
            <main className={"app-layout__main"}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout;