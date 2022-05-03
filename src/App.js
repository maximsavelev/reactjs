
import "./App.css";

import {
    Routes,
    Route,
    Link,
    Navigate,
    HashRouter
} from "react-router-dom";

import AboutMe from "./Components/AboutMe";
import PinNews from "./Components/SavedNews";
import NewsCatalog from "./Components/NewsCatalog";
import Header from "./Components/Header";
import CurrentNews from "./Components/CurrentNews";



function App() {
    return (
        <div>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/news/:pageNumber" element={<NewsCatalog />} />
                    <Route path="/" element={<Navigate replace to="/news/1" />} />
                    <Route path="/news/:pageNumber/:id" element={<CurrentNews />} />
                    <Route path="/about" element={<AboutMe />} />
                    <Route path="/bookmarks/:pageNumber" element={<PinNews />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
