import "./App.css";
import { Toaster } from "react-hot-toast";
// import { Router, Route } from 'electron-router-dom'
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import LanguageSelection from "./pages/LanguageSelection";
import BluetoothControls from "./pages/BluetoothControls";
import ManualConnect from "./pages/ManualConnect";
import ViewAllList from "./pages/ViewAllList";
import Category from "./pages/Category";
import Playlist from "./pages/Playlist";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import Signin from "./pages/Signin";
import Favourite from "./pages/Favourite";
import AccountVerification from "./pages/AccountVerification";
import Package from "./pages/Package";
import SinglePlaylist from "./pages/Playlist/SinglePlaylist";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Setting from "./pages/Setting";
import Footer from "./components/Footer";
import Queue from "./pages/Queue";
import "./i18n";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      <div className="flex flex-1">
        {/* sidebar */}
        <div className="bg-primary h-[calc(100%-4rem)] w-1/5 fixed">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="w-4/5 overflow-auto max-h-[calc(100%-4rem)] bg-secondary ml-[20%]">
          <Routes>
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/verify-account" element={<AccountVerification />} />
            <Route path="/bluetooth-setting" element={<BluetoothControls />} />
            <Route path="/manual-connect" element={<ManualConnect />} />
            <Route path="/list" element={<ViewAllList />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/package/:id" element={<Package />} />

            {/* <Route path="/" element={<Welcome />} /> */}
            <Route path="/" element={<Setting />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlist/:id" element={<SinglePlaylist />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/queue" element={<Queue />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
