import {Route, Routes} from "react-router";
import AppLayout from "./appLayout/AppLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PasswordGate from "./components/passwordGate/PasswordGate.tsx";

function App() {

  return (
      <PasswordGate>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />}/>

              <Route path={"/details"}
                     element={<DetailsPage />}
              />

              <Route path={"/gallerij"}
                     element={<GalleryPage />}/>

                <Route path={"*"}
                       element={<NotFoundPage /> } />
            </Route>
          </Routes>
      </PasswordGate>
  )
}

export default App
