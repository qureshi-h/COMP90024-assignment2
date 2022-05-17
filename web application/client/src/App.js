import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { AllTweets } from "./Pages/AllTweets";
import { CountriesSearchPage } from "./Pages/CountriesSearchPage";
import { CountryInfoPage } from "./Pages/CountryInfoPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/all_tweets" element={<AllTweets />} />
                    <Route
                        path="/lga_lookup"
                        element={<CountriesSearchPage />}
                    />
                    <Route
                        path="/lga_lookup/stats/:country"
                        element={<CountryInfoPage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
