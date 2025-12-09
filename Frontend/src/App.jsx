import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import AppRoute from "./Routes/AppRoute";
import AuthProvider from "./Context/AuthContext.jsx";
import BuyNowProvider from "./Context/BuyNowContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BuyNowProvider>
          <ScrollToTop />
          <AppRoute />
        </BuyNowProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
