import { BrowserRouter as BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { MainFeatures } from "./components/MainFeatures.jsx"
import NavbarLanding from "./components/NavbarLanding"
import { PresentationContent } from "./components/PresentationContent"
import { HeaderIcon, Graph, Calendar, Bars, Phone, Shield } from "./components/Icons.jsx"
import { Benefits } from "./components/Benefits.jsx"
import { Footer } from "./components/Footer.jsx"
import { LoginForm } from "./components/RegisterForm.jsx"
import { LandingPage } from './components/LandingPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
