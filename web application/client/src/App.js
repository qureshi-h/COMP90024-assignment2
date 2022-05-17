import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { AllTweets } from "./Pages/AllTweets";
import { TweetsStats } from "./Pages/TweetsStats";
import { LgaStats } from "./Pages/LgaStats";
import { SelectLga } from "./Pages/SelectLga";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/all_tweets" element={<AllTweets />} />
                    <Route path="/:stat_field" element={<TweetsStats />} />
                    <Route path="/lga_lookup" element={<SelectLga />} />
                    <Route path="/lga_lookup/stats/:lga" element={<LgaStats />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
