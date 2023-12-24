import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Collection from "./components/Collection";
import Header from "./components/Header";
import { MobileCartProvider } from "./context/MobileContext";
import Phone from "./components/Phone";
import Favorites from "./components/Favorites";
import Cart from "./components/Cart";

function App() {
  return (
    <MobileCartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Collection />} />
          <Route path="/product/:id" element={<Phone />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </MobileCartProvider>
  );
}

export default App;
