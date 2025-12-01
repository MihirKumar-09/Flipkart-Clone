import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import AppRoute from "./Routes/AppRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
