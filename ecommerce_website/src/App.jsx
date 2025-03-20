import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import RoutesList from "./routes/RoutesList";
import Userlanguage from "./context/language";
import { useState } from "react";
function App() {
  const [language, setLanguage] = useState('en');
 
  return (
    <>
      <BrowserRouter>
        <Userlanguage value={{language, setLanguage}}>
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <Header />
          <RoutesList />
          <Footer />
          </div>
        </Userlanguage>
      </BrowserRouter>
    </>
  );
}

export default App;
