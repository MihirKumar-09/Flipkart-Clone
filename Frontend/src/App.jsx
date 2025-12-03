import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import AppRoute from "./Routes/AppRoute";
import AuthProvider from "./Context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoute />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
